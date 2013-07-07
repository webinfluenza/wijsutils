/*! WebInfluenza JavaScript Utils - v0.2.0 - 2013-07-07
* http://www.webinfluenza.de
* Copyright (c) 2013 Benno Mielke; Licensed MIT */
// @TODO: get rid of jQuery, use only vanilla JavaScript

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

    /**
     * Fast DOM element selection by Dustin Diaz
     * @see http://www.dustindiaz.com/getelementsbyclass/
     **/
    $.wiElementsByClass = function( searchClass, node, tag ) {
        var classElements = [];

        // if nothing was set, simply return
        if( typeof searchClass === 'undefined' || !searchClass.length ) {
            return;
        }

        if( node === null || typeof node === 'undefined' ) {
            node = document;
        }

        if( tag === null || typeof tag === 'undefined' ) {
            tag = '*';
        }

        if( searchClass.charAt( 0 ) === '.' ) {
            // remove the trailing .
            searchClass = searchClass.substr( 1 );
        }

        var els = node.getElementsByTagName( tag ),
            elsLen = els.length,
            pattern = new RegExp( "(^|\\s)" + searchClass + "(\\s|$)" );

        for( var i = 0, j = 0; i < elsLen; i++ ) {
            if( pattern.test( els[i].className ) ) {
                classElements[j] = els[i];
                j++;
            }
        }

        return classElements;
    };
}( jQuery ) );
