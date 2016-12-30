# mongo-escape

Escape variables to prevent NoSQL injection in MongoDB

Replace all occurences of "$" and "." with "＄" (U+FF04) and "．" (U+FF0E).

**Note**: this ought to be foolproof **only** if [server side JavaScript is disabled],
so make sure `security.javascriptEnabled` is set to `false` in your mongodb
configuration file. This has the effect that the [mapReduce] command and [$where]
operator can not be used since these functions allow the execution of arbitrary
JavaScript code.

## Examples

Escape a string so that it can be used as a key in a query:

    var assert = require('assert')
    var me = require('mongo-escape').escape
    var userInput

    userInput = me('$in')

    assert.equal(userInput, '＄in')

Now escape all keys in an object:

    userInput = me({
      'foo': 'bar',
      'ba.z': {
        '$in': 'quz'
      }
    })

    assert.deepEqual(userInput, {
      'foo': 'bar',
      'ba．z': { '＄in': 'quz' }
    })

Note: beware that keys in objects are replaced in-place, the object is not
cloned.

## Installation

    $ npm install mongo-escape

## API

###  escape(obj, [recurse])
* input {mixed} input to escape
* recurse {Boolean, default: true} whether or not to recurse
* @return {mixed} properly escaped input

Ensure any input is properly escaped. Where needed `$` and `.` are replaced
with `＄` and `．`, respectively.

If input is an object, all keys are escaped. If input is not an object but a
string it is escaped as well. Otherwise return the original value. If input
is a function or a symbol an error is raised.

Note: if input is an object, keys are replaced in place.

### unescape(obj, [recurse])
* input {mixed} input to unescape
* recurse {Boolean, default: true} whether or not to recurse
* @return {mixed} properly unescaped input

Ensure any input is properly unescaped. Where needed `＄` and `．` are
replaced with `$` and `.`, respectively.

If input is an object, all keys are unescaped. If input is not an object but
a string it is unescaped as well. Otherwise return the original value. If
input is a function or a symbol an error is raised.

Note: if input is an object, keys are replaced in place.

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

[server side JavaScript is disabled]: https://docs.mongodb.com/manual/core/server-side-javascript/#disable-server-side-js
[mapReduce]: https://docs.mongodb.com/manual/reference/command/mapReduce/#dbcmd.mapReduce
[$where]: https://docs.mongodb.com/manual/reference/operator/query/where/#op._S_where
