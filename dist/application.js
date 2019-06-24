"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
const svgCaptcha = require('svg-captcha');

const deepmerge = require('deepmerge');

const assert = require('assert').strict;

const is = require('is');

const utils = require('./utils');

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
};

module.exports = function () {
  let opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    maxAge: 60000,
    config: {},
    urlPrefix: 'captcha',
    cipher: {}
  };
  opt = deepmerge.all([defaultOpts, opt]);
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(function* (_ref) {
        let {
          router
        } = _ref;
        assert.ok(is.object(opt.cipher), 'cipher can not be empty!');
        assert.ok(is.string(opt.cipher.key), 'cipher.key can not be empty!');
        assert.ok(is.string(opt.cipher.iv), 'cipher.iv can not be empty!');
        assert.ok(is.number(opt.maxAge), 'period can not be empty!');
        router.use(
        /*#__PURE__*/
        function () {
          var _ref3 = _asyncToGenerator(function* (ctx, next) {
            const encText = ctx.cookies.get('captcha');

            if (encText) {
              const text = utils.decrypt(encText, opt.cipher.key, opt.cipher.iv);
              ctx.state.captcha = text;
            }

            yield next();
          });

          return function (_x2, _x3) {
            return _ref3.apply(this, arguments);
          };
        }());
        router.get(opt.urlPrefix,
        /*#__PURE__*/
        function () {
          var _ref4 = _asyncToGenerator(function* (ctx) {
            try {
              const {
                data,
                text
              } = svgCaptcha.create(opt.config);
              const encText = utils.encrypt(text, opt.cipher.key, opt.cipher.iv);
              ctx.cookies.set('captcha', encText, {
                secure: false,
                httpOnly: false,
                maxAge: opt.maxAge
              });
              ctx.body = data;
            } catch (error) {
              ctx.status = 500;
              ctx.body = {
                message: error.message
              };
            }
          });

          return function (_x4) {
            return _ref4.apply(this, arguments);
          };
        }());
      });

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
};