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

/*jshint -W068, -W030 */

var should = require('should');

var escaper = require('../index');

describe('escaper', function () {
  describe('escape', function () {
    it('should work with empty object', function() {
      var obj = {};
      escaper.escape(obj);
      should.deepEqual(obj, {});
    });

    it('should return original object', function() {
      var obj = {};
      var ret = escaper.escape(obj);
      should.deepEqual(ret, {});
    });

    it('should not recurse', function() {
      var obj = { $: '$', 'foo.bar': { $: '$' } };
      escaper.escape(obj, false);
      should.deepEqual(obj, { '\uFF04': '$', 'foo\uFF0Ebar': { $: '$' } });
    });

    it('should be idempotent', function() {
      var obj = { $: '$', 'foo.bar': { $: '$' } };
      escaper.escape(obj, false);
      escaper.escape(obj, false);
      should.deepEqual(obj, { '\uFF04': '$', 'foo\uFF0Ebar': { $: '$' } });
    });

    it('should recurse by default', function() {
      var obj = { $: '$', foo: { $: '$', bar: { 'some.foo': 'other' } }, a: 'b' };
      escaper.escape(obj);
      should.deepEqual(obj, { '\uFF04': '$', foo: { '\uFF04': '$', bar: { 'some\uFF0Efoo': 'other' } } , a: 'b'});
    });
  });

  describe('unescape', function () {
    it('should work with empty object', function() {
      var obj = {};
      escaper.unescape(obj);
      should.deepEqual(obj, {});
    });

    it('should return original object', function() {
      var obj = {};
      var ret = escaper.unescape(obj);
      should.deepEqual(ret, {});
    });

    it('should not recurse', function() {
      var obj = { '\uFF04': '$', 'foo\uFF0Ebar': { $: '$' } };
      escaper.unescape(obj, false);
      should.deepEqual(obj, { $: '$', 'foo.bar': { $: '$' } });
    });

    it('should be idempotent', function() {
      var obj = { '\uFF04': '$', 'foo\uFF0Ebar': { $: '$' } };
      escaper.unescape(obj, false);
      escaper.unescape(obj, false);
      should.deepEqual(obj, { $: '$', 'foo.bar': { $: '$' } });
    });

    it('should recurse by default', function() {
      var obj = { '\uFF04': '$', foo: { '\uFF04': '$', bar: { 'some\uFF0Efoo': 'other' } } , a: 'b'};
      escaper.unescape(obj);
      should.deepEqual(obj, { $: '$', foo: { $: '$', bar: { 'some.foo': 'other' } }, a: 'b' });
    });
  });
});
