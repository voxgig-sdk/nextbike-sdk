# Nextbike SDK utility: make_context
require_relative '../core/context'
module NextbikeUtilities
  MakeContext = ->(ctxmap, basectx) {
    NextbikeContext.new(ctxmap, basectx)
  }
end
