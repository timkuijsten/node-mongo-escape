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

var assert = require('assert');

var escaper = require('./index');

var obj;

obj = {};
escaper.escape(obj);
assert.deepEqual(obj, {}, 'escape empty object');

obj = { $: '$', 'foo.bar': { $: '$' } };
escaper.escape(obj, false);
assert.deepEqual(obj, { '\uFF04': '$', 'foo\uFF0Ebar': { $: '$' } }, 'should not recurse');

obj = { $: '$', 'foo.bar': { $: '$' } };
escaper.escape(obj, false);
escaper.escape(obj, false);
assert.deepEqual(obj, { '\uFF04': '$', 'foo\uFF0Ebar': { $: '$' } }, 'should be idempotent');

obj = { $: '$', foo: { $: '$', bar: { 'some.foo': 'other' } }, a: 'b' };
escaper.escape(obj);
assert.deepEqual(obj, { '\uFF04': '$', foo: { '\uFF04': '$', bar: { 'some\uFF0Efoo': 'other' } } , a: 'b'}, 'should recurse by default');

obj = {};
escaper.unescape(obj);
assert.deepEqual(obj, {}, 'unescape empty object');

obj = { "a": "b"};
escaper.escape(obj, true);
assert.deepEqual(obj, { 'a': 'b' }, 'should return original object');

obj = { '\uFF04': '$', 'foo\uFF0Ebar': { $: '$' } };
escaper.unescape(obj, false);
assert.deepEqual(obj, { $: '$', 'foo.bar': { $: '$' } }, 'should not recurse');

obj = { '\uFF04': '$', 'foo\uFF0Ebar': { $: '$' } };
escaper.unescape(obj, false);
escaper.unescape(obj, false);
assert.deepEqual(obj, { $: '$', 'foo.bar': { $: '$' } }, 'should be idempotent');

obj = { '\uFF04': '$', foo: { '\uFF04': '$', bar: { 'some\uFF0Efoo': 'other' } } , a: 'b'};
escaper.unescape(obj);
assert.deepEqual(obj, { $: '$', foo: { $: '$', bar: { 'some.foo': 'other' } }, a: 'b' }, 'should recurse by default');

console.log('ok');