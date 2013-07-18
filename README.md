# WebInfluenza JavaScript Utils

JavaScript and jQuery Utils, that will be needed from time to time on multiple projects

## Getting Started
It's quite simple. Just include the file dist/wijsutils.js and have phun.

## Documentation
### wiUtils.wiElementsByClass
Get DOM elements by class name with a real fast selection algorithm (based on a work of [Dustin Diaz](http://www.dustindiaz.com/getelementsbyclass/))
#### Signature
```javascript
wiUtils.wiElementsByClass( cssClass, nodeElement, tagName );
```
* ```cssClass``` (String, __required__) find elements with this class
* ```nodeElement``` (HTMLElement, __optional__, default: ```document```) the context element
* ```tagName``` (String, __optional__, default: ```*```) identifies the tag name (like ```div```) of the element

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
