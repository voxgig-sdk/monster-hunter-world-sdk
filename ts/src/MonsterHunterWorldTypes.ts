// Typed models for the MonsterHunterWorld SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Ailment {
  description?: string
  id?: number
  name?: string
  protection?: Record<string, any>
  recovery?: Record<string, any>
}

export interface AilmentLoadMatch {
  id: number
}

export interface AilmentListMatch {
  description?: string
  id?: number
  name?: string
  protection?: Record<string, any>
  recovery?: Record<string, any>
}

export interface Armor {
  armor_set?: Record<string, any>
  asset?: Record<string, any>
  attribute?: Record<string, any>
  crafting?: Record<string, any>
  defense?: Record<string, any>
  id?: number
  name?: string
  rank?: string
  rarity?: number
  resistance?: Record<string, any>
  skill?: any[]
  slot?: any[]
  type?: string
}

export interface ArmorLoadMatch {
  id: number
}

export interface ArmorListMatch {
  armor_set?: Record<string, any>
  asset?: Record<string, any>
  attribute?: Record<string, any>
  crafting?: Record<string, any>
  defense?: Record<string, any>
  id?: number
  name?: string
  rank?: string
  rarity?: number
  resistance?: Record<string, any>
  skill?: any[]
  slot?: any[]
  type?: string
}

export interface ArmorSet {
  bonus?: Record<string, any>
  id?: number
  name?: string
  piece?: any[]
  rank?: string
}

export interface ArmorSetLoadMatch {
  id: number
}

export interface ArmorSetListMatch {
  bonus?: Record<string, any>
  id?: number
  name?: string
  piece?: any[]
  rank?: string
}

export interface Charm {
  crafting?: Record<string, any>
  id?: number
  name?: string
  rarity?: number
  skill?: any[]
}

export interface CharmLoadMatch {
  id: number
}

export interface CharmListMatch {
  crafting?: Record<string, any>
  id?: number
  name?: string
  rarity?: number
  skill?: any[]
}

export interface Decoration {
  id?: number
  name?: string
  rarity?: number
  skill?: any[]
  slot?: number
}

export interface DecorationLoadMatch {
  id: number
}

export interface DecorationListMatch {
  id?: number
  name?: string
  rarity?: number
  skill?: any[]
  slot?: number
}

export interface Event {
  description?: string
  end_timestamp?: string
  exclusive?: string
  expansion?: string
  id?: number
  location?: Record<string, any>
  name?: string
  platform?: string
  quest_rank?: string
  requirement?: string
  start_timestamp?: string
  success_condition?: string
  type?: string
}

export interface EventLoadMatch {
  id: number
}

export interface EventListMatch {
  description?: string
  end_timestamp?: string
  exclusive?: string
  expansion?: string
  id?: number
  location?: Record<string, any>
  name?: string
  platform?: string
  quest_rank?: string
  requirement?: string
  start_timestamp?: string
  success_condition?: string
  type?: string
}

export interface Item {
  buy_price?: number
  carry_limit?: number
  description?: string
  id?: number
  name?: string
  rarity?: number
  sell_price?: number
  value?: number
}

export interface ItemLoadMatch {
  id: number
}

export interface ItemListMatch {
  buy_price?: number
  carry_limit?: number
  description?: string
  id?: number
  name?: string
  rarity?: number
  sell_price?: number
  value?: number
}

export interface Location {
  camp?: any[]
  id?: number
  name?: string
  zone_count?: number
}

export interface LocationLoadMatch {
  id: number
}

export interface LocationListMatch {
  camp?: any[]
  id?: number
  name?: string
  zone_count?: number
}

export interface Monster {
  ailment?: any[]
  description?: string
  element?: any[]
  id?: number
  location?: any[]
  name?: string
  resistance?: any[]
  reward?: any[]
  species?: string
  type?: string
  weakness?: any[]
}

export interface MonsterLoadMatch {
  id: number
}

export interface MonsterListMatch {
  ailment?: any[]
  description?: string
  element?: any[]
  id?: number
  location?: any[]
  name?: string
  resistance?: any[]
  reward?: any[]
  species?: string
  type?: string
  weakness?: any[]
}

export interface MotionValue {
  damage_type?: string
  exhaust?: number
  hit?: any[]
  id?: number
  stun?: number
  weapon_type?: string
}

export interface MotionValueLoadMatch {
  id: number
}

export interface MotionValueListMatch {
  damage_type?: string
  exhaust?: number
  hit?: any[]
  id?: number
  stun?: number
  weapon_type?: string
}

export interface Skill {
  description?: string
  id?: number
  name?: string
  rank?: any[]
}

export interface SkillLoadMatch {
  id: number
}

export interface SkillListMatch {
  description?: string
  id?: number
  name?: string
  rank?: any[]
}

export interface Weapon {
  asset?: Record<string, any>
  attack?: Record<string, any>
  attribute?: Record<string, any>
  crafting?: Record<string, any>
  damage_type?: string
  element?: any[]
  id?: number
  name?: string
  rarity?: number
  slot?: any[]
  type?: string
}

export interface WeaponLoadMatch {
  id: number
}

export interface WeaponListMatch {
  asset?: Record<string, any>
  attack?: Record<string, any>
  attribute?: Record<string, any>
  crafting?: Record<string, any>
  damage_type?: string
  element?: any[]
  id?: number
  name?: string
  rarity?: number
  slot?: any[]
  type?: string
}

