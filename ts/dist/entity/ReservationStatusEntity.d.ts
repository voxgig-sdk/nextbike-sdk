import { NextbikeEntityBase } from '../NextbikeEntityBase';
import type { NextbikeSDK } from '../NextbikeSDK';
import type { Control } from '../types';
import type { ReservationStatus, ReservationStatusLoadMatch } from '../NextbikeTypes';
declare class ReservationStatusEntity extends NextbikeEntityBase<ReservationStatus> {
    constructor(client: NextbikeSDK, entopts: any);
    make(this: ReservationStatusEntity): ReservationStatusEntity;
    load(this: any, reqmatch?: ReservationStatusLoadMatch, ctrl?: Control): Promise<ReservationStatusEntity>;
}
export { ReservationStatusEntity };
