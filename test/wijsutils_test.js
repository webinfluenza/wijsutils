( function( $ ) {
    /*
        ======== A Handy Little QUnit Reference ========
        http://api.qunitjs.com/
    */

    module( 'wiChunkArray', {
        // setting up some basic stuff for this module
        setup: function() {
            this.testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            this.testObject = {'foo': 'bar', 'bar': 'baz', 'baz': 'foo'};
        }
    } );

    test( 'return splitted Array or unchanged object', 2, function() {
        // valid run with a valid array
        deepEqual( $.wiChunkArray( this.testArray, 3 ), [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]], 'Should return an array of 4 arrays' );

        // invalid run with an object instead of an array
        deepEqual( $.wiChunkArray( this.testObject, 3 ), this.testObject, 'Should return an unchanged object' );
    } );

    module( 'isWhat', {
        // apply some different types
        setup: function() {
            this.o = {a: "b", c: "d"};
            this.a = ["b", "d"];
            this.i = 12;
            this.s = "a";
        }
    } );

    test( 'test different objects', 4, function() {
        deepEqual( $.wiIsWhat( this.o ), "object" );
        deepEqual( $.wiIsWhat( this.a ), "array" );
        deepEqual( $.wiIsWhat( this.i ), "number" );
        deepEqual( $.wiIsWhat( this.s ), "string" );
    } );

    module( 'wiElementsByClass', {
        setup: function() {
            // inserting some dummy elements
            var el1 = $( '<div class="foo" />' ),
                child1 = $( '<div class="bar" />' ),
                child2 = $( '<div class="bar baz" />' );

            el1.append( child1 ).append( child2 );

            $( '#qunit-fixture' ).append( el1 );
        }
    } );

    test( 'wiElementsByClass', 8, function() {
        var node = document.getElementById( 'qunit-fixture' );

        // 1st test: just a class
        strictEqual( 2, $.wiElementsByClass( 'bar' ).length, 'just a class' );

        // 2nd test: just a class with trailing dot
        strictEqual( 2, $.wiElementsByClass( '.bar' ).length, 'just a class with trailing dot' );

        // 3rd test: class and node
        strictEqual( 2, $.wiElementsByClass( 'bar', node ).length, 'class and node' );

        // 4th test: class with trailing dot and node
        strictEqual( 2, $.wiElementsByClass( '.bar', node ).length, 'class with trailing dot and node' );

        // 5th test: class without tailing dot, node and tag
        strictEqual( 2, $.wiElementsByClass( 'bar', node, 'div' ).length, 'class without tailing dot, node and tag' );

        // 6th test: class with trailing dot, node and tag
        strictEqual( 2, $.wiElementsByClass( '.bar', node, 'div' ).length, 'class with trailing dot, node and tag' );

        // 7th test: class without trailing dot, without node (null) and with tag
        strictEqual( 2, $.wiElementsByClass( 'bar', null, 'div' ).length, 'class without trailing dot, without node and with tag' );

        // 8th test: class with trailing dot, without node and with tag
        strictEqual( 2, $.wiElementsByClass( '.bar', null, 'div' ).length, 'class with trailing dot, without node and with tag' );
    } );
}( jQuery ) );
