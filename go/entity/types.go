// Typed models for the MonsterHunterWorld SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/monster-hunter-world-sdk/go/core"
)

// Ailment is the typed data model for the ailment entity.
type Ailment struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Protection *map[string]any `json:"protection,omitempty"`
	Recovery *map[string]any `json:"recovery,omitempty"`
}

// AilmentLoadMatch is the typed request payload for Ailment.LoadTyped.
type AilmentLoadMatch struct {
	Id int `json:"id"`
}

// AilmentListMatch is the typed request payload for Ailment.ListTyped.
type AilmentListMatch struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Protection *map[string]any `json:"protection,omitempty"`
	Recovery *map[string]any `json:"recovery,omitempty"`
}

// Armor is the typed data model for the armor entity.
type Armor struct {
	ArmorSet *map[string]any `json:"armorSet,omitempty"`
	Assets *map[string]any `json:"assets,omitempty"`
	Attributes *map[string]any `json:"attributes,omitempty"`
	Crafting *map[string]any `json:"crafting,omitempty"`
	Defense *map[string]any `json:"defense,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Rank *string `json:"rank,omitempty"`
	Rarity *int `json:"rarity,omitempty"`
	Resistances *map[string]any `json:"resistances,omitempty"`
	Skills *[]any `json:"skills,omitempty"`
	Slots *[]any `json:"slots,omitempty"`
	Type *string `json:"type,omitempty"`
}

// ArmorLoadMatch is the typed request payload for Armor.LoadTyped.
type ArmorLoadMatch struct {
	Id int `json:"id"`
}

// ArmorListMatch is the typed request payload for Armor.ListTyped.
type ArmorListMatch struct {
	ArmorSet *map[string]any `json:"armorSet,omitempty"`
	Assets *map[string]any `json:"assets,omitempty"`
	Attributes *map[string]any `json:"attributes,omitempty"`
	Crafting *map[string]any `json:"crafting,omitempty"`
	Defense *map[string]any `json:"defense,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Rank *string `json:"rank,omitempty"`
	Rarity *int `json:"rarity,omitempty"`
	Resistances *map[string]any `json:"resistances,omitempty"`
	Skills *[]any `json:"skills,omitempty"`
	Slots *[]any `json:"slots,omitempty"`
	Type *string `json:"type,omitempty"`
}

// ArmorSet is the typed data model for the armor_set entity.
type ArmorSet struct {
	Bonus *map[string]any `json:"bonus,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Pieces *[]any `json:"pieces,omitempty"`
	Rank *string `json:"rank,omitempty"`
}

// ArmorSetLoadMatch is the typed request payload for ArmorSet.LoadTyped.
type ArmorSetLoadMatch struct {
	Id int `json:"id"`
}

// ArmorSetListMatch is the typed request payload for ArmorSet.ListTyped.
type ArmorSetListMatch struct {
	Bonus *map[string]any `json:"bonus,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Pieces *[]any `json:"pieces,omitempty"`
	Rank *string `json:"rank,omitempty"`
}

// Charm is the typed data model for the charm entity.
type Charm struct {
	Crafting *map[string]any `json:"crafting,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Rarity *int `json:"rarity,omitempty"`
	Skills *[]any `json:"skills,omitempty"`
}

// CharmLoadMatch is the typed request payload for Charm.LoadTyped.
type CharmLoadMatch struct {
	Id int `json:"id"`
}

// CharmListMatch is the typed request payload for Charm.ListTyped.
type CharmListMatch struct {
	Crafting *map[string]any `json:"crafting,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Rarity *int `json:"rarity,omitempty"`
	Skills *[]any `json:"skills,omitempty"`
}

// Decoration is the typed data model for the decoration entity.
type Decoration struct {
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Rarity *int `json:"rarity,omitempty"`
	Skills *[]any `json:"skills,omitempty"`
	Slot *int `json:"slot,omitempty"`
}

