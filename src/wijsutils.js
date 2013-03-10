/**
 * wijsutils
 * http://www.webinfluenza.de
 *
 * Copyright (c) 2013 Benno Mielke
 * Licensed under the MIT license.
 **/

;( function( $, undefined ) {
    /**
     * this method splits arrays in X subarrays / chunks
     * will not run on IE < 8
     **/
    $.wiChunkArray = function( array, size ) {
        // is array parameter is actually an array, map into chunks
        // else return the given object untouched
        size = size || array.length || 1;

        return (typeof array !== 'undefined' && array.constructor === Array) ? [].concat.apply( [],
            array.map( function( el, idx ) {
                return idx % size ? [] : [array.slice( idx, idx + size )];
            } )
        ) : array;
    };
}( jQuery ) );