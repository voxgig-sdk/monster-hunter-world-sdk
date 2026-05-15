package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAilmentEntityFunc func(client *MonsterHunterWorldSDK, entopts map[string]any) MonsterHunterWorldEntity

var NewArmorEntityFunc func(client *MonsterHunterWorldSDK, entopts map[string]any) MonsterHunterWorldEntity

var NewArmorSetEntityFunc func(client *MonsterHunterWorldSDK, entopts map[string]any) MonsterHunterWorldEntity

var NewCharmEntityFunc func(client *MonsterHunterWorldSDK, entopts map[string]any) MonsterHunterWorldEntity

var NewDecorationEntityFunc func(client *MonsterHunterWorldSDK, entopts map[string]any) MonsterHunterWorldEntity

var NewEventEntityFunc func(client *MonsterHunterWorldSDK, entopts map[string]any) MonsterHunterWorldEntity

var NewItemEntityFunc func(client *MonsterHunterWorldSDK, entopts map[string]any) MonsterHunterWorldEntity

var NewLocationEntityFunc func(client *MonsterHunterWorldSDK, entopts map[string]any) MonsterHunterWorldEntity

var NewMonsterEntityFunc func(client *MonsterHunterWorldSDK, entopts map[string]any) MonsterHunterWorldEntity

var NewMotionValueEntityFunc func(client *MonsterHunterWorldSDK, entopts map[string]any) MonsterHunterWorldEntity

var NewSkillEntityFunc func(client *MonsterHunterWorldSDK, entopts map[string]any) MonsterHunterWorldEntity

var NewWeaponEntityFunc func(client *MonsterHunterWorldSDK, entopts map[string]any) MonsterHunterWorldEntity