// DecorationLoadMatch is the typed request payload for Decoration.LoadTyped.
type DecorationLoadMatch struct {
	Id int `json:"id"`
}

// DecorationListMatch is the typed request payload for Decoration.ListTyped.
type DecorationListMatch struct {
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Rarity *int `json:"rarity,omitempty"`
	Skills *[]any `json:"skills,omitempty"`
	Slot *int `json:"slot,omitempty"`
}

// Event is the typed data model for the event entity.
type Event struct {
	Camps *[]any `json:"camps,omitempty"`
	Description *string `json:"description,omitempty"`
	EndTimestamp *string `json:"endTimestamp,omitempty"`
	Exclusive *string `json:"exclusive,omitempty"`
	Expansion *string `json:"expansion,omitempty"`
	Id *int `json:"id,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Name *string `json:"name,omitempty"`
	Platform *string `json:"platform,omitempty"`
	QuestRank *string `json:"questRank,omitempty"`
	Requirements *string `json:"requirements,omitempty"`
	StartTimestamp *string `json:"startTimestamp,omitempty"`
	SuccessConditions *string `json:"successConditions,omitempty"`
	Type *string `json:"type,omitempty"`
	ZoneCount *int `json:"zoneCount,omitempty"`
}

// EventLoadMatch is the typed request payload for Event.LoadTyped.
type EventLoadMatch struct {
	Id int `json:"id"`
}

// EventListMatch is the typed request payload for Event.ListTyped.
type EventListMatch struct {
	Camps *[]any `json:"camps,omitempty"`
	Description *string `json:"description,omitempty"`
	EndTimestamp *string `json:"endTimestamp,omitempty"`
	Exclusive *string `json:"exclusive,omitempty"`
	Expansion *string `json:"expansion,omitempty"`
	Id *int `json:"id,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Name *string `json:"name,omitempty"`
	Platform *string `json:"platform,omitempty"`
	QuestRank *string `json:"questRank,omitempty"`
	Requirements *string `json:"requirements,omitempty"`
	StartTimestamp *string `json:"startTimestamp,omitempty"`
	SuccessConditions *string `json:"successConditions,omitempty"`
	Type *string `json:"type,omitempty"`
	ZoneCount *int `json:"zoneCount,omitempty"`
}

// Item is the typed data model for the item entity.
type Item struct {
	BuyPrice *int `json:"buyPrice,omitempty"`
	CarryLimit *int `json:"carryLimit,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Rarity *int `json:"rarity,omitempty"`
	SellPrice *int `json:"sellPrice,omitempty"`
	Value *int `json:"value,omitempty"`
}

// ItemLoadMatch is the typed request payload for Item.LoadTyped.
type ItemLoadMatch struct {
	Id int `json:"id"`
}

// ItemListMatch is the typed request payload for Item.ListTyped.
type ItemListMatch struct {
	BuyPrice *int `json:"buyPrice,omitempty"`
	CarryLimit *int `json:"carryLimit,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Rarity *int `json:"rarity,omitempty"`
	SellPrice *int `json:"sellPrice,omitempty"`
	Value *int `json:"value,omitempty"`
}

// Location is the typed data model for the location entity.
type Location struct {
	Camps *[]any `json:"camps,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ZoneCount *int `json:"zoneCount,omitempty"`
}

// LocationLoadMatch is the typed request payload for Location.LoadTyped.
type LocationLoadMatch struct {
	Id int `json:"id"`
}

// LocationListMatch is the typed request payload for Location.ListTyped.
type LocationListMatch struct {
	Camps *[]any `json:"camps,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ZoneCount *int `json:"zoneCount,omitempty"`
}

// Monster is the typed data model for the monster entity.
type Monster struct {
	Ailments *[]any `json:"ailments,omitempty"`
	Description *string `json:"description,omitempty"`
	Elements *[]any `json:"elements,omitempty"`
	Id *int `json:"id,omitempty"`
	Locations *[]any `json:"locations,omitempty"`
	Name *string `json:"name,omitempty"`
	Resistances *[]any `json:"resistances,omitempty"`
	Rewards *[]any `json:"rewards,omitempty"`
	Species *string `json:"species,omitempty"`
	Type *string `json:"type,omitempty"`
	Weaknesses *[]any `json:"weaknesses,omitempty"`
}

