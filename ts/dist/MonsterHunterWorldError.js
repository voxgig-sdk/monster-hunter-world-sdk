"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterHunterWorldError = void 0;
class MonsterHunterWorldError extends Error {
    isMonsterHunterWorldError = true;
    sdk = 'MonsterHunterWorld';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.MonsterHunterWorldError = MonsterHunterWorldError;
//# sourceMappingURL=MonsterHunterWorldError.js.map