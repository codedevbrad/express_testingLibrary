
function testSingle ( obj ) {

    var testsMade = [ ];
    var didPass = true;

		obj.tests.forEach( ( eachTest ) => {
    			let { describe , toCall } = eachTest;
    			let test = eachTest.toCall( );
          if ( !test ) {
              didPass = false;
          }
          testsMade.push( { describe , state : test });
    });
    return { didPass , testsMade };
}

function testOne ( single ) {

      var allTests  = [ ];
      var testsPassed = true;

      let check = testSingle( single );
      let { didPass , testsMade } = check;
      allTests = [ ...allTests , ...testsMade ];
      if ( !didPass ) { testsPassed = false; }

      return { testsPassed , allTests }
}

function testAll ( tests ) {

    var allTests  = [ ];
    var testsPassed = true;

		tests.forEach( ( each ) => {
    		let check = testSingle( each );
        let { didPass , testsMade } = check;
        allTests = [ ...allTests , ...testsMade ];
        if ( !didPass ) { testsPassed = false; }
    });
    return { testsPassed , allTests }
}

function testValue ( value , field , type ) {
		this.value = value;
    this.type  = type;
    this.field = field;
    this.tests = [ ];

    this.addTypeCheck = function ( ) {
    		let test = ( ) => typeof this.value === this.type;
        this.tests.push( { describe: `${this.field} should be a ${this.type}`, toCall: test } );
    }
    this.addStringLengthCheck = function ( max ) {
        let test = ( ) => this.value != 'undefined' && this.value != '' && this.value.length < max;
        this.tests.push( { describe: `${this.field} should be no longer than ${ max }`, toCall: test });
    }
    this.addNumberLengthCheck = function ( min , max ) {
    	  let test = ( ) => this.value != 'undefined' && this.value != min && this.value < max;
        this.tests.push( { describe: `${this.field} should be between ${ min } and ${ max }`, toCall: test });
    }
}


function testFormFields ( ) {
    this.tests = [ ];

    this.add = function ( type , value ) {
        switch ( type ) {
          case 'username':
            this.usernameValdate( value );
            break;
          case 'email':
            this.emailVaidate( value );
            break;
          case 'password':
            this.passwordValidate( value );
        }
    }

    this.usernameValdate = function (inputText ) {
        let nameFormat =  /^([a-zA-Z0-9_-]){5,20}$/;
        let test = ( ) => inputText.match( nameFormat ) ? true : false;
        this.tests.push( { describe: `${ inputText } should be a valid email username`, toCall: test });
    }

    this.emailVaidate = function ( inputText ) {
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let test = ( ) => inputText.match( mailFormat ) ? true : false;
        this.tests.push( { describe: `${ inputText } should be a valid email address`, toCall: test });
    }
    this.passwordValidate = function ( inputText ) {
        // Minimum eight characters, at least one letter, one number and one special character:
        let passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,20}$/;
    	  let test = ( ) => inputText.match( passwordFormat ) ? true : false;
        this.tests.push( { describe: `${ inputText } should be a valid password`, toCall: test });
    }
}

module.exports = { testValue , testFormFields , testAll , testOne };


//
