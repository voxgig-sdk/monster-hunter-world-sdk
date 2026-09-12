import { MonsterHunterWorldEntityBase } from '../MonsterHunterWorldEntityBase';
import type { MonsterHunterWorldSDK } from '../MonsterHunterWorldSDK';
import type { Control } from '../types';
import type { Armor, ArmorLoadMatch, ArmorListMatch } from '../MonsterHunterWorldTypes';
declare class ArmorEntity extends MonsterHunterWorldEntityBase<Armor> {
    constructor(client: MonsterHunterWorldSDK, entopts: any);
    make(this: ArmorEntity): ArmorEntity;
    load(this: any, reqmatch?: ArmorLoadMatch, ctrl?: Control): Promise<ArmorEntity>;
    list(this: any, reqmatch?: ArmorListMatch, ctrl?: Control): Promise<ArmorEntity[]>;
}
export { ArmorEntity };
