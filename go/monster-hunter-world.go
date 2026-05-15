package voxgigmonsterhunterworldsdk

import (
	"github.com/voxgig-sdk/monster-hunter-world-sdk/core"
	"github.com/voxgig-sdk/monster-hunter-world-sdk/entity"
	"github.com/voxgig-sdk/monster-hunter-world-sdk/feature"
	_ "github.com/voxgig-sdk/monster-hunter-world-sdk/utility"
)

// Type aliases preserve external API.
type MonsterHunterWorldSDK = core.MonsterHunterWorldSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type MonsterHunterWorldEntity = core.MonsterHunterWorldEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type MonsterHunterWorldError = core.MonsterHunterWorldError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAilmentEntityFunc = func(client *core.MonsterHunterWorldSDK, entopts map[string]any) core.MonsterHunterWorldEntity {
		return entity.NewAilmentEntity(client, entopts)
	}
	core.NewArmorEntityFunc = func(client *core.MonsterHunterWorldSDK, entopts map[string]any) core.MonsterHunterWorldEntity {
		return entity.NewArmorEntity(client, entopts)
	}
	core.NewArmorSetEntityFunc = func(client *core.MonsterHunterWorldSDK, entopts map[string]any) core.MonsterHunterWorldEntity {
		return entity.NewArmorSetEntity(client, entopts)
	}
	core.NewCharmEntityFunc = func(client *core.MonsterHunterWorldSDK, entopts map[string]any) core.MonsterHunterWorldEntity {
		return entity.NewCharmEntity(client, entopts)
	}
	core.NewDecorationEntityFunc = func(client *core.MonsterHunterWorldSDK, entopts map[string]any) core.MonsterHunterWorldEntity {
		return entity.NewDecorationEntity(client, entopts)
	}
	core.NewEventEntityFunc = func(client *core.MonsterHunterWorldSDK, entopts map[string]any) core.MonsterHunterWorldEntity {
		return entity.NewEventEntity(client, entopts)
	}
	core.NewItemEntityFunc = func(client *core.MonsterHunterWorldSDK, entopts map[string]any) core.MonsterHunterWorldEntity {
		return entity.NewItemEntity(client, entopts)
	}
	core.NewLocationEntityFunc = func(client *core.MonsterHunterWorldSDK, entopts map[string]any) core.MonsterHunterWorldEntity {
		return entity.NewLocationEntity(client, entopts)
	}
	core.NewMonsterEntityFunc = func(client *core.MonsterHunterWorldSDK, entopts map[string]any) core.MonsterHunterWorldEntity {
		return entity.NewMonsterEntity(client, entopts)
	}
	core.NewMotionValueEntityFunc = func(client *core.MonsterHunterWorldSDK, entopts map[string]any) core.MonsterHunterWorldEntity {
		return entity.NewMotionValueEntity(client, entopts)
	}
	core.NewSkillEntityFunc = func(client *core.MonsterHunterWorldSDK, entopts map[string]any) core.MonsterHunterWorldEntity {
		return entity.NewSkillEntity(client, entopts)
	}
	core.NewWeaponEntityFunc = func(client *core.MonsterHunterWorldSDK, entopts map[string]any) core.MonsterHunterWorldEntity {
		return entity.NewWeaponEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMonsterHunterWorldSDK = core.NewMonsterHunterWorldSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
