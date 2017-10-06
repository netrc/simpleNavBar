
'use strict;'

const snr = require('./simpleNavRouter')

//console.log(`snr version: ${snr._version}`);

// mock $ func, w,  append func, empty func  // force into root/global context
global.$  = function  (n) {
	console.log(`making jq proxy for ${n}`);
	return {
		myname: n,
		empty: function() {
			console.log(`$ proxy ${this.myname}: empty`);
		},
		append: function( el ) {
			console.log(`$ proxy ${this.myname} append: ${el}`);
			return global.$(el);  // careful not to recurse!
		}
	}
}
global.window = {};   // mock to store onhashchange
global.location = { href: '' };   // mock to store location
global.ga = function ( s ) {
	console.log(`ga mock: ${s}`);
}

// fake ga func
// fake global location.href

function testRoute(r) {
	console.log(`snr testRoute: ${r}`);
        location.href=r;
        //snr.doRouting()
		window.onhashchange();
	console.log(``);
}

// test setup

//// test data

function doIntro ( divEl ) {  // just draw what you want
	console.log(`doing Intro on divEl`);
}

function doDiary ( divEl ) {  // just draw what you want
	console.log(`doing Diary on divEl`);
}

function doPeople ( divEl ) {  // just draw what you want
	console.log(`doing People on divEl`);
}

function doPrint ( divEl ) {  // just draw what you want
	console.log(`doing Print on divEl`);
}

var appRoutingData = {
    // Title
    'Introduction': { m:"Introduction", f: doIntro },
    'The Diary':    { m:"",        f: doDiary },  // just index.html
    'People':       { m:"People", f: doPeople },
    'Print':        { m:"Print", f: doPrint, noNav: true }
};

                     // main div id,  nav title,  routing dat
snr("testAppDiv", "testSNR App", appRoutingData);

testRoute(`index.html`);
testRoute(`index.html#Introduction`);
testRoute(`index.html#People`);
testRoute(`index.html#Print`);
