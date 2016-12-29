# mongo-key-escaper

Escape all occurences of "$" and "." in object keys. Replace them with "＄" (U+FF04)
and "．" (U+FF0E). Silently ignores other primitive types that pose no threat to
mongo injection.

## Example

Escape all keys in the given object:

    var escaper = require('mongo-key-escaper');

    var obj = {
      foo: 'bar',
      ba.z: { $in: 'quz' }
    };

    escaper.escape(obj);

    /* obj:
     * {
     *   foo: 'bar',
     *   ba．z: { ＄in: 'quz' }
     * };
     */

## Installation

    $ npm install mongo-key-escaper

## API

###  escape(obj, [recurse])
* obj {mixed} object to transform
* recurse {Boolean, default: true} whether or not to recurse
* @return obj, replaces keys in place

If obj is an object, then escape any key that has a `$` or `.` in it. Otherwise
just return obj.

### unescape(obj, [recurse])
* obj {mixed} object to transform
* recurse {Boolean, default: true} whether or not to recurse
* @return obj, replaces keys in place

If obj is an object, then unescape any key that has a `＄` or `．` in it.
Otherwise just return obj.

## Tests

    $ npm test

## License

ISC

Copyright (c) 2014, 2016 Tim Kuijsten

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
