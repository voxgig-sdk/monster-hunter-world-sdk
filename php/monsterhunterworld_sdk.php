<?php
declare(strict_types=1);

// MonsterHunterWorld SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class MonsterHunterWorldSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new MonsterHunterWorldUtility();
        $this->_utility = $utility;

        $config = MonsterHunterWorldConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = MonsterHunterWorldHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = MonsterHunterWorldHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, MonsterHunterWorldFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return MonsterHunterWorldUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = MonsterHunterWorldHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = MonsterHunterWorldHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = MonsterHunterWorldHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new MonsterHunterWorldSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = MonsterHunterWorldHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = MonsterHunterWorldHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_ailment = null;

    // Canonical facade: $client->Ailment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ailment()
    // resolves here too.
    public function Ailment($data = null)
    {
        require_once __DIR__ . '/entity/ailment_entity.php';
        if ($data === null) {
            if ($this->_ailment === null) {
                $this->_ailment = new AilmentEntity($this, null);
            }
            return $this->_ailment;
        }
        return new AilmentEntity($this, $data);
    }


    private $_armor = null;

    // Canonical facade: $client->Armor()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->armor()
    // resolves here too.
    public function Armor($data = null)
    {
        require_once __DIR__ . '/entity/armor_entity.php';
        if ($data === null) {
            if ($this->_armor === null) {
                $this->_armor = new ArmorEntity($this, null);
            }
            return $this->_armor;
        }
        return new ArmorEntity($this, $data);
    }


    private $_armor_set = null;

    // Canonical facade: $client->ArmorSet()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->armor_set()
    // resolves here too.
    public function ArmorSet($data = null)
    {
        require_once __DIR__ . '/entity/armor_set_entity.php';
        if ($data === null) {
            if ($this->_armor_set === null) {
                $this->_armor_set = new ArmorSetEntity($this, null);
            }
            return $this->_armor_set;
        }
        return new ArmorSetEntity($this, $data);
    }


    private $_charm = null;

    // Canonical facade: $client->Charm()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->charm()
    // resolves here too.
    public function Charm($data = null)
    {
        require_once __DIR__ . '/entity/charm_entity.php';
        if ($data === null) {
            if ($this->_charm === null) {
                $this->_charm = new CharmEntity($this, null);
            }
            return $this->_charm;
        }
        return new CharmEntity($this, $data);
    }


    private $_decoration = null;

    // Canonical facade: $client->Decoration()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->decoration()
    // resolves here too.
    public function Decoration($data = null)
    {
        require_once __DIR__ . '/entity/decoration_entity.php';
        if ($data === null) {
            if ($this->_decoration === null) {
                $this->_decoration = new DecorationEntity($this, null);
            }
            return $this->_decoration;
        }
        return new DecorationEntity($this, $data);
    }


    private $_event = null;

    // Canonical facade: $client->Event()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->event()
    // resolves here too.
    public function Event($data = null)
    {
        require_once __DIR__ . '/entity/event_entity.php';
        if ($data === null) {
            if ($this->_event === null) {
                $this->_event = new EventEntity($this, null);
            }
            return $this->_event;
        }
        return new EventEntity($this, $data);
    }


    private $_item = null;

    // Canonical facade: $client->Item()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->item()
    // resolves here too.
    public function Item($data = null)
    {
        require_once __DIR__ . '/entity/item_entity.php';
        if ($data === null) {
            if ($this->_item === null) {
                $this->_item = new ItemEntity($this, null);
            }
            return $this->_item;
        }
        return new ItemEntity($this, $data);
    }


    private $_location = null;

    // Canonical facade: $client->Location()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->location()
    // resolves here too.
    public function Location($data = null)
    {
        require_once __DIR__ . '/entity/location_entity.php';
        if ($data === null) {
            if ($this->_location === null) {
                $this->_location = new LocationEntity($this, null);
            }
            return $this->_location;
        }
        return new LocationEntity($this, $data);
    }


    private $_monster = null;

    // Canonical facade: $client->Monster()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->monster()
    // resolves here too.
    public function Monster($data = null)
    {
        require_once __DIR__ . '/entity/monster_entity.php';
        if ($data === null) {
            if ($this->_monster === null) {
                $this->_monster = new MonsterEntity($this, null);
            }
            return $this->_monster;
        }
        return new MonsterEntity($this, $data);
    }


    private $_motion_value = null;

    // Canonical facade: $client->MotionValue()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->motion_value()
    // resolves here too.
    public function MotionValue($data = null)
    {
        require_once __DIR__ . '/entity/motion_value_entity.php';
        if ($data === null) {
            if ($this->_motion_value === null) {
                $this->_motion_value = new MotionValueEntity($this, null);
            }
            return $this->_motion_value;
        }
        return new MotionValueEntity($this, $data);
    }


    private $_skill = null;

    // Canonical facade: $client->Skill()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->skill()
    // resolves here too.
    public function Skill($data = null)
    {
        require_once __DIR__ . '/entity/skill_entity.php';
        if ($data === null) {
            if ($this->_skill === null) {
                $this->_skill = new SkillEntity($this, null);
            }
            return $this->_skill;
        }
        return new SkillEntity($this, $data);
    }


    private $_weapon = null;

    // Canonical facade: $client->Weapon()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->weapon()
    // resolves here too.
    public function Weapon($data = null)
    {
        require_once __DIR__ . '/entity/weapon_entity.php';
        if ($data === null) {
            if ($this->_weapon === null) {
                $this->_weapon = new WeaponEntity($this, null);
            }
            return $this->_weapon;
        }
        return new WeaponEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new MonsterHunterWorldSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
