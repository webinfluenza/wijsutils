/*! WebInfluenza JavaScript Utils - v0.3.0 - 2013-07-20
* http://www.webinfluenza.de
* Copyright (c) 2013 Benno Mielke; Licensed MIT */
// @TODO: get rid of jQuery, use only vanilla JavaScript

/*jshint unused: true */
;( function( $, undefined ) {
    var wiUtils = {
        /**
         * some global stuff, namespaced
         **/
        wiGlobalSpace: {
            isDebug: false,
            objectTypes: {
                '[object Object]': 'object',
                '[object Array]': 'array',
                '[object Number]': 'number',
                '[object String]': 'string'
            }
        },

        /**
         * Enable / disable debug output (console)
         * @param  {Boolean} showDebug If set to true, errors and warning will be shown in the console
         */
        wiSetDebugOutput: function( showDebug ) {
            this.wiGlobalSpace.isDebug = showDebug;
        },

        /**
         * this method splits arrays in X subarrays / chunks
         **/
        wiChunkArray: function( array, size ) {
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
        },

        /**
         * check what kind of object we've here and
         * return the value
         * @TODO: think about a proper return value, if the parameter was not passed
         **/
        wiIsWhat: function( input ) {
            try {
                if( typeof input !== 'undefined' ) {
                    return this.wiGlobalSpace.objectTypes[Object.prototype.toString.call( input )];
                } else {
                    throw new TypeError( '[wiIsWhat] Passed argument from unknown type!' );
                }
            } catch( error ) {
                if( this.wiGlobalSpace.isDebug ) {
                    console.error( error );
                }

                return false;
            }
        },

        /**
         * Fast DOM element selection by Dustin Diaz
         * @see http://www.dustindiaz.com/getelementsbyclass/
         **/
        wiElementsByClass: function( searchClass, node, tag ) {
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

            for( var i = 0, j = 0; i < elsLen; i += 1 ) {
                if( pattern.test( els[i].className ) ) {
                    classElements[j] = els[i];
                    j++;
                }
            }

            return classElements;
        },

        /**
         * Comparing two objects. If keyArray is set, the objects
         * will be testet against the given keys. This methods assumes,
         * that keyArray entries (properties) are valid properties of
         * refObj!
         * @todo   Think about a more generic object handling (introducing Number, Date, String, Array)
         * @todo   What if an object has nested objects?
         * @param  {Object} refObj  the reference object to compare to
         * @param  {Object} obj     the object that will be tested
         * @param  {Array} keyArray (optional) Array with keys that will be compared to
         * @return {Boolean}        true if the objects are equal, otherwise false
         */
        wiFuzzyCompare: function( refObj, obj, keyArray ) {
            /**
             * Check if keyArray is set. If so, we need to compare only the given keys.
             */
            if( typeof keyArray !== 'undefined' && keyArray.constructor === Array ) {
                var matchCount = 0, // count the matches of key / value comparisons
                    keyCount = keyArray.length; // cache the length of the key array

                for( var i = 0, iMax = keyCount; i < iMax; i += 1 ) {
                    /**
                     * is the property set in the obj and are both value equal?
                     */
                    if( typeof obj[keyArray[i]] !== 'undefined' && refObj[keyArray[i]] === obj[keyArray[i]] ) {
                        matchCount++;
                    }
                }

                /**
                 * return true, if the count of keyArray elements equals the matched values
                 */
                return matchCount === keyCount;
            }

            /**
             * no keyArray was given, do a traditional object comparision
             */
            try {
                /**
                 * are both objects set?
                 */
                if( arguments.length === 2 ) {
                    if( refObj.constructor === Object && obj.constructor === Object ) {
                        /**
                         * okay, there are two parameters and both of them are definitely from type Object
                         */
                        var isEqual = true;

                        for( var key in refObj ) {
                            /**
                             * according the Rice's theorem (http://en.wikipedia.org/wiki/Rice%27s_theorem),
                             * we can't compare function's equality in general. so skip the steps in this
                             * iteration.
                             */
                            if( refObj[key].constructor === Function ) {
                                continue;
                            }

                            /**
                             * if either a key from refObj is not set in obj, or the values
                             * of the actual key is not equal to refObj's value, the objects
                             * themselves are not equal -> return false
                             */
                            if( obj.hasOwnProperty( key ) === false || refObj[key] !== obj[key] ) {
                                isEqual = false;

                                /**
                                 * break, because the first difference was found, the objects
                                 * aren't equal anymore :(
                                 */
                                break;
                            }
                        }

                        return isEqual;
                    } else {
                        throw new TypeError( '[wiFuzzyCompare] Called on non-object!' );
                    }
                } else {
                    throw new TypeError( '[wiFuzzyCompare] Called with invalid arguments count!' );
                }
            } catch( error ) {
                if( this.wiGlobalSpace.isDebug ) {
                    console.error( error );
                }

                return false;
            }
        }
    };

    window.wiUtils = wiUtils || {};
}( jQuery ) );
