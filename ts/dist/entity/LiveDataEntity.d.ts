import { NextbikeEntityBase } from '../NextbikeEntityBase';
import type { NextbikeSDK } from '../NextbikeSDK';
import type { Control } from '../types';
import type { LiveData, LiveDataListMatch } from '../NextbikeTypes';
declare class LiveDataEntity extends NextbikeEntityBase<LiveData> {
    constructor(client: NextbikeSDK, entopts: any);
    make(this: LiveDataEntity): LiveDataEntity;
    list(this: any, reqmatch?: LiveDataListMatch, ctrl?: Control): Promise<LiveDataEntity[]>;
}
export { LiveDataEntity };
