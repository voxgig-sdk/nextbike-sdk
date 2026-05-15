
import { Context } from './Context'


class NextbikeError extends Error {

  isNextbikeError = true

  sdk = 'Nextbike'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  NextbikeError
}

