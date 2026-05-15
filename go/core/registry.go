package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewLiveDataEntityFunc func(client *NextbikeSDK, entopts map[string]any) NextbikeEntity

var NewPublicEntityFunc func(client *NextbikeSDK, entopts map[string]any) NextbikeEntity

var NewReservationEntityFunc func(client *NextbikeSDK, entopts map[string]any) NextbikeEntity

var NewReservationStatusEntityFunc func(client *NextbikeSDK, entopts map[string]any) NextbikeEntity

