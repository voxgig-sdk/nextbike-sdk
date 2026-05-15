-- Nextbike SDK error

local NextbikeError = {}
NextbikeError.__index = NextbikeError


function NextbikeError.new(code, msg, ctx)
  local self = setmetatable({}, NextbikeError)
  self.is_sdk_error = true
  self.sdk = "Nextbike"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function NextbikeError:error()
  return self.msg
end


function NextbikeError:__tostring()
  return self.msg
end


return NextbikeError
