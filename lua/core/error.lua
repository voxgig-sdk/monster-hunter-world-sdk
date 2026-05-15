-- MonsterHunterWorld SDK error

local MonsterHunterWorldError = {}
MonsterHunterWorldError.__index = MonsterHunterWorldError


function MonsterHunterWorldError.new(code, msg, ctx)
  local self = setmetatable({}, MonsterHunterWorldError)
  self.is_sdk_error = true
  self.sdk = "MonsterHunterWorld"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MonsterHunterWorldError:error()
  return self.msg
end


function MonsterHunterWorldError:__tostring()
  return self.msg
end


return MonsterHunterWorldError
