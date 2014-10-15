# mongo-key-escaper

Escape all occurences of "$" and "." in object keys. Replace them with "＄" (U+FF04)
and "．" (U+FF0E) as recommended by http://docs.mongodb.org/manual/faq/developers/#dollar-sign-operator-escaping.

## Example

Escape all keys in the given object:

    var escaper = require('mongo-key-escaper');

    var obj = {
      foo: 'bar',
      ba.z: { $in: 'quz' }
    };

    escaper.escape(obj);

    // console.log(obj)
    // {
    //   foo: 'bar',
    //   ba．z: { ＄in: 'quz' }
    // };

## Installation

    $ npm install mongo-key-escaper

## API

###  escape(obj, [recurse])
* obj {Object} object to transform
* recurse {Boolean, default: true} whether or not to recurse
* @return {undefined} replaces keys in place

Escape any key in the given object that has a "$" or "." in it.

### unescape(obj, [recurse])
* obj {Object} object to transform
* recurse {Boolean, default: true} whether or not to recurse
* @return {undefined} replaces keys in place

Unescape any key in the given object that has a "＄" or "．" in it.

## Tests

    $ mocha test

## License

MIT, see LICENSE
