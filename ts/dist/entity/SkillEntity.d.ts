import { MonsterHunterWorldEntityBase } from '../MonsterHunterWorldEntityBase';
import type { MonsterHunterWorldSDK } from '../MonsterHunterWorldSDK';
import type { Control } from '../types';
import type { Skill, SkillLoadMatch, SkillListMatch } from '../MonsterHunterWorldTypes';
declare class SkillEntity extends MonsterHunterWorldEntityBase<Skill> {
    constructor(client: MonsterHunterWorldSDK, entopts: any);
    make(this: SkillEntity): SkillEntity;
    load(this: any, reqmatch?: SkillLoadMatch, ctrl?: Control): Promise<SkillEntity>;
    list(this: any, reqmatch?: SkillListMatch, ctrl?: Control): Promise<SkillEntity[]>;
}
export { SkillEntity };
