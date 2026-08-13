<?php
declare(strict_types=1);

// Typed models for the MonsterHunterWorld SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Ailment entity data model. */
class Ailment
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $protection = null;
    public ?array $recovery = null;
}

/** Request payload for Ailment#load. */
class AilmentLoadMatch
{
    public int $id;
}

/** Request payload for Ailment#list. */
class AilmentListMatch
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $protection = null;
    public ?array $recovery = null;
}

/** Armor entity data model. */
class Armor
{
    public ?array $armorSet = null;
    public ?array $assets = null;
    public ?array $attributes = null;
    public ?array $crafting = null;
    public ?array $defense = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $rank = null;
    public ?int $rarity = null;
    public ?array $resistances = null;
    public ?array $skills = null;
    public ?array $slots = null;
    public ?string $type = null;
}

/** Request payload for Armor#load. */
class ArmorLoadMatch
{
    public int $id;
}

/** Request payload for Armor#list. */
class ArmorListMatch
{
    public ?array $armorSet = null;
    public ?array $assets = null;
    public ?array $attributes = null;
    public ?array $crafting = null;
    public ?array $defense = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $rank = null;
    public ?int $rarity = null;
    public ?array $resistances = null;
    public ?array $skills = null;
    public ?array $slots = null;
    public ?string $type = null;
}

/** ArmorSet entity data model. */
class ArmorSet
{
    public ?array $bonus = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $pieces = null;
    public ?string $rank = null;
}

/** Request payload for ArmorSet#load. */
class ArmorSetLoadMatch
{
    public int $id;
}

/** Request payload for ArmorSet#list. */
class ArmorSetListMatch
{
    public ?array $bonus = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $pieces = null;
    public ?string $rank = null;
}

/** Charm entity data model. */
class Charm
{
    public ?array $crafting = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?int $rarity = null;
    public ?array $skills = null;
}

/** Request payload for Charm#load. */
class CharmLoadMatch
{
    public int $id;
}

/** Request payload for Charm#list. */
class CharmListMatch
{
    public ?array $crafting = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?int $rarity = null;
    public ?array $skills = null;
}

/** Decoration entity data model. */
class Decoration
{
    public ?int $id = null;
    public ?string $name = null;
    public ?int $rarity = null;
    public ?array $skills = null;
    public ?int $slot = null;
}

/** Request payload for Decoration#load. */
class DecorationLoadMatch
{
    public int $id;
}

/** Request payload for Decoration#list. */
class DecorationListMatch
{
    public ?int $id = null;
    public ?string $name = null;
    public ?int $rarity = null;
    public ?array $skills = null;
    public ?int $slot = null;
}

/** Event entity data model. */
class Event
{
    public ?array $camps = null;
    public ?string $description = null;
    public ?string $endTimestamp = null;
    public ?string $exclusive = null;
    public ?string $expansion = null;
    public ?int $id = null;
    public ?array $location = null;
    public ?string $name = null;
    public ?string $platform = null;
    public ?string $questRank = null;
    public ?string $requirements = null;
    public ?string $startTimestamp = null;
    public ?string $successConditions = null;
    public ?string $type = null;
    public ?int $zoneCount = null;
}

/** Request payload for Event#load. */
class EventLoadMatch
{
    public int $id;
}

/** Request payload for Event#list. */
class EventListMatch
{
    public ?array $camps = null;
    public ?string $description = null;
    public ?string $endTimestamp = null;
    public ?string $exclusive = null;
    public ?string $expansion = null;
    public ?int $id = null;
    public ?array $location = null;
    public ?string $name = null;
    public ?string $platform = null;
    public ?string $questRank = null;
    public ?string $requirements = null;
    public ?string $startTimestamp = null;
    public ?string $successConditions = null;
    public ?string $type = null;
    public ?int $zoneCount = null;
}

/** Item entity data model. */
class Item
{
    public ?int $buyPrice = null;
    public ?int $carryLimit = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?int $rarity = null;
    public ?int $sellPrice = null;
    public ?int $value = null;
}

/** Request payload for Item#load. */
class ItemLoadMatch
{
    public int $id;
}

/** Request payload for Item#list. */
class ItemListMatch
{
    public ?int $buyPrice = null;
    public ?int $carryLimit = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?int $rarity = null;
    public ?int $sellPrice = null;
    public ?int $value = null;
}

/** Location entity data model. */
class Location
{
    public ?array $camps = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?int $zoneCount = null;
}

/** Request payload for Location#load. */
class LocationLoadMatch
{
    public int $id;
}

/** Request payload for Location#list. */
class LocationListMatch
{
    public ?array $camps = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?int $zoneCount = null;
}

/** Monster entity data model. */
class Monster
{
    public ?array $ailments = null;
    public ?string $description = null;
    public ?array $elements = null;
    public ?int $id = null;
    public ?array $locations = null;
    public ?string $name = null;
    public ?array $resistances = null;
    public ?array $rewards = null;
    public ?string $species = null;
    public ?string $type = null;
    public ?array $weaknesses = null;
}

/** Request payload for Monster#load. */
class MonsterLoadMatch
{
    public int $id;
}

/** Request payload for Monster#list. */
class MonsterListMatch
{
    public ?array $ailments = null;
    public ?string $description = null;
    public ?array $elements = null;
    public ?int $id = null;
    public ?array $locations = null;
    public ?string $name = null;
    public ?array $resistances = null;
    public ?array $rewards = null;
    public ?string $species = null;
    public ?string $type = null;
    public ?array $weaknesses = null;
}

/** MotionValue entity data model. */
class MotionValue
{
    public ?string $damageType = null;
    public ?int $exhaust = null;
    public ?array $hits = null;
    public ?int $id = null;
    public ?int $stun = null;
    public ?string $weaponType = null;
}

/** Request payload for MotionValue#load. */
class MotionValueLoadMatch
{
    public int $id;
}

/** Request payload for MotionValue#list. */
class MotionValueListMatch
{
    public ?string $damageType = null;
    public ?int $exhaust = null;
    public ?array $hits = null;
    public ?int $id = null;
    public ?int $stun = null;
    public ?string $weaponType = null;
}

/** Skill entity data model. */
class Skill
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $ranks = null;
}

/** Request payload for Skill#load. */
class SkillLoadMatch
{
    public int $id;
}

/** Request payload for Skill#list. */
class SkillListMatch
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $ranks = null;
}

/** Weapon entity data model. */
class Weapon
{
    public ?array $assets = null;
    public ?array $attack = null;
    public ?array $attributes = null;
    public ?array $crafting = null;
    public ?string $damageType = null;
    public ?array $elements = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?int $rarity = null;
    public ?array $slots = null;
    public ?string $type = null;
}

/** Request payload for Weapon#load. */
class WeaponLoadMatch
{
    public int $id;
}

/** Request payload for Weapon#list. */
class WeaponListMatch
{
    public ?array $assets = null;
    public ?array $attack = null;
    public ?array $attributes = null;
    public ?array $crafting = null;
    public ?string $damageType = null;
    public ?array $elements = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?int $rarity = null;
    public ?array $slots = null;
    public ?string $type = null;
}