// MonsterLoadMatch is the typed request payload for Monster.LoadTyped.
type MonsterLoadMatch struct {
	Id int `json:"id"`
}

// MonsterListMatch is the typed request payload for Monster.ListTyped.
type MonsterListMatch struct {
	Ailments *[]any `json:"ailments,omitempty"`
	Description *string `json:"description,omitempty"`
	Elements *[]any `json:"elements,omitempty"`
	Id *int `json:"id,omitempty"`
	Locations *[]any `json:"locations,omitempty"`
	Name *string `json:"name,omitempty"`
	Resistances *[]any `json:"resistances,omitempty"`
	Rewards *[]any `json:"rewards,omitempty"`
	Species *string `json:"species,omitempty"`
	Type *string `json:"type,omitempty"`
	Weaknesses *[]any `json:"weaknesses,omitempty"`
}

// MotionValue is the typed data model for the motion_value entity.
type MotionValue struct {
	DamageType *string `json:"damageType,omitempty"`
	Exhaust *int `json:"exhaust,omitempty"`
	Hits *[]any `json:"hits,omitempty"`
	Id *int `json:"id,omitempty"`
	Stun *int `json:"stun,omitempty"`
	WeaponType *string `json:"weaponType,omitempty"`
}

// MotionValueLoadMatch is the typed request payload for MotionValue.LoadTyped.
type MotionValueLoadMatch struct {
	Id int `json:"id"`
}

// MotionValueListMatch is the typed request payload for MotionValue.ListTyped.
type MotionValueListMatch struct {
	DamageType *string `json:"damageType,omitempty"`
	Exhaust *int `json:"exhaust,omitempty"`
	Hits *[]any `json:"hits,omitempty"`
	Id *int `json:"id,omitempty"`
	Stun *int `json:"stun,omitempty"`
	WeaponType *string `json:"weaponType,omitempty"`
}

// Skill is the typed data model for the skill entity.
type Skill struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Ranks *[]any `json:"ranks,omitempty"`
}

// SkillLoadMatch is the typed request payload for Skill.LoadTyped.
type SkillLoadMatch struct {
	Id int `json:"id"`
}

// SkillListMatch is the typed request payload for Skill.ListTyped.
type SkillListMatch struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Ranks *[]any `json:"ranks,omitempty"`
}

// Weapon is the typed data model for the weapon entity.
type Weapon struct {
	Assets *map[string]any `json:"assets,omitempty"`
	Attack *map[string]any `json:"attack,omitempty"`
	Attributes *map[string]any `json:"attributes,omitempty"`
	Crafting *map[string]any `json:"crafting,omitempty"`
	DamageType *string `json:"damageType,omitempty"`
	Elements *[]any `json:"elements,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Rarity *int `json:"rarity,omitempty"`
	Slots *[]any `json:"slots,omitempty"`
	Type *string `json:"type,omitempty"`
}

// WeaponLoadMatch is the typed request payload for Weapon.LoadTyped.
type WeaponLoadMatch struct {
	Id int `json:"id"`
}

// WeaponListMatch is the typed request payload for Weapon.ListTyped.
type WeaponListMatch struct {
	Assets *map[string]any `json:"assets,omitempty"`
	Attack *map[string]any `json:"attack,omitempty"`
	Attributes *map[string]any `json:"attributes,omitempty"`
	Crafting *map[string]any `json:"crafting,omitempty"`
	DamageType *string `json:"damageType,omitempty"`
	Elements *[]any `json:"elements,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Rarity *int `json:"rarity,omitempty"`
	Slots *[]any `json:"slots,omitempty"`
	Type *string `json:"type,omitempty"`
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
