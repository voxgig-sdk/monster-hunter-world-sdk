import { MonsterHunterWorldEntityBase } from '../MonsterHunterWorldEntityBase';
import type { MonsterHunterWorldSDK } from '../MonsterHunterWorldSDK';
import type { Control } from '../types';
import type { Charm, CharmLoadMatch, CharmListMatch } from '../MonsterHunterWorldTypes';
declare class CharmEntity extends MonsterHunterWorldEntityBase<Charm> {
    constructor(client: MonsterHunterWorldSDK, entopts: any);
    make(this: CharmEntity): CharmEntity;
    load(this: any, reqmatch?: CharmLoadMatch, ctrl?: Control): Promise<CharmEntity>;
    list(this: any, reqmatch?: CharmListMatch, ctrl?: Control): Promise<CharmEntity[]>;
}
export { CharmEntity };
