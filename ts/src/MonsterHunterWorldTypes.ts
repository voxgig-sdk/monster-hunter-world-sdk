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

export type AilmentListMatch = Partial<Ailment>

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

export type ArmorListMatch = Partial<Armor>

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

export type ArmorSetListMatch = Partial<ArmorSet>

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

export type CharmListMatch = Partial<Charm>

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

export type DecorationListMatch = Partial<Decoration>

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

export type EventListMatch = Partial<Event>

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

export type ItemListMatch = Partial<Item>

export interface Location {
  camp?: any[]
  id?: number
  name?: string
  zone_count?: number
}

export interface LocationLoadMatch {
  id: number
}

export type LocationListMatch = Partial<Location>

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

export type MonsterListMatch = Partial<Monster>

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

export type MotionValueListMatch = Partial<MotionValue>

export interface Skill {
  description?: string
  id?: number
  name?: string
  rank?: any[]
}

export interface SkillLoadMatch {
  id: number
}

export type SkillListMatch = Partial<Skill>

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

export type WeaponListMatch = Partial<Weapon>

