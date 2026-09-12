import { MonsterHunterWorldEntityBase } from '../MonsterHunterWorldEntityBase';
import type { MonsterHunterWorldSDK } from '../MonsterHunterWorldSDK';
import type { Control } from '../types';
import type { Weapon, WeaponLoadMatch, WeaponListMatch } from '../MonsterHunterWorldTypes';
declare class WeaponEntity extends MonsterHunterWorldEntityBase<Weapon> {
    constructor(client: MonsterHunterWorldSDK, entopts: any);
    make(this: WeaponEntity): WeaponEntity;
    load(this: any, reqmatch?: WeaponLoadMatch, ctrl?: Control): Promise<WeaponEntity>;
    list(this: any, reqmatch?: WeaponListMatch, ctrl?: Control): Promise<WeaponEntity[]>;
}
export { WeaponEntity };
