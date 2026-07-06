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
---@field armor_set? table
---@field asset? table
---@field attribute? table
---@field crafting? table
---@field defense? table
---@field id? number
---@field name? string
---@field rank? string
---@field rarity? number
---@field resistance? table
---@field skill? table
---@field slot? table
---@field type? string

---@class ArmorLoadMatch
---@field id number

---@class ArmorListMatch
---@field armor_set? table
---@field asset? table
---@field attribute? table
---@field crafting? table
---@field defense? table
---@field id? number
---@field name? string
---@field rank? string
---@field rarity? number
---@field resistance? table
---@field skill? table
---@field slot? table
---@field type? string

---@class ArmorSet
---@field bonus? table
---@field id? number
---@field name? string
---@field piece? table
---@field rank? string

---@class ArmorSetLoadMatch
---@field id number

---@class ArmorSetListMatch
---@field bonus? table
---@field id? number
---@field name? string
---@field piece? table
---@field rank? string

---@class Charm
---@field crafting? table
---@field id? number
---@field name? string
---@field rarity? number
---@field skill? table

---@class CharmLoadMatch
---@field id number

---@class CharmListMatch
---@field crafting? table
---@field id? number
---@field name? string
---@field rarity? number
---@field skill? table

---@class Decoration
---@field id? number
---@field name? string
---@field rarity? number
---@field skill? table
---@field slot? number

---@class DecorationLoadMatch
---@field id number

---@class DecorationListMatch
---@field id? number
---@field name? string
---@field rarity? number
---@field skill? table
---@field slot? number

---@class Event
---@field description? string
---@field end_timestamp? string
---@field exclusive? string
---@field expansion? string
---@field id? number
---@field location? table
---@field name? string
---@field platform? string
---@field quest_rank? string
---@field requirement? string
---@field start_timestamp? string
---@field success_condition? string
---@field type? string

---@class EventLoadMatch
---@field id number

---@class EventListMatch
---@field description? string
---@field end_timestamp? string
---@field exclusive? string
---@field expansion? string
---@field id? number
---@field location? table
---@field name? string
---@field platform? string
---@field quest_rank? string
---@field requirement? string
---@field start_timestamp? string
---@field success_condition? string
---@field type? string

---@class Item
---@field buy_price? number
---@field carry_limit? number
---@field description? string
---@field id? number
---@field name? string
---@field rarity? number
---@field sell_price? number
---@field value? number

---@class ItemLoadMatch
---@field id number

---@class ItemListMatch
---@field buy_price? number
---@field carry_limit? number
---@field description? string
---@field id? number
---@field name? string
---@field rarity? number
---@field sell_price? number
---@field value? number

---@class Location
---@field camp? table
---@field id? number
---@field name? string
---@field zone_count? number

---@class LocationLoadMatch
---@field id number

---@class LocationListMatch
---@field camp? table
---@field id? number
---@field name? string
---@field zone_count? number

---@class Monster
---@field ailment? table
---@field description? string
---@field element? table
---@field id? number
---@field location? table
---@field name? string
---@field resistance? table
---@field reward? table
---@field species? string
---@field type? string
---@field weakness? table

---@class MonsterLoadMatch
---@field id number

---@class MonsterListMatch
---@field ailment? table
---@field description? string
---@field element? table
---@field id? number
---@field location? table
---@field name? string
---@field resistance? table
---@field reward? table
---@field species? string
---@field type? string
---@field weakness? table

---@class MotionValue
---@field damage_type? string
---@field exhaust? number
---@field hit? table
---@field id? number
---@field stun? number
---@field weapon_type? string

---@class MotionValueLoadMatch
---@field id number

---@class MotionValueListMatch
---@field damage_type? string
---@field exhaust? number
---@field hit? table
---@field id? number
---@field stun? number
---@field weapon_type? string

---@class Skill
---@field description? string
---@field id? number
---@field name? string
---@field rank? table

---@class SkillLoadMatch
---@field id number

---@class SkillListMatch
---@field description? string
---@field id? number
---@field name? string
---@field rank? table

---@class Weapon
---@field asset? table
---@field attack? table
---@field attribute? table
---@field crafting? table
---@field damage_type? string
---@field element? table
---@field id? number
---@field name? string
---@field rarity? number
---@field slot? table
---@field type? string

---@class WeaponLoadMatch
---@field id number

---@class WeaponListMatch
---@field asset? table
---@field attack? table
---@field attribute? table
---@field crafting? table
---@field damage_type? string
---@field element? table
---@field id? number
---@field name? string
---@field rarity? number
---@field slot? table
---@field type? string

local M = {}

return M
