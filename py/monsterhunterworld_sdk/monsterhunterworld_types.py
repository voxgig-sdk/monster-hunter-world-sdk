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
    armorSet: dict
    assets: dict
    attributes: dict
    crafting: dict
    defense: dict
    id: int
    name: str
    rank: str
    rarity: int
    resistances: dict
    skills: list
    slots: list
    type: str


class ArmorLoadMatch(TypedDict):
    id: int


class ArmorListMatch(TypedDict, total=False):
    armorSet: dict
    assets: dict
    attributes: dict
    crafting: dict
    defense: dict
    id: int
    name: str
    rank: str
    rarity: int
    resistances: dict
    skills: list
    slots: list
    type: str


class ArmorSet(TypedDict, total=False):
    bonus: dict
    id: int
    name: str
    pieces: list
    rank: str


class ArmorSetLoadMatch(TypedDict):
    id: int


class ArmorSetListMatch(TypedDict, total=False):
    bonus: dict
    id: int
    name: str
    pieces: list
    rank: str


class Charm(TypedDict, total=False):
    crafting: dict
    id: int
    name: str
    rarity: int
    skills: list


class CharmLoadMatch(TypedDict):
    id: int


class CharmListMatch(TypedDict, total=False):
    crafting: dict
    id: int
    name: str
    rarity: int
    skills: list


class Decoration(TypedDict, total=False):
    id: int
    name: str
    rarity: int
    skills: list
    slot: int


class DecorationLoadMatch(TypedDict):
    id: int


class DecorationListMatch(TypedDict, total=False):
    id: int
    name: str
    rarity: int
    skills: list
    slot: int


class Event(TypedDict, total=False):
    camps: list
    description: str
    endTimestamp: str
    exclusive: str
    expansion: str
    id: int
    location: dict
    name: str
    platform: str
    questRank: str
    requirements: str
    startTimestamp: str
    successConditions: str
    type: str
    zoneCount: int


class EventLoadMatch(TypedDict):
    id: int


class EventListMatch(TypedDict, total=False):
    camps: list
    description: str
    endTimestamp: str
    exclusive: str
    expansion: str
    id: int
    location: dict
    name: str
    platform: str
    questRank: str
    requirements: str
    startTimestamp: str
    successConditions: str
    type: str
    zoneCount: int


class Item(TypedDict, total=False):
    buyPrice: int
    carryLimit: int
    description: str
    id: int
    name: str
    rarity: int
    sellPrice: int
    value: int


class ItemLoadMatch(TypedDict):
    id: int


class ItemListMatch(TypedDict, total=False):
    buyPrice: int
    carryLimit: int
    description: str
    id: int
    name: str
    rarity: int
    sellPrice: int
    value: int


class Location(TypedDict, total=False):
    camps: list
    id: int
    name: str
    zoneCount: int


class LocationLoadMatch(TypedDict):
    id: int


class LocationListMatch(TypedDict, total=False):
    camps: list
    id: int
    name: str
    zoneCount: int


class Monster(TypedDict, total=False):
    ailments: list
    description: str
    elements: list
    id: int
    locations: list
    name: str
    resistances: list
    rewards: list
    species: str
    type: str
    weaknesses: list


class MonsterLoadMatch(TypedDict):
    id: int


class MonsterListMatch(TypedDict, total=False):
    ailments: list
    description: str
    elements: list
    id: int
    locations: list
    name: str
    resistances: list
    rewards: list
    species: str
    type: str
    weaknesses: list


class MotionValue(TypedDict, total=False):
    damageType: str
    exhaust: int
    hits: list
    id: int
    stun: int
    weaponType: str


class MotionValueLoadMatch(TypedDict):
    id: int


class MotionValueListMatch(TypedDict, total=False):
    damageType: str
    exhaust: int
    hits: list
    id: int
    stun: int
    weaponType: str


class Skill(TypedDict, total=False):
    description: str
    id: int
    name: str
    ranks: list


class SkillLoadMatch(TypedDict):
    id: int


class SkillListMatch(TypedDict, total=False):
    description: str
    id: int
    name: str
    ranks: list


class Weapon(TypedDict, total=False):
    assets: dict
    attack: dict
    attributes: dict
    crafting: dict
    damageType: str
    elements: list
    id: int
    name: str
    rarity: int
    slots: list
    type: str


class WeaponLoadMatch(TypedDict):
    id: int


class WeaponListMatch(TypedDict, total=False):
    assets: dict
    attack: dict
    attributes: dict
    crafting: dict
    damageType: str
    elements: list
    id: int
    name: str
    rarity: int
    slots: list
    type: str
