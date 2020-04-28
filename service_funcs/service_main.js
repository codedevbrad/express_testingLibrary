

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

function testObject ( value , field , type ) {
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
 

module.exports.testLibrary = { testObject , testAll , testOne };


//
