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

function escaper(input) {
  return input.replace(/\$/g, '\uFF04').replace(/\./g, '\uFF0E');
}

function unescaper(input) {
  return input.replace(/\uFF04/g, '$').replace(/\uFF0E/g, '.');
}

/**
 * Ensure any input is properly escaped. Where needed `$` and `.` are replaced
 * with `＄` and `．`, respectively.
 *
 * If input is an object, all keys are escaped. If input is not an object but a
 * string it is escaped as well. Otherwise return the original value. If input
 * is a function or a symbol an error is raised.
 *
 * Note: if input is an object, keys are replaced in place.
 *
 * @param {mixed} input  input to escape
 * @param {Boolean, default: true} recurse  whether or not to recurse
 * @return {mixed}  properly escaped input
 */
function escape(input, recurse) {
  if (input == null)
    return input;

  switch (typeof input) {
  case 'string':
    return escaper(input);
  case 'number':
  case 'boolean':
    return input;
  }

  if (typeof recurse !== 'boolean')
    recurse = true;

  transform(input, escaper, recurse);
  return input;
}

/**
 * Ensure any input is properly unescaped. Where needed `＄` and `．` are
 * replaced with `$` and `.`, respectively.
 *
 * If input is an object, all keys are unescaped. If input is not an object but
 * a string it is unescaped as well. Otherwise return the original value. If
 * input is a function or a symbol an error is raised.
 *
 * Note: if input is an object, keys are replaced in place.
 *
 * @param {mixed} input  input to unescape
 * @param {Boolean, default: true} recurse  whether or not to recurse
 * @return {mixed}  properly unescaped input
 */
function unescape(input, recurse) {
  if (input == null)
    return input;

  switch (typeof input) {
  case 'string':
    return unescaper(input);
  case 'number':
  case 'boolean':
    return input;
  }

  if (typeof recurse !== 'boolean')
    recurse = true;

  transform(input, unescaper, recurse);
  return input;
}

/**
 * Iterate over all object keys (and optionally recurse) and run a transformation
 * on each key. Modify the object in-place.
 *
 * @param {Object} obj  object to transform
 * @param {Function} iterator  first parameter will be the key to transform, second
 *                             parameter is the value of that key (though this is
 *                             informational only). This function should return the
 *                             new key to be used.
 * @param {Boolean, default: false} recurse  whether or not to recurse
 * @return {undefined}  replaces keys in-place
 */
function transform(obj, iterator, recurse) {
  if (obj == null || typeof obj !== 'object') { throw new TypeError('obj must be an object'); }
  if (typeof iterator !== 'function') { throw new TypeError('iterator must be a function'); }

  recurse = recurse || false;
  if (typeof recurse !== 'boolean') { throw new TypeError('recurse must be a boolean'); }

  Object.keys(obj).forEach(function(key) {
    /* recurse if requested and possible */
    if (recurse && typeof obj[key] === 'object' && obj[key] != null && Object.keys(obj[key]).length)
      transform(obj[key], iterator, recurse);

    var transformed = iterator(key, obj[key]);
    if (transformed !== key) {
      obj[transformed] = obj[key];
      delete obj[key];
    }
  });
}

module.exports.escape = escape;
module.exports.unescape = unescape;
