// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const svgCaptcha = require('svg-captcha')
const deepmerge = require('deepmerge')
const assert = require('assert').strict
const is = require('is')
const utils = require('./utils')

const defaultOpts = {
  urlPrefix: '/captcha',
  maxAge: 60000,
  config: {
    size: 4,
    ignoreChars: '0o1i',
    noise: 1,
    color: true,
    background: '#cc9966'
  },
  cipher: {
    key: '5cbd5f603fd886000e3bb75e',
    iv: '5c9dbc4c9699fa000e1e0a98'
  }
}

module.exports = (opt = {
  maxAge: 60000,
  config: {},
  urlPrefix: 'captcha',
  cipher: {}
}) => {
  opt = deepmerge.all([defaultOpts, opt])
  return async function ({ router }) {
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
          message: 'Internal Server Error',
          stack: error.stack || error.message
        }
      }
    })
  }
}
