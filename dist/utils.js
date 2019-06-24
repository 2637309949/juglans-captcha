"use strict";

// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
const crypto = require('crypto');

const repo = module.exports;

repo.encrypt = function (text, key, iv) {
  key = Buffer.from(key).toString('hex').slice(0, 32);
  iv = Buffer.from(iv).toString('hex').slice(0, 16);
  var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

repo.decrypt = function (text, key, iv) {
  key = Buffer.from(key).toString('hex').slice(0, 32);
  iv = Buffer.from(iv).toString('hex').slice(0, 16);
  var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  var dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};