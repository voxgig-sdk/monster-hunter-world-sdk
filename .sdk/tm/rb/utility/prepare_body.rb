# MonsterHunterWorld SDK utility: prepare_body
require_relative 'media'
module MonsterHunterWorldUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return MonsterHunterWorldUtilities.raw_body(ctx.reqdata) if MonsterHunterWorldUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
