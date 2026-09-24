# Typed models for the MonsterHunterWorld SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
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


class AilmentLoadMatchRequired(TypedDict):
    id: int


class AilmentLoadMatch(AilmentLoadMatchRequired, total=False):
    p: str


class AilmentListMatch(TypedDict, total=False):
    p: str
    q: str


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


class ArmorLoadMatchRequired(TypedDict):
    id: int


class ArmorLoadMatch(ArmorLoadMatchRequired, total=False):
    p: str


class ArmorListMatch(TypedDict, total=False):
    p: str
    q: str


class ArmorSet(TypedDict, total=False):
    bonus: dict
    id: int
    name: str
    pieces: list
    rank: str


class ArmorSetLoadMatchRequired(TypedDict):
    id: int


class ArmorSetLoadMatch(ArmorSetLoadMatchRequired, total=False):
    p: str


class ArmorSetListMatch(TypedDict, total=False):
    p: str
    q: str


class Charm(TypedDict, total=False):
    crafting: dict
    id: int
    name: str
    rarity: int
    skills: list


class CharmLoadMatchRequired(TypedDict):
    id: int


class CharmLoadMatch(CharmLoadMatchRequired, total=False):
    p: str


class CharmListMatch(TypedDict, total=False):
    p: str
    q: str


class Decoration(TypedDict, total=False):
    id: int
    name: str
    rarity: int
    skills: list
    slot: int


class DecorationLoadMatchRequired(TypedDict):
    id: int


class DecorationLoadMatch(DecorationLoadMatchRequired, total=False):
    p: str


class DecorationListMatch(TypedDict, total=False):
    p: str
    q: str


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


class EventLoadMatchRequired(TypedDict):
    id: int


class EventLoadMatch(EventLoadMatchRequired, total=False):
    p: str


class EventListMatch(TypedDict, total=False):
    p: str
    q: str


class Item(TypedDict, total=False):
    buyPrice: int
    carryLimit: int
    description: str
    id: int
    name: str
    rarity: int
    sellPrice: int
    value: int


class ItemLoadMatchRequired(TypedDict):
    id: int


class ItemLoadMatch(ItemLoadMatchRequired, total=False):
    p: str


class ItemListMatch(TypedDict, total=False):
    p: str
    q: str


class Location(TypedDict, total=False):
    camps: list
    id: int
    name: str
    zoneCount: int


class LocationLoadMatchRequired(TypedDict):
    id: int


class LocationLoadMatch(LocationLoadMatchRequired, total=False):
    p: str


class LocationListMatch(TypedDict, total=False):
    p: str
    q: str


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


class MonsterLoadMatchRequired(TypedDict):
    id: int


class MonsterLoadMatch(MonsterLoadMatchRequired, total=False):
    p: str


class MonsterListMatch(TypedDict, total=False):
    p: str
    q: str


class MotionValue(TypedDict, total=False):
    damageType: str
    exhaust: int
    hits: list
    id: int
    stun: int
    weaponType: str


class MotionValueLoadMatchRequired(TypedDict):
    id: int


class MotionValueLoadMatch(MotionValueLoadMatchRequired, total=False):
    p: str


class MotionValueListMatch(TypedDict, total=False):
    p: str
    q: str


class Skill(TypedDict, total=False):
    description: str
    id: int
    name: str
    ranks: list


class SkillLoadMatchRequired(TypedDict):
    id: int


class SkillLoadMatch(SkillLoadMatchRequired, total=False):
    p: str


class SkillListMatch(TypedDict, total=False):
    p: str
    q: str


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


class WeaponLoadMatchRequired(TypedDict):
    id: int


class WeaponLoadMatch(WeaponLoadMatchRequired, total=False):
    p: str


class WeaponListMatch(TypedDict, total=False):
    p: str
    q: str
