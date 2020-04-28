var { testObject , testAll , testOne } = require('../service_funcs/service_main').testLibrary;

let name = 20 ,
     age = 50;

let testString_F = new testObject( name , 'name' , 'string' );
    testString_F.addTypeCheck();
    testString_F.addStringLengthCheck( 10 );

let testNumber_F = new testObject( age , 'age' , 'number' );
    testNumber_F.addTypeCheck();
    testNumber_F.addNumberLengthCheck( 0 , 10 );

let testString_P = new testObject( 'johnkennedy' , 'name' , 'string');
    testString_P.addTypeCheck();
    testString_P.addStringLengthCheck(20);

let testsAll   = testAll( [ testString_F , testNumber_F] );
let testSingle = testOne( testString_P );

test('tests must pass.' , ( ) => {
    expect( testSingle.testsPassed ).toBe( true );
});

test('tests must fail.' , ( ) => {
    expect( testsAll.testsPassed ).toBe( false );
});
