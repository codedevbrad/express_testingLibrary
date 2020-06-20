var { testValue , testFormFields , testAll , testOne } = require('../service_funcs/service_main');

let name = 20 ,
     age = 50;

let testString_F = new testValue( name , 'name' , 'string' );
    testString_F.addTypeCheck();
    testString_F.addStringLengthCheck( 10 );

let testNumber_F = new testValue( age , 'age' , 'number' );
    testNumber_F.addTypeCheck();
    testNumber_F.addNumberLengthCheck( 0 , 10 );

let testString_P = new testValue( 'johnkennedy' , 'name' , 'string');
    testString_P.addTypeCheck();
    testString_P.addStringLengthCheck(20);

let testsAll   = testAll( [ testString_F , testNumber_F] );
let testSingle = testOne( testString_P );

test('value must be of type scring and no greater than 10 chars long.' , ( ) => {
    expect( testSingle.testsPassed ).toBe( true );
});

test('validation for string and number must fail tests' , ( ) => {
    expect( testsAll.testsPassed ).toBe( false );
});

// must be a valid email.

let email_pass = 'codedevbrad@gmail.com';
let email_fail = 'codedevbradgmail.com';

// password must be a Minimum of eight characters, at least one letter, one number and one special character:

let password_correct = 'surferdude20@';
let password_fail    = 'surferdude20';

let testEmail_p = new testFormFields();
    testEmail_p.add('email'    , email_pass );
    testEmail_p.add('password' , password_correct );

  let testEmail_f = new testFormFields();
      testEmail_f.add('email'    , email_fail );
      testEmail_f.add('password' , password_fail );

let testForm_pass = testOne( testEmail_p );
let testForm_fail = testOne( testEmail_f );

test('form fields must pass test.' , ( ) => {
    expect( testForm_pass.testsPassed ).toBe( true );
});

test('form fields must fail test.' , ( ) => {
    expect( testForm_fail.testsPassed ).toBe( false );
});
