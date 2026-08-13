# frozen_string_literal: true

# Typed models for the MonsterHunterWorld SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Ailment entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] protection
#   @return [Hash, nil]
#
# @!attribute [rw] recovery
#   @return [Hash, nil]
Ailment = Struct.new(
  :description,
  :id,
  :name,
  :protection,
  :recovery,
  keyword_init: true
)

# Request payload for Ailment#load.
#
# @!attribute [rw] id
#   @return [Integer]
AilmentLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Ailment#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] protection
#   @return [Hash, nil]
#
# @!attribute [rw] recovery
#   @return [Hash, nil]
AilmentListMatch = Struct.new(
  :description,
  :id,
  :name,
  :protection,
  :recovery,
  keyword_init: true
)

# Armor entity data model.
#
# @!attribute [rw] armorSet
#   @return [Hash, nil]
#
# @!attribute [rw] assets
#   @return [Hash, nil]
#
# @!attribute [rw] attributes
#   @return [Hash, nil]
#
# @!attribute [rw] crafting
#   @return [Hash, nil]
#
# @!attribute [rw] defense
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rank
#   @return [String, nil]
#
# @!attribute [rw] rarity
#   @return [Integer, nil]
#
# @!attribute [rw] resistances
#   @return [Hash, nil]
#
# @!attribute [rw] skills
#   @return [Array, nil]
#
# @!attribute [rw] slots
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Armor = Struct.new(
  :armorSet,
  :assets,
  :attributes,
  :crafting,
  :defense,
  :id,
  :name,
  :rank,
  :rarity,
  :resistances,
  :skills,
  :slots,
  :type,
  keyword_init: true
)

# Request payload for Armor#load.
#
# @!attribute [rw] id
#   @return [Integer]
ArmorLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Armor#list.
#
# @!attribute [rw] armorSet
#   @return [Hash, nil]
#
# @!attribute [rw] assets
#   @return [Hash, nil]
#
# @!attribute [rw] attributes
#   @return [Hash, nil]
#
# @!attribute [rw] crafting
#   @return [Hash, nil]
#
# @!attribute [rw] defense
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rank
#   @return [String, nil]
#
# @!attribute [rw] rarity
#   @return [Integer, nil]
#
# @!attribute [rw] resistances
#   @return [Hash, nil]
#
# @!attribute [rw] skills
#   @return [Array, nil]
#
# @!attribute [rw] slots
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
ArmorListMatch = Struct.new(
  :armorSet,
  :assets,
  :attributes,
  :crafting,
  :defense,
  :id,
  :name,
  :rank,
  :rarity,
  :resistances,
  :skills,
  :slots,
  :type,
  keyword_init: true
)

# ArmorSet entity data model.
#
# @!attribute [rw] bonus
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] pieces
#   @return [Array, nil]
#
# @!attribute [rw] rank
#   @return [String, nil]
ArmorSet = Struct.new(
  :bonus,
  :id,
  :name,
  :pieces,
  :rank,
  keyword_init: true
)

# Request payload for ArmorSet#load.
#
# @!attribute [rw] id
#   @return [Integer]
ArmorSetLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ArmorSet#list.
#
# @!attribute [rw] bonus
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] pieces
#   @return [Array, nil]
#
# @!attribute [rw] rank
#   @return [String, nil]
ArmorSetListMatch = Struct.new(
  :bonus,
  :id,
  :name,
  :pieces,
  :rank,
  keyword_init: true
)

# Charm entity data model.
#
# @!attribute [rw] crafting
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rarity
#   @return [Integer, nil]
#
# @!attribute [rw] skills
#   @return [Array, nil]
Charm = Struct.new(
  :crafting,
  :id,
  :name,
  :rarity,
  :skills,
  keyword_init: true
)

# Request payload for Charm#load.
#
# @!attribute [rw] id
#   @return [Integer]
CharmLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Charm#list.
#
# @!attribute [rw] crafting
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rarity
#   @return [Integer, nil]
#
# @!attribute [rw] skills
#   @return [Array, nil]
CharmListMatch = Struct.new(
  :crafting,
  :id,
  :name,
  :rarity,
  :skills,
  keyword_init: true
)

