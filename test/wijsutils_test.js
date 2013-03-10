( function( $ ) {
    /*
        ======== A Handy Little QUnit Reference ========
        http://api.qunitjs.com/
    */

    module( 'jQuery#chunkArray', {
        // setting up some basic stuff for this module
        setup: function() {
            this.testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            this.testObject = {'foo': 'bar', 'bar': 'baz', 'baz': 'foo'};
        }
    } );

    test( 'wiChunkArray return splitted Array or unchanged object', 2, function() {
        // valid run with a valid array
        deepEqual( $.wiChunkArray( this.testArray, 3 ), [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]], 'Should return an array of 4 arrays' );

        // invalid run with an object instead of an array
        deepEqual( $.wiChunkArray( this.testObject, 3 ), this.testObject, 'Should return an unchanged object' );
    } );
}( jQuery ) );
