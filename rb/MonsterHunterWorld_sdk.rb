# MonsterHunterWorld SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'MonsterHunterWorld_types'


class MonsterHunterWorldSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = MonsterHunterWorldUtility.new
    @_utility = utility

    config = MonsterHunterWorldConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = MonsterHunterWorldHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = MonsterHunterWorldHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, MonsterHunterWorldFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    MonsterHunterWorldUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = MonsterHunterWorldHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = MonsterHunterWorldHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = MonsterHunterWorldHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = MonsterHunterWorldSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue MonsterHunterWorldError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = MonsterHunterWorldHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = MonsterHunterWorldHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.ailment.list / client.ailment.load({ "id" => ... })
  def ailment
    require_relative 'entity/ailment_entity'
    @ailment ||= AilmentEntity.new(self, nil)
  end

  # Deprecated: use client.ailment instead.
  def Ailment(data = nil)
    require_relative 'entity/ailment_entity'
    AilmentEntity.new(self, data)
  end


  # Idiomatic facade: client.armor.list / client.armor.load({ "id" => ... })
  def armor
    require_relative 'entity/armor_entity'
    @armor ||= ArmorEntity.new(self, nil)
  end

  # Deprecated: use client.armor instead.
  def Armor(data = nil)
    require_relative 'entity/armor_entity'
    ArmorEntity.new(self, data)
  end


  # Idiomatic facade: client.armor_set.list / client.armor_set.load({ "id" => ... })
  def armor_set
    require_relative 'entity/armor_set_entity'
    @armor_set ||= ArmorSetEntity.new(self, nil)
  end

  # Deprecated: use client.armor_set instead.
  def ArmorSet(data = nil)
    require_relative 'entity/armor_set_entity'
    ArmorSetEntity.new(self, data)
  end


  # Idiomatic facade: client.charm.list / client.charm.load({ "id" => ... })
  def charm
    require_relative 'entity/charm_entity'
    @charm ||= CharmEntity.new(self, nil)
  end

  # Deprecated: use client.charm instead.
  def Charm(data = nil)
    require_relative 'entity/charm_entity'
    CharmEntity.new(self, data)
  end


  # Idiomatic facade: client.decoration.list / client.decoration.load({ "id" => ... })
  def decoration
    require_relative 'entity/decoration_entity'
    @decoration ||= DecorationEntity.new(self, nil)
  end

  # Deprecated: use client.decoration instead.
  def Decoration(data = nil)
    require_relative 'entity/decoration_entity'
    DecorationEntity.new(self, data)
  end


  # Idiomatic facade: client.event.list / client.event.load({ "id" => ... })
  def event
    require_relative 'entity/event_entity'
    @event ||= EventEntity.new(self, nil)
  end

  # Deprecated: use client.event instead.
  def Event(data = nil)
    require_relative 'entity/event_entity'
    EventEntity.new(self, data)
  end


  # Idiomatic facade: client.item.list / client.item.load({ "id" => ... })
  def item
    require_relative 'entity/item_entity'
    @item ||= ItemEntity.new(self, nil)
  end

  # Deprecated: use client.item instead.
  def Item(data = nil)
    require_relative 'entity/item_entity'
    ItemEntity.new(self, data)
  end


  # Idiomatic facade: client.location.list / client.location.load({ "id" => ... })
  def location
    require_relative 'entity/location_entity'
    @location ||= LocationEntity.new(self, nil)
  end

  # Deprecated: use client.location instead.
  def Location(data = nil)
    require_relative 'entity/location_entity'
    LocationEntity.new(self, data)
  end


  # Idiomatic facade: client.monster.list / client.monster.load({ "id" => ... })
  def monster
    require_relative 'entity/monster_entity'
    @monster ||= MonsterEntity.new(self, nil)
  end

  # Deprecated: use client.monster instead.
  def Monster(data = nil)
    require_relative 'entity/monster_entity'
    MonsterEntity.new(self, data)
  end


  # Idiomatic facade: client.motion_value.list / client.motion_value.load({ "id" => ... })
  def motion_value
    require_relative 'entity/motion_value_entity'
    @motion_value ||= MotionValueEntity.new(self, nil)
  end

  # Deprecated: use client.motion_value instead.
  def MotionValue(data = nil)
    require_relative 'entity/motion_value_entity'
    MotionValueEntity.new(self, data)
  end


  # Idiomatic facade: client.skill.list / client.skill.load({ "id" => ... })
  def skill
    require_relative 'entity/skill_entity'
    @skill ||= SkillEntity.new(self, nil)
  end

  # Deprecated: use client.skill instead.
  def Skill(data = nil)
    require_relative 'entity/skill_entity'
    SkillEntity.new(self, data)
  end


  # Idiomatic facade: client.weapon.list / client.weapon.load({ "id" => ... })
  def weapon
    require_relative 'entity/weapon_entity'
    @weapon ||= WeaponEntity.new(self, nil)
  end

  # Deprecated: use client.weapon instead.
  def Weapon(data = nil)
    require_relative 'entity/weapon_entity'
    WeaponEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = MonsterHunterWorldSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
