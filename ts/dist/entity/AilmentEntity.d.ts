import { MonsterHunterWorldEntityBase } from '../MonsterHunterWorldEntityBase';
import type { MonsterHunterWorldSDK } from '../MonsterHunterWorldSDK';
import type { Control } from '../types';
import type { Ailment, AilmentLoadMatch, AilmentListMatch } from '../MonsterHunterWorldTypes';
declare class AilmentEntity extends MonsterHunterWorldEntityBase<Ailment> {
    constructor(client: MonsterHunterWorldSDK, entopts: any);
    make(this: AilmentEntity): AilmentEntity;
    load(this: any, reqmatch?: AilmentLoadMatch, ctrl?: Control): Promise<AilmentEntity>;
    list(this: any, reqmatch?: AilmentListMatch, ctrl?: Control): Promise<AilmentEntity[]>;
}
export { AilmentEntity };
