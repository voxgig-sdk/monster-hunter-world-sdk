
import { Context } from './Context'


class MonsterHunterWorldError extends Error {

  isMonsterHunterWorldError = true

  sdk = 'MonsterHunterWorld'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  MonsterHunterWorldError
}

