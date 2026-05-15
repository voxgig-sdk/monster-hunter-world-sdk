# MonsterHunterWorld SDK utility: make_context
require_relative '../core/context'
module MonsterHunterWorldUtilities
  MakeContext = ->(ctxmap, basectx) {
    MonsterHunterWorldContext.new(ctxmap, basectx)
  }
end
