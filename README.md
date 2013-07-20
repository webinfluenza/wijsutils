# WebInfluenza JavaScript Utils

JavaScript and jQuery Utils, that will be needed from time to time on multiple projects

## Getting Started
It's quite simple. Just include the file ```dist/wijsutils.js``` and have phun.

## Documentation
### wiUtils.wiFuzzyCompare
Compare (simple) objects.

#### Signature
```javascript
wiUtils.wiFuzzyCompare( refObj, obj, keyArray );
```

* ```refObj``` (__required__, Object) Reference object for the keys and values
* ```obj``` (__required__, Object) The object that will be tested against the ```refObj```
* ```keyArray``` (__optional__, Array) String Array with keys that will be used for comparison

If you pass the ```keyArray```, the function will only compare these keys for comparison.

#### Examples
```javascript
var a = {foo: 'foo', bar: 1, baz: 1.2},
    b = {foo: 'foo', bar: 1, baz: 1.2},
    c = {foo: 'foo', bar: 1};

wiUtils.wiFuzzyCompare( a, b ); // will return true
wiUtils.wiFuzzyCompare( a, c ); // will return false (baz is not in object c)
wiUtils.wiFuzzyCompare( a, c, ['foo', 'bar'] ); // will return true
```

### wiUtils.wiElementsByClass
Get DOM elements by class name with a real fast selection algorithm (based on a work of [Dustin Diaz](http://www.dustindiaz.com/getelementsbyclass/))
#### Signature
```javascript
wiUtils.wiElementsByClass( cssClass, nodeElement, tagName );
```

* ```cssClass``` (__required__, String) find elements with this class
* ```nodeElement``` (__optional__, HTMLElement, default: ```document```) the context element
* ```tagName``` (__optional__, String, default: ```*```) identifies the tag name (like ```div```) of the element

If you want to pass the ```tagName```, but not the ```nodeElement```, just set ```null``` for the second parameter.

#### Examples

```javascript
// the simplest form: look for an element with the class bar
var mySelection1 = wiUtils.wiElementsByClass( 'bar' );

// look for div.bar
var mySelection2 = wiUtils.wiElementsByClass( 'bar', null, 'div' );

// look for div.bar inside of a specified node #foo
var mySelection3 = wiUtils.wiElementsByClass( 'bar', document.getElementById( 'foo' ), 'div' );
```

### wiUtils.wiChunkArray
You can chunk an array into an array with subarrays with X elements per array:
```javascript
var foo = [1, 2, 3, 4, 5, 6, 7];

var split3 = wiUtils.wiChunkArray( foo, 3 );
// will return [[1, 2, 3], [4, 5, 6], [7]]
```

### wiUtils.wiIsWhat
To check what kind of object you have (also to distinguish ```Array``` from ```Object``` and vice versa):
```javascript
var o = {a: "b", c: "d"},
    a = ["b", "d"],
    i = 12,
    s = "a";

console.log( wiUtils.wiIsWhat( o ) === 'object' );
console.log( wiUtils.wiIsWhat( a ) === 'array' );
console.log( wiUtils.wiIsWhat( i ) === 'number' );
console.log( wiUtils.wiIsWhat( s ) === 'string' );
```

## Release History
Date | Version | Release Notes
:------------|:-------:|:-----
2013-07-07 | 0.2.0 | added ```wiUtils.wiElementsByClass()``` to select elements by class real fast
