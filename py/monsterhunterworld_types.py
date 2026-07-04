# Typed models for the MonsterHunterWorld SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Ailment(TypedDict, total=False):
    description: str
    id: int
    name: str
    protection: dict
    recovery: dict


class AilmentLoadMatch(TypedDict):
    id: int


class AilmentListMatch(TypedDict, total=False):
    description: str
    id: int
    name: str
    protection: dict
    recovery: dict


class Armor(TypedDict, total=False):
    armor_set: dict
    asset: dict
    attribute: dict
    crafting: dict
    defense: dict
    id: int
    name: str
    rank: str
    rarity: int
    resistance: dict
    skill: list
    slot: list
    type: str


class ArmorLoadMatch(TypedDict):
    id: int


class ArmorListMatch(TypedDict, total=False):
    armor_set: dict
    asset: dict
    attribute: dict
    crafting: dict
    defense: dict
    id: int
    name: str
    rank: str
    rarity: int
    resistance: dict
    skill: list
    slot: list
    type: str


class ArmorSet(TypedDict, total=False):
    bonus: dict
    id: int
    name: str
    piece: list
    rank: str


class ArmorSetLoadMatch(TypedDict):
    id: int


class ArmorSetListMatch(TypedDict, total=False):
    bonus: dict
    id: int
    name: str
    piece: list
    rank: str


class Charm(TypedDict, total=False):
    crafting: dict
    id: int
    name: str
    rarity: int
    skill: list


class CharmLoadMatch(TypedDict):
    id: int


class CharmListMatch(TypedDict, total=False):
    crafting: dict
    id: int
    name: str
    rarity: int
    skill: list


class Decoration(TypedDict, total=False):
    id: int
    name: str
    rarity: int
    skill: list
    slot: int


class DecorationLoadMatch(TypedDict):
    id: int


class DecorationListMatch(TypedDict, total=False):
    id: int
    name: str
    rarity: int
    skill: list
    slot: int


class Event(TypedDict, total=False):
    description: str
    end_timestamp: str
    exclusive: str
    expansion: str
    id: int
    location: dict
    name: str
    platform: str
    quest_rank: str
    requirement: str
    start_timestamp: str
    success_condition: str
    type: str


class EventLoadMatch(TypedDict):
    id: int


class EventListMatch(TypedDict, total=False):
    description: str
    end_timestamp: str
    exclusive: str
    expansion: str
    id: int
    location: dict
    name: str
    platform: str
    quest_rank: str
    requirement: str
    start_timestamp: str
    success_condition: str
    type: str


class Item(TypedDict, total=False):
    buy_price: int
    carry_limit: int
    description: str
    id: int
    name: str
    rarity: int
    sell_price: int
    value: int


class ItemLoadMatch(TypedDict):
    id: int


class ItemListMatch(TypedDict, total=False):
    buy_price: int
    carry_limit: int
    description: str
    id: int
    name: str
    rarity: int
    sell_price: int
    value: int


class Location(TypedDict, total=False):
    camp: list
    id: int
    name: str
    zone_count: int


class LocationLoadMatch(TypedDict):
    id: int


class LocationListMatch(TypedDict, total=False):
    camp: list
    id: int
    name: str
    zone_count: int


class Monster(TypedDict, total=False):
    ailment: list
    description: str
    element: list
    id: int
    location: list
    name: str
    resistance: list
    reward: list
    species: str
    type: str
    weakness: list


class MonsterLoadMatch(TypedDict):
    id: int


class MonsterListMatch(TypedDict, total=False):
    ailment: list
    description: str
    element: list
    id: int
    location: list
    name: str
    resistance: list
    reward: list
    species: str
    type: str
    weakness: list


class MotionValue(TypedDict, total=False):
    damage_type: str
    exhaust: int
    hit: list
    id: int
    stun: int
    weapon_type: str


class MotionValueLoadMatch(TypedDict):
    id: int


class MotionValueListMatch(TypedDict, total=False):
    damage_type: str
    exhaust: int
    hit: list
    id: int
    stun: int
    weapon_type: str


class Skill(TypedDict, total=False):
    description: str
    id: int
    name: str
    rank: list


class SkillLoadMatch(TypedDict):
    id: int


class SkillListMatch(TypedDict, total=False):
    description: str
    id: int
    name: str
    rank: list


class Weapon(TypedDict, total=False):
    asset: dict
    attack: dict
    attribute: dict
    crafting: dict
    damage_type: str
    element: list
    id: int
    name: str
    rarity: int
    slot: list
    type: str


class WeaponLoadMatch(TypedDict):
    id: int


class WeaponListMatch(TypedDict, total=False):
    asset: dict
    attack: dict
    attribute: dict
    crafting: dict
    damage_type: str
    element: list
    id: int
    name: str
    rarity: int
    slot: list
    type: str
