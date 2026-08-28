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
  p?: string
}

export interface AilmentListMatch {
  p?: string
  q?: string
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
  p?: string
}

export interface ArmorListMatch {
  p?: string
  q?: string
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
  p?: string
}

export interface ArmorSetListMatch {
  p?: string
  q?: string
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
  p?: string
}

export interface CharmListMatch {
  p?: string
  q?: string
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
  p?: string
}

export interface DecorationListMatch {
  p?: string
  q?: string
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
  p?: string
}

export interface EventListMatch {
  p?: string
  q?: string
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
  p?: string
}

export interface ItemListMatch {
  p?: string
  q?: string
}

export interface Location {
  camps?: any[]
  id?: number
  name?: string
  zoneCount?: number
}

export interface LocationLoadMatch {
  id: number
  p?: string
}

export interface LocationListMatch {
  p?: string
  q?: string
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
  p?: string
}

export interface MonsterListMatch {
  p?: string
  q?: string
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
  p?: string
}

export interface MotionValueListMatch {
  p?: string
  q?: string
}

export interface Skill {
  description?: string
  id?: number
  name?: string
  ranks?: any[]
}

export interface SkillLoadMatch {
  id: number
  p?: string
}

export interface SkillListMatch {
  p?: string
  q?: string
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
  p?: string
}

export interface WeaponListMatch {
  p?: string
  q?: string
}

