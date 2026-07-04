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

# Match filter for Ailment#list (any subset of Ailment fields).
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
# @!attribute [rw] armor_set
#   @return [Hash, nil]
#
# @!attribute [rw] asset
#   @return [Hash, nil]
#
# @!attribute [rw] attribute
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
# @!attribute [rw] resistance
#   @return [Hash, nil]
#
# @!attribute [rw] skill
#   @return [Array, nil]
#
# @!attribute [rw] slot
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Armor = Struct.new(
  :armor_set,
  :asset,
  :attribute,
  :crafting,
  :defense,
  :id,
  :name,
  :rank,
  :rarity,
  :resistance,
  :skill,
  :slot,
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

# Match filter for Armor#list (any subset of Armor fields).
#
# @!attribute [rw] armor_set
#   @return [Hash, nil]
#
# @!attribute [rw] asset
#   @return [Hash, nil]
#
# @!attribute [rw] attribute
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
# @!attribute [rw] resistance
#   @return [Hash, nil]
#
# @!attribute [rw] skill
#   @return [Array, nil]
#
# @!attribute [rw] slot
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
ArmorListMatch = Struct.new(
  :armor_set,
  :asset,
  :attribute,
  :crafting,
  :defense,
  :id,
  :name,
  :rank,
  :rarity,
  :resistance,
  :skill,
  :slot,
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
# @!attribute [rw] piece
#   @return [Array, nil]
#
# @!attribute [rw] rank
#   @return [String, nil]
ArmorSet = Struct.new(
  :bonus,
  :id,
  :name,
  :piece,
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

# Match filter for ArmorSet#list (any subset of ArmorSet fields).
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
# @!attribute [rw] piece
#   @return [Array, nil]
#
# @!attribute [rw] rank
#   @return [String, nil]
ArmorSetListMatch = Struct.new(
  :bonus,
  :id,
  :name,
  :piece,
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
# @!attribute [rw] skill
#   @return [Array, nil]
Charm = Struct.new(
  :crafting,
  :id,
  :name,
  :rarity,
  :skill,
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

# Match filter for Charm#list (any subset of Charm fields).
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
# @!attribute [rw] skill
#   @return [Array, nil]
CharmListMatch = Struct.new(
  :crafting,
  :id,
  :name,
  :rarity,
  :skill,
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
# @!attribute [rw] skill
#   @return [Array, nil]
#
# @!attribute [rw] slot
#   @return [Integer, nil]
Decoration = Struct.new(
  :id,
  :name,
  :rarity,
  :skill,
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

# Match filter for Decoration#list (any subset of Decoration fields).
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
# @!attribute [rw] skill
#   @return [Array, nil]
#
# @!attribute [rw] slot
#   @return [Integer, nil]
DecorationListMatch = Struct.new(
  :id,
  :name,
  :rarity,
  :skill,
  :slot,
  keyword_init: true
)

# Event entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] end_timestamp
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
# @!attribute [rw] quest_rank
#   @return [String, nil]
#
# @!attribute [rw] requirement
#   @return [String, nil]
#
# @!attribute [rw] start_timestamp
#   @return [String, nil]
#
# @!attribute [rw] success_condition
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Event = Struct.new(
  :description,
  :end_timestamp,
  :exclusive,
  :expansion,
  :id,
  :location,
  :name,
  :platform,
  :quest_rank,
  :requirement,
  :start_timestamp,
  :success_condition,
  :type,
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

# Match filter for Event#list (any subset of Event fields).
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] end_timestamp
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
# @!attribute [rw] quest_rank
#   @return [String, nil]
#
# @!attribute [rw] requirement
#   @return [String, nil]
#
# @!attribute [rw] start_timestamp
#   @return [String, nil]
#
# @!attribute [rw] success_condition
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
EventListMatch = Struct.new(
  :description,
  :end_timestamp,
  :exclusive,
  :expansion,
  :id,
  :location,
  :name,
  :platform,
  :quest_rank,
  :requirement,
  :start_timestamp,
  :success_condition,
  :type,
  keyword_init: true
)

# Item entity data model.
#
# @!attribute [rw] buy_price
#   @return [Integer, nil]
#
# @!attribute [rw] carry_limit
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
# @!attribute [rw] sell_price
#   @return [Integer, nil]
#
# @!attribute [rw] value
#   @return [Integer, nil]
Item = Struct.new(
  :buy_price,
  :carry_limit,
  :description,
  :id,
  :name,
  :rarity,
  :sell_price,
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

# Match filter for Item#list (any subset of Item fields).
#
# @!attribute [rw] buy_price
#   @return [Integer, nil]
#
# @!attribute [rw] carry_limit
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
# @!attribute [rw] sell_price
#   @return [Integer, nil]
#
# @!attribute [rw] value
#   @return [Integer, nil]
ItemListMatch = Struct.new(
  :buy_price,
  :carry_limit,
  :description,
  :id,
  :name,
  :rarity,
  :sell_price,
  :value,
  keyword_init: true
)

# Location entity data model.
#
# @!attribute [rw] camp
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] zone_count
#   @return [Integer, nil]
Location = Struct.new(
  :camp,
  :id,
  :name,
  :zone_count,
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

# Match filter for Location#list (any subset of Location fields).
#
# @!attribute [rw] camp
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] zone_count
#   @return [Integer, nil]
LocationListMatch = Struct.new(
  :camp,
  :id,
  :name,
  :zone_count,
  keyword_init: true
)

# Monster entity data model.
#
# @!attribute [rw] ailment
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] element
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] location
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] resistance
#   @return [Array, nil]
#
# @!attribute [rw] reward
#   @return [Array, nil]
#
# @!attribute [rw] species
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] weakness
#   @return [Array, nil]
Monster = Struct.new(
  :ailment,
  :description,
  :element,
  :id,
  :location,
  :name,
  :resistance,
  :reward,
  :species,
  :type,
  :weakness,
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

# Match filter for Monster#list (any subset of Monster fields).
#
# @!attribute [rw] ailment
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] element
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] location
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] resistance
#   @return [Array, nil]
#
# @!attribute [rw] reward
#   @return [Array, nil]
#
# @!attribute [rw] species
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] weakness
#   @return [Array, nil]
MonsterListMatch = Struct.new(
  :ailment,
  :description,
  :element,
  :id,
  :location,
  :name,
  :resistance,
  :reward,
  :species,
  :type,
  :weakness,
  keyword_init: true
)

