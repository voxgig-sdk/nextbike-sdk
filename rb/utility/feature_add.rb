# Nextbike SDK utility: feature_add
module NextbikeUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
