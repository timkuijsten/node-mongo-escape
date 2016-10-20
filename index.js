/**
 * Copyright (c) 2014, 2016 Tim Kuijsten
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

'use strict';

var transform = require('object-key-transform');

function escaper(input) {
  return input.replace(/\$/g, '\uFF04').replace(/\./g, '\uFF0E');
}

function unescaper(input) {
  return input.replace(/\uFF04/g, '$').replace(/\uFF0E/g, '.');
}

/**
 * Escape any key in the given object that has a $ or . in it.
 *
 * @param {Object} obj  object to transform
 * @param {Boolean, default: true} recurse  whether or not to recurse
 * @return {undefined}  replaces keys in place
 */
function escape(obj, recurse) {
  if (typeof recurse !== 'boolean') {
    recurse = true;
  }
  transform(obj, escaper, recurse);
  return obj;
}

/**
 * Unescape any key in the given object that has a $ or . in it.
 *
 * @param {Object} obj  object to transform
 * @param {Boolean, default: true} recurse  whether or not to recurse
 * @return {undefined}  replaces keys in place
 */
function unescape(obj, recurse) {
  if (typeof recurse !== 'boolean') {
    recurse = true;
  }
  transform(obj, unescaper, recurse);
  return obj;
}

module.exports.escape = escape;
module.exports.unescape = unescape;
