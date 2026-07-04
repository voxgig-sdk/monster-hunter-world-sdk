# Typed models for the MonsterHunterWorld SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Ailment:
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    protection: Optional[dict] = None
    recovery: Optional[dict] = None


@dataclass
class AilmentLoadMatch:
    id: int


@dataclass
class AilmentListMatch:
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    protection: Optional[dict] = None
    recovery: Optional[dict] = None


@dataclass
class Armor:
    armor_set: Optional[dict] = None
    asset: Optional[dict] = None
    attribute: Optional[dict] = None
    crafting: Optional[dict] = None
    defense: Optional[dict] = None
    id: Optional[int] = None
    name: Optional[str] = None
    rank: Optional[str] = None
    rarity: Optional[int] = None
    resistance: Optional[dict] = None
    skill: Optional[list] = None
    slot: Optional[list] = None
    type: Optional[str] = None


@dataclass
class ArmorLoadMatch:
    id: int


@dataclass
class ArmorListMatch:
    armor_set: Optional[dict] = None
    asset: Optional[dict] = None
    attribute: Optional[dict] = None
    crafting: Optional[dict] = None
    defense: Optional[dict] = None
    id: Optional[int] = None
    name: Optional[str] = None
    rank: Optional[str] = None
    rarity: Optional[int] = None
    resistance: Optional[dict] = None
    skill: Optional[list] = None
    slot: Optional[list] = None
    type: Optional[str] = None


@dataclass
class ArmorSet:
    bonus: Optional[dict] = None
    id: Optional[int] = None
    name: Optional[str] = None
    piece: Optional[list] = None
    rank: Optional[str] = None


@dataclass
class ArmorSetLoadMatch:
    id: int


@dataclass
class ArmorSetListMatch:
    bonus: Optional[dict] = None
    id: Optional[int] = None
    name: Optional[str] = None
    piece: Optional[list] = None
    rank: Optional[str] = None


@dataclass
class Charm:
    crafting: Optional[dict] = None
    id: Optional[int] = None
    name: Optional[str] = None
    rarity: Optional[int] = None
    skill: Optional[list] = None


@dataclass
class CharmLoadMatch:
    id: int


@dataclass
class CharmListMatch:
    crafting: Optional[dict] = None
    id: Optional[int] = None
    name: Optional[str] = None
    rarity: Optional[int] = None
    skill: Optional[list] = None


@dataclass
class Decoration:
    id: Optional[int] = None
    name: Optional[str] = None
    rarity: Optional[int] = None
    skill: Optional[list] = None
    slot: Optional[int] = None


@dataclass
class DecorationLoadMatch:
    id: int


@dataclass
class DecorationListMatch:
    id: Optional[int] = None
    name: Optional[str] = None
    rarity: Optional[int] = None
    skill: Optional[list] = None
    slot: Optional[int] = None


@dataclass
class Event:
    description: Optional[str] = None
    end_timestamp: Optional[str] = None
    exclusive: Optional[str] = None
    expansion: Optional[str] = None
    id: Optional[int] = None
    location: Optional[dict] = None
    name: Optional[str] = None
    platform: Optional[str] = None
    quest_rank: Optional[str] = None
    requirement: Optional[str] = None
    start_timestamp: Optional[str] = None
    success_condition: Optional[str] = None
    type: Optional[str] = None


@dataclass
class EventLoadMatch:
    id: int


@dataclass
class EventListMatch:
    description: Optional[str] = None
    end_timestamp: Optional[str] = None
    exclusive: Optional[str] = None
    expansion: Optional[str] = None
    id: Optional[int] = None
    location: Optional[dict] = None
    name: Optional[str] = None
    platform: Optional[str] = None
    quest_rank: Optional[str] = None
    requirement: Optional[str] = None
    start_timestamp: Optional[str] = None
    success_condition: Optional[str] = None
    type: Optional[str] = None


@dataclass
class Item:
    buy_price: Optional[int] = None
    carry_limit: Optional[int] = None
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    rarity: Optional[int] = None
    sell_price: Optional[int] = None
    value: Optional[int] = None


@dataclass
class ItemLoadMatch:
    id: int


@dataclass
class ItemListMatch:
    buy_price: Optional[int] = None
    carry_limit: Optional[int] = None
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    rarity: Optional[int] = None
    sell_price: Optional[int] = None
    value: Optional[int] = None


@dataclass
class Location:
    camp: Optional[list] = None
    id: Optional[int] = None
    name: Optional[str] = None
    zone_count: Optional[int] = None


@dataclass
class LocationLoadMatch:
    id: int


@dataclass
class LocationListMatch:
    camp: Optional[list] = None
    id: Optional[int] = None
    name: Optional[str] = None
    zone_count: Optional[int] = None


@dataclass
class Monster:
    ailment: Optional[list] = None
    description: Optional[str] = None
    element: Optional[list] = None
    id: Optional[int] = None
    location: Optional[list] = None
    name: Optional[str] = None
    resistance: Optional[list] = None
    reward: Optional[list] = None
    species: Optional[str] = None
    type: Optional[str] = None
    weakness: Optional[list] = None


@dataclass
class MonsterLoadMatch:
    id: int


@dataclass
class MonsterListMatch:
    ailment: Optional[list] = None
    description: Optional[str] = None
    element: Optional[list] = None
    id: Optional[int] = None
    location: Optional[list] = None
    name: Optional[str] = None
    resistance: Optional[list] = None
    reward: Optional[list] = None
    species: Optional[str] = None
    type: Optional[str] = None
    weakness: Optional[list] = None


@dataclass
class MotionValue:
    damage_type: Optional[str] = None
    exhaust: Optional[int] = None
    hit: Optional[list] = None
    id: Optional[int] = None
    stun: Optional[int] = None
    weapon_type: Optional[str] = None


@dataclass
class MotionValueLoadMatch:
    id: int


@dataclass
class MotionValueListMatch:
    damage_type: Optional[str] = None
    exhaust: Optional[int] = None
    hit: Optional[list] = None
    id: Optional[int] = None
    stun: Optional[int] = None
    weapon_type: Optional[str] = None


@dataclass
class Skill:
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    rank: Optional[list] = None


@dataclass
class SkillLoadMatch:
    id: int


@dataclass
class SkillListMatch:
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    rank: Optional[list] = None


@dataclass
class Weapon:
    asset: Optional[dict] = None
    attack: Optional[dict] = None
    attribute: Optional[dict] = None
    crafting: Optional[dict] = None
    damage_type: Optional[str] = None
    element: Optional[list] = None
    id: Optional[int] = None
    name: Optional[str] = None
    rarity: Optional[int] = None
    slot: Optional[list] = None
    type: Optional[str] = None


@dataclass
class WeaponLoadMatch:
    id: int


@dataclass
class WeaponListMatch:
    asset: Optional[dict] = None
    attack: Optional[dict] = None
    attribute: Optional[dict] = None
    crafting: Optional[dict] = None
    damage_type: Optional[str] = None
    element: Optional[list] = None
    id: Optional[int] = None
    name: Optional[str] = None
    rarity: Optional[int] = None
    slot: Optional[list] = None
    type: Optional[str] = None

