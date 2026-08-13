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
  armorSet?: Record<string, any>
  assets?: Record<string, any>
  attributes?: Record<string, any>
  crafting?: Record<string, any>
  defense?: Record<string, any>
  id?: number
  name?: string
  rank?: string
  rarity?: number
  resistances?: Record<string, any>
  skills?: any[]
  slots?: any[]
  type?: string
}

export interface ArmorLoadMatch {
  id: number
}

export interface ArmorListMatch {
  armorSet?: Record<string, any>
  assets?: Record<string, any>
  attributes?: Record<string, any>
  crafting?: Record<string, any>
  defense?: Record<string, any>
  id?: number
  name?: string
  rank?: string
  rarity?: number
  resistances?: Record<string, any>
  skills?: any[]
  slots?: any[]
  type?: string
}

export interface ArmorSet {
  bonus?: Record<string, any>
  id?: number
  name?: string
  pieces?: any[]
  rank?: string
}

export interface ArmorSetLoadMatch {
  id: number
}

export interface ArmorSetListMatch {
  bonus?: Record<string, any>
  id?: number
  name?: string
  pieces?: any[]
  rank?: string
}

export interface Charm {
  crafting?: Record<string, any>
  id?: number
  name?: string
  rarity?: number
  skills?: any[]
}

export interface CharmLoadMatch {
  id: number
}

export interface CharmListMatch {
  crafting?: Record<string, any>
  id?: number
  name?: string
  rarity?: number
  skills?: any[]
}

export interface Decoration {
  id?: number
  name?: string
  rarity?: number
  skills?: any[]
  slot?: number
}

export interface DecorationLoadMatch {
  id: number
}

export interface DecorationListMatch {
  id?: number
  name?: string
  rarity?: number
  skills?: any[]
  slot?: number
}

export interface Event {
  camps?: any[]
  description?: string
  endTimestamp?: string
  exclusive?: string
  expansion?: string
  id?: number
  location?: Record<string, any>
  name?: string
  platform?: string
  questRank?: string
  requirements?: string
  startTimestamp?: string
  successConditions?: string
  type?: string
  zoneCount?: number
}

export interface EventLoadMatch {
  id: number
}

export interface EventListMatch {
  camps?: any[]
  description?: string
  endTimestamp?: string
  exclusive?: string
  expansion?: string
  id?: number
  location?: Record<string, any>
  name?: string
  platform?: string
  questRank?: string
  requirements?: string
  startTimestamp?: string
  successConditions?: string
  type?: string
  zoneCount?: number
}

export interface Item {
  buyPrice?: number
  carryLimit?: number
  description?: string
  id?: number
  name?: string
  rarity?: number
  sellPrice?: number
  value?: number
}

export interface ItemLoadMatch {
  id: number
}

export interface ItemListMatch {
  buyPrice?: number
  carryLimit?: number
  description?: string
  id?: number
  name?: string
  rarity?: number
  sellPrice?: number
  value?: number
}

export interface Location {
  camps?: any[]
  id?: number
  name?: string
  zoneCount?: number
}

export interface LocationLoadMatch {
  id: number
}

export interface LocationListMatch {
  camps?: any[]
  id?: number
  name?: string
  zoneCount?: number
}

export interface Monster {
  ailments?: any[]
  description?: string
  elements?: any[]
  id?: number
  locations?: any[]
  name?: string
  resistances?: any[]
  rewards?: any[]
  species?: string
  type?: string
  weaknesses?: any[]
}

export interface MonsterLoadMatch {
  id: number
}

export interface MonsterListMatch {
  ailments?: any[]
  description?: string
  elements?: any[]
  id?: number
  locations?: any[]
  name?: string
  resistances?: any[]
  rewards?: any[]
  species?: string
  type?: string
  weaknesses?: any[]
}

export interface MotionValue {
  damageType?: string
  exhaust?: number
  hits?: any[]
  id?: number
  stun?: number
  weaponType?: string
}

export interface MotionValueLoadMatch {
  id: number
}

export interface MotionValueListMatch {
  damageType?: string
  exhaust?: number
  hits?: any[]
  id?: number
  stun?: number
  weaponType?: string
}

export interface Skill {
  description?: string
  id?: number
  name?: string
  ranks?: any[]
}

export interface SkillLoadMatch {
  id: number
}

export interface SkillListMatch {
  description?: string
  id?: number
  name?: string
  ranks?: any[]
}

export interface Weapon {
  assets?: Record<string, any>
  attack?: Record<string, any>
  attributes?: Record<string, any>
  crafting?: Record<string, any>
  damageType?: string
  elements?: any[]
  id?: number
  name?: string
  rarity?: number
  slots?: any[]
  type?: string
}

export interface WeaponLoadMatch {
  id: number
}

export interface WeaponListMatch {
  assets?: Record<string, any>
  attack?: Record<string, any>
  attributes?: Record<string, any>
  crafting?: Record<string, any>
  damageType?: string
  elements?: any[]
  id?: number
  name?: string
  rarity?: number
  slots?: any[]
  type?: string
}

