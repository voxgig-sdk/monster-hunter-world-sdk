import { MonsterHunterWorldEntityBase } from '../MonsterHunterWorldEntityBase';
import type { MonsterHunterWorldSDK } from '../MonsterHunterWorldSDK';
import type { Control } from '../types';
import type { Monster, MonsterLoadMatch, MonsterListMatch } from '../MonsterHunterWorldTypes';
declare class MonsterEntity extends MonsterHunterWorldEntityBase<Monster> {
    constructor(client: MonsterHunterWorldSDK, entopts: any);
    make(this: MonsterEntity): MonsterEntity;
    load(this: any, reqmatch?: MonsterLoadMatch, ctrl?: Control): Promise<MonsterEntity>;
    list(this: any, reqmatch?: MonsterListMatch, ctrl?: Control): Promise<MonsterEntity[]>;
}
export { MonsterEntity };
