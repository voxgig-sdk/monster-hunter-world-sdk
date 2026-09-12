import { MonsterHunterWorldEntityBase } from '../MonsterHunterWorldEntityBase';
import type { MonsterHunterWorldSDK } from '../MonsterHunterWorldSDK';
import type { Control } from '../types';
import type { Decoration, DecorationLoadMatch, DecorationListMatch } from '../MonsterHunterWorldTypes';
declare class DecorationEntity extends MonsterHunterWorldEntityBase<Decoration> {
    constructor(client: MonsterHunterWorldSDK, entopts: any);
    make(this: DecorationEntity): DecorationEntity;
    load(this: any, reqmatch?: DecorationLoadMatch, ctrl?: Control): Promise<DecorationEntity>;
    list(this: any, reqmatch?: DecorationListMatch, ctrl?: Control): Promise<DecorationEntity[]>;
}
export { DecorationEntity };
