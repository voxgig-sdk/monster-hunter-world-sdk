// Typed models for the MonsterHunterWorld SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/monster-hunter-world-sdk/go/core"
)

// Ailment is the typed data model for the ailment entity.
type Ailment struct {
}

// AilmentLoadMatch is the typed request payload for Ailment.LoadTyped.
type AilmentLoadMatch struct {
	Id int `json:"id"`
	P *string `json:"p,omitempty"`
}

// AilmentListMatch is the typed request payload for Ailment.ListTyped.
type AilmentListMatch struct {
	P *string `json:"p,omitempty"`
	Q *string `json:"q,omitempty"`
}

// Armor is the typed data model for the armor entity.
type Armor struct {
}

// ArmorLoadMatch is the typed request payload for Armor.LoadTyped.
type ArmorLoadMatch struct {
	Id int `json:"id"`
	P *string `json:"p,omitempty"`
}

// ArmorListMatch is the typed request payload for Armor.ListTyped.
type ArmorListMatch struct {
	P *string `json:"p,omitempty"`
	Q *string `json:"q,omitempty"`
}

// ArmorSet is the typed data model for the armor_set entity.
type ArmorSet struct {
}

// ArmorSetLoadMatch is the typed request payload for ArmorSet.LoadTyped.
type ArmorSetLoadMatch struct {
	Id int `json:"id"`
	P *string `json:"p,omitempty"`
}

// ArmorSetListMatch is the typed request payload for ArmorSet.ListTyped.
type ArmorSetListMatch struct {
	P *string `json:"p,omitempty"`
	Q *string `json:"q,omitempty"`
}

// Charm is the typed data model for the charm entity.
type Charm struct {
}

// CharmLoadMatch is the typed request payload for Charm.LoadTyped.
type CharmLoadMatch struct {
	Id int `json:"id"`
	P *string `json:"p,omitempty"`
}

// CharmListMatch is the typed request payload for Charm.ListTyped.
type CharmListMatch struct {
	P *string `json:"p,omitempty"`
	Q *string `json:"q,omitempty"`
}

// Decoration is the typed data model for the decoration entity.
type Decoration struct {
}

// DecorationLoadMatch is the typed request payload for Decoration.LoadTyped.
type DecorationLoadMatch struct {
	Id int `json:"id"`
	P *string `json:"p,omitempty"`
}

// DecorationListMatch is the typed request payload for Decoration.ListTyped.
type DecorationListMatch struct {
	P *string `json:"p,omitempty"`
	Q *string `json:"q,omitempty"`
}

// Event is the typed data model for the event entity.
type Event struct {
}

// EventLoadMatch is the typed request payload for Event.LoadTyped.
type EventLoadMatch struct {
	Id int `json:"id"`
	P *string `json:"p,omitempty"`
}

// EventListMatch is the typed request payload for Event.ListTyped.
type EventListMatch struct {
	P *string `json:"p,omitempty"`
	Q *string `json:"q,omitempty"`
}

// Item is the typed data model for the item entity.
type Item struct {
}

// ItemLoadMatch is the typed request payload for Item.LoadTyped.
type ItemLoadMatch struct {
	Id int `json:"id"`
	P *string `json:"p,omitempty"`
}

// ItemListMatch is the typed request payload for Item.ListTyped.
type ItemListMatch struct {
	P *string `json:"p,omitempty"`
	Q *string `json:"q,omitempty"`
}

// Location is the typed data model for the location entity.
type Location struct {
}

// LocationLoadMatch is the typed request payload for Location.LoadTyped.
type LocationLoadMatch struct {
	Id int `json:"id"`
	P *string `json:"p,omitempty"`
}

// LocationListMatch is the typed request payload for Location.ListTyped.
type LocationListMatch struct {
	P *string `json:"p,omitempty"`
	Q *string `json:"q,omitempty"`
}

// Monster is the typed data model for the monster entity.
type Monster struct {
}

// MonsterLoadMatch is the typed request payload for Monster.LoadTyped.
type MonsterLoadMatch struct {
	Id int `json:"id"`
	P *string `json:"p,omitempty"`
}

// MonsterListMatch is the typed request payload for Monster.ListTyped.
type MonsterListMatch struct {
	P *string `json:"p,omitempty"`
	Q *string `json:"q,omitempty"`
}

// MotionValue is the typed data model for the motion_value entity.
type MotionValue struct {
}

// MotionValueLoadMatch is the typed request payload for MotionValue.LoadTyped.
type MotionValueLoadMatch struct {
	Id int `json:"id"`
	P *string `json:"p,omitempty"`
}

// MotionValueListMatch is the typed request payload for MotionValue.ListTyped.
type MotionValueListMatch struct {
	P *string `json:"p,omitempty"`
	Q *string `json:"q,omitempty"`
}

// Skill is the typed data model for the skill entity.
type Skill struct {
}

// SkillLoadMatch is the typed request payload for Skill.LoadTyped.
type SkillLoadMatch struct {
	Id int `json:"id"`
	P *string `json:"p,omitempty"`
}

// SkillListMatch is the typed request payload for Skill.ListTyped.
type SkillListMatch struct {
	P *string `json:"p,omitempty"`
	Q *string `json:"q,omitempty"`
}

// Weapon is the typed data model for the weapon entity.
type Weapon struct {
}

// WeaponLoadMatch is the typed request payload for Weapon.LoadTyped.
type WeaponLoadMatch struct {
	Id int `json:"id"`
	P *string `json:"p,omitempty"`
}

// WeaponListMatch is the typed request payload for Weapon.ListTyped.
type WeaponListMatch struct {
	P *string `json:"p,omitempty"`
	Q *string `json:"q,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
