import { NextbikeEntityBase } from '../NextbikeEntityBase';
import type { NextbikeSDK } from '../NextbikeSDK';
import type { Control } from '../types';
import type { Reservation, ReservationCreateData } from '../NextbikeTypes';
declare class ReservationEntity extends NextbikeEntityBase<Reservation> {
    constructor(client: NextbikeSDK, entopts: any);
    make(this: ReservationEntity): ReservationEntity;
    create(this: any, reqdata?: ReservationCreateData, ctrl?: Control): Promise<ReservationEntity>;
}
export { ReservationEntity };
