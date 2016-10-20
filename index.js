/**
 * Copyright (c) 2014 Tim Kuijsten
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
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
