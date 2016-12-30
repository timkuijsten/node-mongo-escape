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

/* escape */

/* don't fall over undefined */
escaper.escape(obj);
assert.strictEqual(obj, undefined, 'don\'t fall over undefined');

/* don't fall over null */
obj = null;
escaper.escape(obj);
assert.strictEqual(obj, null, 'don\'t fall over null');

/* don't fall over boolean */
obj = false;
escaper.escape(obj);
assert.strictEqual(obj, false, 'don\'t fall over boolean');

/* don't fall over numbers */
obj = 0;
escaper.escape(obj);
assert.strictEqual(obj, 0, 'don\'t fall over numbers');

/* don't fall over strings */
obj = '';
escaper.escape(obj);
assert.strictEqual(obj, '', 'don\'t fall over empty string');

obj = '$set';
assert.strictEqual(escaper.escape(obj), '\uFF04set', 'escape string');

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
assert.deepEqual(obj, { '\uFF04': '$', foo: { '\uFF04': '$', bar: { 'some\uFF0Efoo': 'other' } }, a: 'b' }, 'should recurse by default');

obj = [ { $: '$', 'foo.bar': { $: '$' } }, { $: [ '$', { 'foo.qux': { $: '$' } } ], 'foo.baz': { $: '$' } } ];
escaper.escape(obj);
assert.deepEqual(obj, [ { '\uFF04': '$', 'foo\uFF0Ebar': { '\uFF04': '$' } }, { '\uFF04': [ '$', { 'foo\uFF0Equx': { '\uFF04': '$' } } ], 'foo\uFF0Ebaz': { '\uFF04': '$' } } ], 'should recurse on array values');

/* unescape */

/* don't fall over undefined */
obj = undefined
escaper.unescape(obj);
assert.strictEqual(obj, undefined, 'don\'t fall over undefined');

/* don't fall over null */
obj = null;
escaper.unescape(obj);
assert.strictEqual(obj, null, 'don\'t fall over null');

/* don't fall over boolean */
obj = false;
escaper.unescape(obj);
assert.strictEqual(obj, false, 'don\'t fall over boolean');

/* don't fall over strings */
obj = '';
escaper.unescape(obj);
assert.strictEqual(obj, '', 'don\'t fall over empty string');

obj = '\uFF04set';
assert.strictEqual(escaper.unescape(obj), '$set', 'unescape string');

obj = {};
escaper.unescape(obj);
assert.deepEqual(obj, {}, 'unescape empty object');

obj = { 'a': 'b' };
escaper.unescape(obj, true);
assert.deepEqual(obj, { 'a': 'b' }, 'should return original object');

obj = { '\uFF04': '$', 'foo\uFF0Ebar': { $: '$' } };
escaper.unescape(obj, false);
assert.deepEqual(obj, { $: '$', 'foo.bar': { $: '$' } }, 'should not recurse');

obj = { '\uFF04': '$', 'foo\uFF0Ebar': { $: '$' } };
escaper.unescape(obj, false);
escaper.unescape(obj, false);
assert.deepEqual(obj, { $: '$', 'foo.bar': { $: '$' } }, 'should be idempotent');

obj = { '\uFF04': '$', foo: { '\uFF04': '$', bar: { 'some\uFF0Efoo': 'other' } }, a: 'b' };
escaper.unescape(obj);
assert.deepEqual(obj, { $: '$', foo: { $: '$', bar: { 'some.foo': 'other' } }, a: 'b' }, 'should recurse by default');

obj = [ { '\uFF04': '$', 'foo\uFF0Ebar': { '\uFF04': '$' } }, { '\uFF04': [ '$', { 'foo\uFF0Equx': { '\uFF04': '$' } } ], 'foo\uFF0Ebaz': { '\uFF04': '$' } } ];
escaper.unescape(obj);
assert.deepEqual(obj, [ { $: '$', 'foo.bar': { $: '$' } }, { $: [ '$', { 'foo.qux': { $: '$' } } ], 'foo.baz': { $: '$' } } ], 'should recurse on array values');

console.log('ok');
