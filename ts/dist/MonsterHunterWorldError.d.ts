import { Context } from './Context';
declare class MonsterHunterWorldError extends Error {
    isMonsterHunterWorldError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { MonsterHunterWorldError };
