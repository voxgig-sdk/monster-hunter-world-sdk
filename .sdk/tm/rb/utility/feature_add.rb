# MonsterHunterWorld SDK utility: feature_add
module MonsterHunterWorldUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
