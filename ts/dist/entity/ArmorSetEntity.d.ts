import { MonsterHunterWorldEntityBase } from '../MonsterHunterWorldEntityBase';
import type { MonsterHunterWorldSDK } from '../MonsterHunterWorldSDK';
import type { Control } from '../types';
import type { ArmorSet, ArmorSetLoadMatch, ArmorSetListMatch } from '../MonsterHunterWorldTypes';
declare class ArmorSetEntity extends MonsterHunterWorldEntityBase<ArmorSet> {
    constructor(client: MonsterHunterWorldSDK, entopts: any);
    make(this: ArmorSetEntity): ArmorSetEntity;
    load(this: any, reqmatch?: ArmorSetLoadMatch, ctrl?: Control): Promise<ArmorSetEntity>;
    list(this: any, reqmatch?: ArmorSetListMatch, ctrl?: Control): Promise<ArmorSetEntity[]>;
}
export { ArmorSetEntity };
