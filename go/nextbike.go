package voxgignextbikesdk

import (
	"github.com/voxgig-sdk/nextbike-sdk/go/core"
	"github.com/voxgig-sdk/nextbike-sdk/go/entity"
	"github.com/voxgig-sdk/nextbike-sdk/go/feature"
	_ "github.com/voxgig-sdk/nextbike-sdk/go/utility"
)

// Type aliases preserve external API.
type NextbikeSDK = core.NextbikeSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type NextbikeEntity = core.NextbikeEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type NextbikeError = core.NextbikeError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewLiveDataEntityFunc = func(client *core.NextbikeSDK, entopts map[string]any) core.NextbikeEntity {
		return entity.NewLiveDataEntity(client, entopts)
	}
	core.NewPublicEntityFunc = func(client *core.NextbikeSDK, entopts map[string]any) core.NextbikeEntity {
		return entity.NewPublicEntity(client, entopts)
	}
	core.NewReservationEntityFunc = func(client *core.NextbikeSDK, entopts map[string]any) core.NextbikeEntity {
		return entity.NewReservationEntity(client, entopts)
	}
	core.NewReservationStatusEntityFunc = func(client *core.NextbikeSDK, entopts map[string]any) core.NextbikeEntity {
		return entity.NewReservationStatusEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewNextbikeSDK = core.NewNextbikeSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
