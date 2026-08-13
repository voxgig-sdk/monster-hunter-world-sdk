-- Typed models for the MonsterHunterWorld SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Ailment
---@field description? string
---@field id? number
---@field name? string
---@field protection? table
---@field recovery? table

---@class AilmentLoadMatch
---@field id number

---@class AilmentListMatch
---@field description? string
---@field id? number
---@field name? string
---@field protection? table
---@field recovery? table

---@class Armor
---@field armorSet? table
---@field assets? table
---@field attributes? table
---@field crafting? table
---@field defense? table
---@field id? number
---@field name? string
---@field rank? string
---@field rarity? number
---@field resistances? table
---@field skills? table
---@field slots? table
---@field type? string

---@class ArmorLoadMatch
---@field id number

---@class ArmorListMatch
---@field armorSet? table
---@field assets? table
---@field attributes? table
---@field crafting? table
---@field defense? table
---@field id? number
---@field name? string
---@field rank? string
---@field rarity? number
---@field resistances? table
---@field skills? table
---@field slots? table
---@field type? string

---@class ArmorSet
---@field bonus? table
---@field id? number
---@field name? string
---@field pieces? table
---@field rank? string

---@class ArmorSetLoadMatch
---@field id number

---@class ArmorSetListMatch
---@field bonus? table
---@field id? number
---@field name? string
---@field pieces? table
---@field rank? string

---@class Charm
---@field crafting? table
---@field id? number
---@field name? string
---@field rarity? number
---@field skills? table

---@class CharmLoadMatch
---@field id number

---@class CharmListMatch
---@field crafting? table
---@field id? number
---@field name? string
---@field rarity? number
---@field skills? table

---@class Decoration
---@field id? number
---@field name? string
---@field rarity? number
---@field skills? table
---@field slot? number

---@class DecorationLoadMatch
---@field id number

---@class DecorationListMatch
---@field id? number
---@field name? string
---@field rarity? number
---@field skills? table
---@field slot? number

---@class Event
---@field camps? table
---@field description? string
---@field endTimestamp? string
---@field exclusive? string
---@field expansion? string
---@field id? number
---@field location? table
---@field name? string
---@field platform? string
---@field questRank? string
---@field requirements? string
---@field startTimestamp? string
---@field successConditions? string
---@field type? string
---@field zoneCount? number

---@class EventLoadMatch
---@field id number

---@class EventListMatch
---@field camps? table
---@field description? string
---@field endTimestamp? string
---@field exclusive? string
---@field expansion? string
---@field id? number
---@field location? table
---@field name? string
---@field platform? string
---@field questRank? string
---@field requirements? string
---@field startTimestamp? string
---@field successConditions? string
---@field type? string
---@field zoneCount? number

---@class Item
---@field buyPrice? number
---@field carryLimit? number
---@field description? string
---@field id? number
---@field name? string
---@field rarity? number
---@field sellPrice? number
---@field value? number

---@class ItemLoadMatch
---@field id number

---@class ItemListMatch
---@field buyPrice? number
---@field carryLimit? number
---@field description? string
---@field id? number
---@field name? string
---@field rarity? number
---@field sellPrice? number
---@field value? number

---@class Location
---@field camps? table
---@field id? number
---@field name? string
---@field zoneCount? number

---@class LocationLoadMatch
---@field id number

---@class LocationListMatch
---@field camps? table
---@field id? number
---@field name? string
---@field zoneCount? number

---@class Monster
---@field ailments? table
---@field description? string
---@field elements? table
---@field id? number
---@field locations? table
---@field name? string
---@field resistances? table
---@field rewards? table
---@field species? string
---@field type? string
---@field weaknesses? table

---@class MonsterLoadMatch
---@field id number

---@class MonsterListMatch
---@field ailments? table
---@field description? string
---@field elements? table
---@field id? number
---@field locations? table
---@field name? string
---@field resistances? table
---@field rewards? table
---@field species? string
---@field type? string
---@field weaknesses? table

---@class MotionValue
---@field damageType? string
---@field exhaust? number
---@field hits? table
---@field id? number
---@field stun? number
---@field weaponType? string

---@class MotionValueLoadMatch
---@field id number

---@class MotionValueListMatch
---@field damageType? string
---@field exhaust? number
---@field hits? table
---@field id? number
---@field stun? number
---@field weaponType? string

---@class Skill
---@field description? string
---@field id? number
---@field name? string
---@field ranks? table

---@class SkillLoadMatch
---@field id number

---@class SkillListMatch
---@field description? string
---@field id? number
---@field name? string
---@field ranks? table

---@class Weapon
---@field assets? table
---@field attack? table
---@field attributes? table
---@field crafting? table
---@field damageType? string
---@field elements? table
---@field id? number
---@field name? string
---@field rarity? number
---@field slots? table
---@field type? string

---@class WeaponLoadMatch
---@field id number

---@class WeaponListMatch
---@field assets? table
---@field attack? table
---@field attributes? table
---@field crafting? table
---@field damageType? string
---@field elements? table
---@field id? number
---@field name? string
---@field rarity? number
---@field slots? table
---@field type? string

local M = {}

return M
