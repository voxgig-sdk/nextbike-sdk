import { NextbikeEntityBase } from '../NextbikeEntityBase';
import type { NextbikeSDK } from '../NextbikeSDK';
import type { Control } from '../types';
import type { Public, PublicLoadMatch } from '../NextbikeTypes';
declare class PublicEntity extends NextbikeEntityBase<Public> {
    constructor(client: NextbikeSDK, entopts: any);
    make(this: PublicEntity): PublicEntity;
    load(this: any, reqmatch?: PublicLoadMatch, ctrl?: Control): Promise<PublicEntity>;
}
export { PublicEntity };
