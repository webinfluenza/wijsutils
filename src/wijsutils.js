/**
 * wijsutils
 * http://www.webinfluenza.de
 *
 * Copyright (c) 2013 Benno Mielke
 * Licensed under the MIT license.
 **/

;( function( $, undefined ) {
    /**
     * some global stuff, namespaced
     **/
    var wiGlobalSpace = {
        objectTypes: {
            '[object Object]': 'object',
            '[object Array]': 'array',
            '[object Number]': 'number',
            '[object String]': 'string'
        }
    };
    /**
     * this method splits arrays in X subarrays / chunks
     * will not run on IE < 8
     **/
    $.wiChunkArray = function( array, size ) {
        // is array parameter is actually an array, map into chunks
        // else return the given object untouched
        if( array.length ) {
            // way faster implementation then the old one
            var results = [];

            while( array.length ) {
                results.push( array.splice( 0, size ) );
            }

            return results;
        } else {
            return array;
        }
    };

    /**
     * check what kind of object we've here and
     * return the value
     * @TODO: think about a proper return value, if the parameter was not passed
     **/
    $.wiIsWhat = function( input ) {
        if( typeof input !== 'undefined' ) {
            return wiGlobalSpace.objectTypes[Object.prototype.toString.call( input )];
        } else {
            return "invalid";
        }
    };
}( jQuery ) );