# Decoration entity data model.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rarity
#   @return [Integer, nil]
#
# @!attribute [rw] skills
#   @return [Array, nil]
#
# @!attribute [rw] slot
#   @return [Integer, nil]
Decoration = Struct.new(
  :id,
  :name,
  :rarity,
  :skills,
  :slot,
  keyword_init: true
)

# Request payload for Decoration#load.
#
# @!attribute [rw] id
#   @return [Integer]
DecorationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Decoration#list.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rarity
#   @return [Integer, nil]
#
# @!attribute [rw] skills
#   @return [Array, nil]
#
# @!attribute [rw] slot
#   @return [Integer, nil]
DecorationListMatch = Struct.new(
  :id,
  :name,
  :rarity,
  :skills,
  :slot,
  keyword_init: true
)

# Event entity data model.
#
# @!attribute [rw] camps
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] endTimestamp
#   @return [String, nil]
#
# @!attribute [rw] exclusive
#   @return [String, nil]
#
# @!attribute [rw] expansion
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] platform
#   @return [String, nil]
#
# @!attribute [rw] questRank
#   @return [String, nil]
#
# @!attribute [rw] requirements
#   @return [String, nil]
#
# @!attribute [rw] startTimestamp
#   @return [String, nil]
#
# @!attribute [rw] successConditions
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] zoneCount
#   @return [Integer, nil]
Event = Struct.new(
  :camps,
  :description,
  :endTimestamp,
  :exclusive,
  :expansion,
  :id,
  :location,
  :name,
  :platform,
  :questRank,
  :requirements,
  :startTimestamp,
  :successConditions,
  :type,
  :zoneCount,
  keyword_init: true
)

# Request payload for Event#load.
#
# @!attribute [rw] id
#   @return [Integer]
EventLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Event#list.
#
# @!attribute [rw] camps
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] endTimestamp
#   @return [String, nil]
#
# @!attribute [rw] exclusive
#   @return [String, nil]
#
# @!attribute [rw] expansion
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] platform
#   @return [String, nil]
#
# @!attribute [rw] questRank
#   @return [String, nil]
#
# @!attribute [rw] requirements
#   @return [String, nil]
#
# @!attribute [rw] startTimestamp
#   @return [String, nil]
#
# @!attribute [rw] successConditions
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] zoneCount
#   @return [Integer, nil]
EventListMatch = Struct.new(
  :camps,
  :description,
  :endTimestamp,
  :exclusive,
  :expansion,
  :id,
  :location,
  :name,
  :platform,
  :questRank,
  :requirements,
  :startTimestamp,
  :successConditions,
  :type,
  :zoneCount,
  keyword_init: true
)

# Item entity data model.
#
# @!attribute [rw] buyPrice
#   @return [Integer, nil]
#
# @!attribute [rw] carryLimit
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rarity
#   @return [Integer, nil]
#
# @!attribute [rw] sellPrice
#   @return [Integer, nil]
#
# @!attribute [rw] value
#   @return [Integer, nil]
Item = Struct.new(
  :buyPrice,
  :carryLimit,
  :description,
  :id,
  :name,
  :rarity,
  :sellPrice,
  :value,
  keyword_init: true
)

# Request payload for Item#load.
#
# @!attribute [rw] id
#   @return [Integer]
ItemLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Item#list.
#
# @!attribute [rw] buyPrice
#   @return [Integer, nil]
#
# @!attribute [rw] carryLimit
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rarity
#   @return [Integer, nil]
#
# @!attribute [rw] sellPrice
#   @return [Integer, nil]
#
# @!attribute [rw] value
#   @return [Integer, nil]
ItemListMatch = Struct.new(
  :buyPrice,
  :carryLimit,
  :description,
  :id,
  :name,
  :rarity,
  :sellPrice,
  :value,
  keyword_init: true
)

# Location entity data model.
#
# @!attribute [rw] camps
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] zoneCount
#   @return [Integer, nil]
Location = Struct.new(
  :camps,
  :id,
  :name,
  :zoneCount,
  keyword_init: true
)

# Request payload for Location#load.
#
# @!attribute [rw] id
#   @return [Integer]
LocationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Location#list.
#
# @!attribute [rw] camps
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] zoneCount
#   @return [Integer, nil]
LocationListMatch = Struct.new(
  :camps,
  :id,
  :name,
  :zoneCount,
  keyword_init: true
)