# MotionValue entity data model.
#
# @!attribute [rw] damage_type
#   @return [String, nil]
#
# @!attribute [rw] exhaust
#   @return [Integer, nil]
#
# @!attribute [rw] hit
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] stun
#   @return [Integer, nil]
#
# @!attribute [rw] weapon_type
#   @return [String, nil]
MotionValue = Struct.new(
  :damage_type,
  :exhaust,
  :hit,
  :id,
  :stun,
  :weapon_type,
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

# Match filter for MotionValue#list (any subset of MotionValue fields).
#
# @!attribute [rw] damage_type
#   @return [String, nil]
#
# @!attribute [rw] exhaust
#   @return [Integer, nil]
#
# @!attribute [rw] hit
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] stun
#   @return [Integer, nil]
#
# @!attribute [rw] weapon_type
#   @return [String, nil]
MotionValueListMatch = Struct.new(
  :damage_type,
  :exhaust,
  :hit,
  :id,
  :stun,
  :weapon_type,
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
# @!attribute [rw] rank
#   @return [Array, nil]
Skill = Struct.new(
  :description,
  :id,
  :name,
  :rank,
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

# Match filter for Skill#list (any subset of Skill fields).
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
# @!attribute [rw] rank
#   @return [Array, nil]
SkillListMatch = Struct.new(
  :description,
  :id,
  :name,
  :rank,
  keyword_init: true
)

# Weapon entity data model.
#
# @!attribute [rw] asset
#   @return [Hash, nil]
#
# @!attribute [rw] attack
#   @return [Hash, nil]
#
# @!attribute [rw] attribute
#   @return [Hash, nil]
#
# @!attribute [rw] crafting
#   @return [Hash, nil]
#
# @!attribute [rw] damage_type
#   @return [String, nil]
#
# @!attribute [rw] element
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
# @!attribute [rw] slot
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Weapon = Struct.new(
  :asset,
  :attack,
  :attribute,
  :crafting,
  :damage_type,
  :element,
  :id,
  :name,
  :rarity,
  :slot,
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

# Match filter for Weapon#list (any subset of Weapon fields).
#
# @!attribute [rw] asset
#   @return [Hash, nil]
#
# @!attribute [rw] attack
#   @return [Hash, nil]
#
# @!attribute [rw] attribute
#   @return [Hash, nil]
#
# @!attribute [rw] crafting
#   @return [Hash, nil]
#
# @!attribute [rw] damage_type
#   @return [String, nil]
#
# @!attribute [rw] element
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
# @!attribute [rw] slot
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
WeaponListMatch = Struct.new(
  :asset,
  :attack,
  :attribute,
  :crafting,
  :damage_type,
  :element,
  :id,
  :name,
  :rarity,
  :slot,
  :type,
  keyword_init: true
)

