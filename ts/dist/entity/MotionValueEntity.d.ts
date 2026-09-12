import { MonsterHunterWorldEntityBase } from '../MonsterHunterWorldEntityBase';
import type { MonsterHunterWorldSDK } from '../MonsterHunterWorldSDK';
import type { Control } from '../types';
import type { MotionValue, MotionValueLoadMatch, MotionValueListMatch } from '../MonsterHunterWorldTypes';
declare class MotionValueEntity extends MonsterHunterWorldEntityBase<MotionValue> {
    constructor(client: MonsterHunterWorldSDK, entopts: any);
    make(this: MotionValueEntity): MotionValueEntity;
    load(this: any, reqmatch?: MotionValueLoadMatch, ctrl?: Control): Promise<MotionValueEntity>;
    list(this: any, reqmatch?: MotionValueListMatch, ctrl?: Control): Promise<MotionValueEntity[]>;
}
export { MotionValueEntity };
