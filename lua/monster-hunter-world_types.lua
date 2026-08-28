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
---@field p? string

---@class AilmentListMatch
---@field p? string
---@field q? string

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
---@field p? string

---@class ArmorListMatch
---@field p? string
---@field q? string

---@class ArmorSet
---@field bonus? table
---@field id? number
---@field name? string
---@field pieces? table
---@field rank? string

---@class ArmorSetLoadMatch
---@field id number
---@field p? string

---@class ArmorSetListMatch
---@field p? string
---@field q? string

---@class Charm
---@field crafting? table
---@field id? number
---@field name? string
---@field rarity? number
---@field skills? table

---@class CharmLoadMatch
---@field id number
---@field p? string

---@class CharmListMatch
---@field p? string
---@field q? string

---@class Decoration
---@field id? number
---@field name? string
---@field rarity? number
---@field skills? table
---@field slot? number

---@class DecorationLoadMatch
---@field id number
---@field p? string

---@class DecorationListMatch
---@field p? string
---@field q? string

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
---@field p? string

---@class EventListMatch
---@field p? string
---@field q? string

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
---@field p? string

---@class ItemListMatch
---@field p? string
---@field q? string

---@class Location
---@field camps? table
---@field id? number
---@field name? string
---@field zoneCount? number

---@class LocationLoadMatch
---@field id number
---@field p? string

---@class LocationListMatch
---@field p? string
---@field q? string

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
---@field p? string

---@class MonsterListMatch
---@field p? string
---@field q? string

---@class MotionValue
---@field damageType? string
---@field exhaust? number
---@field hits? table
---@field id? number
---@field stun? number
---@field weaponType? string

---@class MotionValueLoadMatch
---@field id number
---@field p? string

---@class MotionValueListMatch
---@field p? string
---@field q? string

---@class Skill
---@field description? string
---@field id? number
---@field name? string
---@field ranks? table

---@class SkillLoadMatch
---@field id number
---@field p? string

---@class SkillListMatch
---@field p? string
---@field q? string

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
---@field p? string

---@class WeaponListMatch
---@field p? string
---@field q? string

local M = {}

return M
