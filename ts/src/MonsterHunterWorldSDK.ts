// MonsterHunterWorld Ts SDK

import { AilmentEntity } from './entity/AilmentEntity'
import { ArmorEntity } from './entity/ArmorEntity'
import { ArmorSetEntity } from './entity/ArmorSetEntity'
import { CharmEntity } from './entity/CharmEntity'
import { DecorationEntity } from './entity/DecorationEntity'
import { EventEntity } from './entity/EventEntity'
import { ItemEntity } from './entity/ItemEntity'
import { LocationEntity } from './entity/LocationEntity'
import { MonsterEntity } from './entity/MonsterEntity'
import { MotionValueEntity } from './entity/MotionValueEntity'
import { SkillEntity } from './entity/SkillEntity'
import { WeaponEntity } from './entity/WeaponEntity'

export type * from './MonsterHunterWorldTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { MonsterHunterWorldEntityBase } from './MonsterHunterWorldEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class MonsterHunterWorldSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _ailment?: AilmentEntity

  // Idiomatic facade: `client.ailment.list()` / `client.ailment.load({ id })`.
  get ailment(): AilmentEntity {
    return (this._ailment ??= new AilmentEntity(this, undefined))
  }

  /** @deprecated Use `client.ailment` instead. */
  Ailment(data?: any) {
    const self = this
    return new AilmentEntity(self,data)
  }


  _armor?: ArmorEntity

  // Idiomatic facade: `client.armor.list()` / `client.armor.load({ id })`.
  get armor(): ArmorEntity {
    return (this._armor ??= new ArmorEntity(this, undefined))
  }

  /** @deprecated Use `client.armor` instead. */
  Armor(data?: any) {
    const self = this
    return new ArmorEntity(self,data)
  }


  _armor_set?: ArmorSetEntity

  // Idiomatic facade: `client.armor_set.list()` / `client.armor_set.load({ id })`.
  get armor_set(): ArmorSetEntity {
    return (this._armor_set ??= new ArmorSetEntity(this, undefined))
  }

  /** @deprecated Use `client.armor_set` instead. */
  ArmorSet(data?: any) {
    const self = this
    return new ArmorSetEntity(self,data)
  }


  _charm?: CharmEntity

  // Idiomatic facade: `client.charm.list()` / `client.charm.load({ id })`.
  get charm(): CharmEntity {
    return (this._charm ??= new CharmEntity(this, undefined))
  }

  /** @deprecated Use `client.charm` instead. */
  Charm(data?: any) {
    const self = this
    return new CharmEntity(self,data)
  }


  _decoration?: DecorationEntity

  // Idiomatic facade: `client.decoration.list()` / `client.decoration.load({ id })`.
  get decoration(): DecorationEntity {
    return (this._decoration ??= new DecorationEntity(this, undefined))
  }

  /** @deprecated Use `client.decoration` instead. */
  Decoration(data?: any) {
    const self = this
    return new DecorationEntity(self,data)
  }


  _event?: EventEntity

  // Idiomatic facade: `client.event.list()` / `client.event.load({ id })`.
  get event(): EventEntity {
    return (this._event ??= new EventEntity(this, undefined))
  }

  /** @deprecated Use `client.event` instead. */
  Event(data?: any) {
    const self = this
    return new EventEntity(self,data)
  }


  _item?: ItemEntity

  // Idiomatic facade: `client.item.list()` / `client.item.load({ id })`.
  get item(): ItemEntity {
    return (this._item ??= new ItemEntity(this, undefined))
  }

  /** @deprecated Use `client.item` instead. */
  Item(data?: any) {
    const self = this
    return new ItemEntity(self,data)
  }


  _location?: LocationEntity

  // Idiomatic facade: `client.location.list()` / `client.location.load({ id })`.
  get location(): LocationEntity {
    return (this._location ??= new LocationEntity(this, undefined))
  }

  /** @deprecated Use `client.location` instead. */
  Location(data?: any) {
    const self = this
    return new LocationEntity(self,data)
  }


  _monster?: MonsterEntity

  // Idiomatic facade: `client.monster.list()` / `client.monster.load({ id })`.
  get monster(): MonsterEntity {
    return (this._monster ??= new MonsterEntity(this, undefined))
  }

  /** @deprecated Use `client.monster` instead. */
  Monster(data?: any) {
    const self = this
    return new MonsterEntity(self,data)
  }


  _motion_value?: MotionValueEntity

  // Idiomatic facade: `client.motion_value.list()` / `client.motion_value.load({ id })`.
  get motion_value(): MotionValueEntity {
    return (this._motion_value ??= new MotionValueEntity(this, undefined))
  }

  /** @deprecated Use `client.motion_value` instead. */
  MotionValue(data?: any) {
    const self = this
    return new MotionValueEntity(self,data)
  }


  _skill?: SkillEntity

  // Idiomatic facade: `client.skill.list()` / `client.skill.load({ id })`.
  get skill(): SkillEntity {
    return (this._skill ??= new SkillEntity(this, undefined))
  }

  /** @deprecated Use `client.skill` instead. */
  Skill(data?: any) {
    const self = this
    return new SkillEntity(self,data)
  }


  _weapon?: WeaponEntity

  // Idiomatic facade: `client.weapon.list()` / `client.weapon.load({ id })`.
  get weapon(): WeaponEntity {
    return (this._weapon ??= new WeaponEntity(this, undefined))
  }

  /** @deprecated Use `client.weapon` instead. */
  Weapon(data?: any) {
    const self = this
    return new WeaponEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new MonsterHunterWorldSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return MonsterHunterWorldSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'MonsterHunterWorld' }
  }

  toString() {
    return 'MonsterHunterWorld ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = MonsterHunterWorldSDK


export {
  stdutil,

  BaseFeature,
  MonsterHunterWorldEntityBase,

  MonsterHunterWorldSDK,
  SDK,
}


