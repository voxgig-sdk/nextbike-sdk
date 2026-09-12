import { LiveDataEntity } from './entity/LiveDataEntity';
import { PublicEntity } from './entity/PublicEntity';
import { ReservationEntity } from './entity/ReservationEntity';
import { ReservationStatusEntity } from './entity/ReservationStatusEntity';
export type * from './NextbikeTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { NextbikeEntityBase } from './NextbikeEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class NextbikeSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    LiveData(entopts?: Record<string, any>): LiveDataEntity;
    Public(entopts?: Record<string, any>): PublicEntity;
    Reservation(entopts?: Record<string, any>): ReservationEntity;
    ReservationStatus(entopts?: Record<string, any>): ReservationStatusEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): NextbikeSDK;
    tester(testopts?: any, sdkopts?: any): NextbikeSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof NextbikeSDK;
export { stdutil, config, BaseFeature, NextbikeEntityBase, NextbikeSDK, SDK, };
