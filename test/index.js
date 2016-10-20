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