# Monster entity data model.
#
# @!attribute [rw] ailments
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] elements
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] locations
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] resistances
#   @return [Array, nil]
#
# @!attribute [rw] rewards
#   @return [Array, nil]
#
# @!attribute [rw] species
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] weaknesses
#   @return [Array, nil]
Monster = Struct.new(
  :ailments,
  :description,
  :elements,
  :id,
  :locations,
  :name,
  :resistances,
  :rewards,
  :species,
  :type,
  :weaknesses,
  keyword_init: true
)

# Request payload for Monster#load.
#
# @!attribute [rw] id
#   @return [Integer]
MonsterLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Monster#list.
#
# @!attribute [rw] ailments
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] elements
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] locations
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] resistances
#   @return [Array, nil]
#
# @!attribute [rw] rewards
#   @return [Array, nil]
#
# @!attribute [rw] species
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] weaknesses
#   @return [Array, nil]
MonsterListMatch = Struct.new(
  :ailments,
  :description,
  :elements,
  :id,
  :locations,
  :name,
  :resistances,
  :rewards,
  :species,
  :type,
  :weaknesses,
  keyword_init: true
)

# MotionValue entity data model.
#
# @!attribute [rw] damageType
#   @return [String, nil]
#
# @!attribute [rw] exhaust
#   @return [Integer, nil]
#
# @!attribute [rw] hits
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] stun
#   @return [Integer, nil]
#
# @!attribute [rw] weaponType
#   @return [String, nil]
MotionValue = Struct.new(
  :damageType,
  :exhaust,
  :hits,
  :id,
  :stun,
  :weaponType,
  keyword_init: true
)

# Request payload for MotionValue#load.
#
# @!attribute [rw] id
#   @return [Integer]
MotionValueLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for MotionValue#list.
#
# @!attribute [rw] damageType
#   @return [String, nil]
#
# @!attribute [rw] exhaust
#   @return [Integer, nil]
#
# @!attribute [rw] hits
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] stun
#   @return [Integer, nil]
#
# @!attribute [rw] weaponType
#   @return [String, nil]
MotionValueListMatch = Struct.new(
  :damageType,
  :exhaust,
  :hits,
  :id,
  :stun,
  :weaponType,
  keyword_init: true
)

# Skill entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] ranks
#   @return [Array, nil]
Skill = Struct.new(
  :description,
  :id,
  :name,
  :ranks,
  keyword_init: true
)

# Request payload for Skill#load.
#
# @!attribute [rw] id
#   @return [Integer]
SkillLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Skill#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] ranks
#   @return [Array, nil]
SkillListMatch = Struct.new(
  :description,
  :id,
  :name,
  :ranks,
  keyword_init: true
)

# Weapon entity data model.
#
# @!attribute [rw] assets
#   @return [Hash, nil]
#
# @!attribute [rw] attack
#   @return [Hash, nil]
#
# @!attribute [rw] attributes
#   @return [Hash, nil]
#
# @!attribute [rw] crafting
#   @return [Hash, nil]
#
# @!attribute [rw] damageType
#   @return [String, nil]
#
# @!attribute [rw] elements
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rarity
#   @return [Integer, nil]
#
# @!attribute [rw] slots
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Weapon = Struct.new(
  :assets,
  :attack,
  :attributes,
  :crafting,
  :damageType,
  :elements,
  :id,
  :name,
  :rarity,
  :slots,
  :type,
  keyword_init: true
)

# Request payload for Weapon#load.
#
# @!attribute [rw] id
#   @return [Integer]
WeaponLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Weapon#list.
#
# @!attribute [rw] assets
#   @return [Hash, nil]
#
# @!attribute [rw] attack
#   @return [Hash, nil]
#
# @!attribute [rw] attributes
#   @return [Hash, nil]
#
# @!attribute [rw] crafting
#   @return [Hash, nil]
#
# @!attribute [rw] damageType
#   @return [String, nil]
#
# @!attribute [rw] elements
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rarity
#   @return [Integer, nil]
#
# @!attribute [rw] slots
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
WeaponListMatch = Struct.new(
  :assets,
  :attack,
  :attributes,
  :crafting,
  :damageType,
  :elements,
  :id,
  :name,
  :rarity,
  :slots,
  :type,
  keyword_init: true
)

