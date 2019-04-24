/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-09 16:55:19
 * @modify date 2019-01-09 16:55:19
 * @desc [captcha base64]
 */

const svgCaptcha = require('svg-captcha')
const assert = require('assert').strict
const is = require('is')
const utils = require('./utils')

module.exports = (opt = {
  maxAge: 60000,
  config: {},
  urlPrefix: 'captcha',
  cipher: {}
}) => {
  return async function ({ router }) {
    opt.urlPrefix = opt.urlPrefix || '/captcha'
    assert.ok(is.object(opt.cipher), 'cipher can not be empty!')
    assert.ok(is.string(opt.cipher.key), 'cipher.key can not be empty!')
    assert.ok(is.string(opt.cipher.iv), 'cipher.iv can not be empty!')
    assert.ok(is.number(opt.maxAge), 'period can not be empty!')
    router.use(async function (ctx, next) {
      const encText = ctx.cookies.get('captcha')
      if (encText) {
        const text = utils.decrypt(encText, opt.cipher.key, opt.cipher.iv)
        ctx.state.captcha = text
      }
      await next()
    })
    router.get(opt.urlPrefix, async (ctx) => {
      try {
        const { data, text } = svgCaptcha.create(opt.config)
        const encText = utils.encrypt(text, opt.cipher.key, opt.cipher.iv)
        ctx.cookies.set('captcha', encText, { secure: false, httpOnly: false, maxAge: opt.maxAge })
        ctx.body = data
      } catch (error) {
        ctx.status = 500
        ctx.body = {
          message: error.message
        }
      }
    })
  }
}
