( function( $ ) {
    module( 'wiChunkArray', {
        // setting up some basic stuff for this module
        setup: function() {
            this.testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            this.testObject = {'foo': 'bar', 'bar': 'baz', 'baz': 'foo'};
        }
    } );

    test( 'return splitted Array or unchanged object', 2, function() {
        // valid run with a valid array
        deepEqual( wiUtils.wiChunkArray( this.testArray, 3 ), [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]], 'Should return an array of 4 arrays' );

        // invalid run with an object instead of an array
        deepEqual( wiUtils.wiChunkArray( this.testObject, 3 ), this.testObject, 'Should return an unchanged object' );
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
        deepEqual( wiUtils.wiIsWhat( this.o ), "object" );
        deepEqual( wiUtils.wiIsWhat( this.a ), "array" );
        deepEqual( wiUtils.wiIsWhat( this.i ), "number" );
        deepEqual( wiUtils.wiIsWhat( this.s ), "string" );
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

    test( 'accessing DOM objects by class', 8, function() {
        var node = document.getElementById( 'qunit-fixture' );

        strictEqual( wiUtils.wiElementsByClass( 'bar' ).length, 2, 'just a class' );
        strictEqual( wiUtils.wiElementsByClass( '.bar' ).length, 2, 'just a class with trailing dot' );
        strictEqual( wiUtils.wiElementsByClass( 'bar', node ).length, 2, 'class and node' );
        strictEqual( wiUtils.wiElementsByClass( '.bar', node ).length, 2, 'class with trailing dot and node' );
        strictEqual( wiUtils.wiElementsByClass( 'bar', node, 'div' ).length, 2, 'class without tailing dot, node and tag' );
        strictEqual( wiUtils.wiElementsByClass( '.bar', node, 'div' ).length, 2, 'class with trailing dot, node and tag' );
        strictEqual( wiUtils.wiElementsByClass( 'bar', null, 'div' ).length, 2, 'class without trailing dot, without node and with tag' );
        strictEqual( wiUtils.wiElementsByClass( '.bar', null, 'div' ).length, 2, 'class with trailing dot, without node and with tag' );
    } );

    module( 'wiFuzzyCompare', {
        setup: function() {
            this.objA = {foo: 'foo', bar: 1, baz: 1.2};
            this.objB = {foo: 'foo', bar: 1, baz: 1.2};
            this.objC = {foo: 'foo', bar: 1};
            this.objD = {bar: 1, foo: 'foo', baz: 1.2};
            this.objE = {bar: 2, foo: 'not foo', baz: 12};

            this.arrA = ['foo', 'bar', 'baz'];
            this.arrB = ['foo', 'bar'];
        }
    } );

    test( 'compare objects without keyArray', 5, function() {
        equal( wiUtils.wiFuzzyCompare( this.objA, this.objB ), true, 'Normal, identical objects' );
        equal( wiUtils.wiFuzzyCompare( this.objA, this.objC ), false, 'Normal, not equal' );
        equal( wiUtils.wiFuzzyCompare( this.objA, this.objD ), true, 'Normal, other order, equal' );
        equal( wiUtils.wiFuzzyCompare( this.objA, this.objE ), false, 'Normal, same keys, different values, not equal' );
        equal( wiUtils.wiFuzzyCompare( this.objA, this.arrA ), false, 'Normal, called with Array, not equal' );
    } );

    test( 'compare objects with keyArray', 2, function() {
        equal( wiUtils.wiFuzzyCompare( this.objA, this.objB, this.arrA ), true, 'Equal objects, equal keys' );
        equal( wiUtils.wiFuzzyCompare( this.objA, this.objC, this.arrB ), true, 'Not equal objects, with keyArray, key / values are equal' );
    } );
}( jQuery ) );
