package core

import (
	"fmt"

	vs "github.com/voxgig-sdk/monster-hunter-world-sdk/go/utility/struct"
)

type MonsterHunterWorldSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewMonsterHunterWorldSDK(options map[string]any) *MonsterHunterWorldSDK {
	sdk := &MonsterHunterWorldSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := MakeConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath([]any{"feature", "test", "active"}, sdk.options) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features from config.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		for _, item := range vs.Items(featureOpts) {
			fname, _ := item[0].(string)
			fopts := ToMapAny(item[1])
			if fopts != nil {
				if active, ok := fopts["active"]; ok {
					if ab, ok := active.(bool); ok && ab {
						sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *MonsterHunterWorldSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *MonsterHunterWorldSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *MonsterHunterWorldSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *MonsterHunterWorldSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

func (sdk *MonsterHunterWorldSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}


// Ailment returns a Ailment entity bound to this client.
// Idiomatic usage: client.Ailment(nil).List(nil, nil) or
// client.Ailment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *MonsterHunterWorldSDK) Ailment(data map[string]any) MonsterHunterWorldEntity {
	return NewAilmentEntityFunc(sdk, data)
}


// Armor returns a Armor entity bound to this client.
// Idiomatic usage: client.Armor(nil).List(nil, nil) or
// client.Armor(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *MonsterHunterWorldSDK) Armor(data map[string]any) MonsterHunterWorldEntity {
	return NewArmorEntityFunc(sdk, data)
}


// ArmorSet returns a ArmorSet entity bound to this client.
// Idiomatic usage: client.ArmorSet(nil).List(nil, nil) or
// client.ArmorSet(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *MonsterHunterWorldSDK) ArmorSet(data map[string]any) MonsterHunterWorldEntity {
	return NewArmorSetEntityFunc(sdk, data)
}


// Charm returns a Charm entity bound to this client.
// Idiomatic usage: client.Charm(nil).List(nil, nil) or
// client.Charm(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *MonsterHunterWorldSDK) Charm(data map[string]any) MonsterHunterWorldEntity {
	return NewCharmEntityFunc(sdk, data)
}


// Decoration returns a Decoration entity bound to this client.
// Idiomatic usage: client.Decoration(nil).List(nil, nil) or
// client.Decoration(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *MonsterHunterWorldSDK) Decoration(data map[string]any) MonsterHunterWorldEntity {
	return NewDecorationEntityFunc(sdk, data)
}


// Event returns a Event entity bound to this client.
// Idiomatic usage: client.Event(nil).List(nil, nil) or
// client.Event(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *MonsterHunterWorldSDK) Event(data map[string]any) MonsterHunterWorldEntity {
	return NewEventEntityFunc(sdk, data)
}


// Item returns a Item entity bound to this client.
// Idiomatic usage: client.Item(nil).List(nil, nil) or
// client.Item(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *MonsterHunterWorldSDK) Item(data map[string]any) MonsterHunterWorldEntity {
	return NewItemEntityFunc(sdk, data)
}


// Location returns a Location entity bound to this client.
// Idiomatic usage: client.Location(nil).List(nil, nil) or
// client.Location(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *MonsterHunterWorldSDK) Location(data map[string]any) MonsterHunterWorldEntity {
	return NewLocationEntityFunc(sdk, data)
}


// Monster returns a Monster entity bound to this client.
// Idiomatic usage: client.Monster(nil).List(nil, nil) or
// client.Monster(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *MonsterHunterWorldSDK) Monster(data map[string]any) MonsterHunterWorldEntity {
	return NewMonsterEntityFunc(sdk, data)
}


// MotionValue returns a MotionValue entity bound to this client.
// Idiomatic usage: client.MotionValue(nil).List(nil, nil) or
// client.MotionValue(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *MonsterHunterWorldSDK) MotionValue(data map[string]any) MonsterHunterWorldEntity {
	return NewMotionValueEntityFunc(sdk, data)
}


// Skill returns a Skill entity bound to this client.
// Idiomatic usage: client.Skill(nil).List(nil, nil) or
// client.Skill(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *MonsterHunterWorldSDK) Skill(data map[string]any) MonsterHunterWorldEntity {
	return NewSkillEntityFunc(sdk, data)
}


// Weapon returns a Weapon entity bound to this client.
// Idiomatic usage: client.Weapon(nil).List(nil, nil) or
// client.Weapon(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *MonsterHunterWorldSDK) Weapon(data map[string]any) MonsterHunterWorldEntity {
	return NewWeaponEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *MonsterHunterWorldSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewMonsterHunterWorldSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
