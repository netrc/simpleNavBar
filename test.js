
'use strict;'

const snr = require('./simpleNavRouter')

global.SNRDEBUG = process.env.hasOwnProperty('SNRDEBUG') ? true : false;

function snrDebug( s ) {
	global.SNRDEBUG && console.log(s);
}
//console.log(`snrdebug: ${global.SNRDEBUG}`);

//console.log(`snr version: ${snr._version}`);

// mock $ func, w,  append func, empty func  // force into root/global context
global.$  = function  (n) {
	snrDebug(`making jq proxy for ${n}`);
	return {
		myname: n,
		empty: function() {
			snrDebug(`$ proxy ${this.myname}: empty`);
		},
		append: function( el ) {
			snrDebug(`$ proxy ${this.myname} append: ${el}`);
			return global.$(el);  // careful not to recurse!
		}
	}
}

// fake ga func, fake global location.href
global.window = {};   // mock to store onhashchange
global.location = { href: '' };   // mock to store location
global.ga = function ( s ) {
	snrDebug(`ga mock: ${s}`);
}

///// little test harness
function testRoute(r) {
	global.snrResult = '';
	snrDebug(`snr testRoute: ${r}`);
        location.href=r;
        //snr.doRouting()
		window.onhashchange();
	snrDebug(``);
}
function testCheck(s) {
	snrDebug(`tc: s: ${s}  snrResult: ${global.snrResult}`);
	(global.snrResult == s) || console.error(`failed: ${s}`);
}
///// little test harness


// test setup
//// test data

function doIntro ( divEl ) {  // just draw what you want
	snrDebug(`doing Intro on divEl`);
	global.snrResult = 'doIntro ok';
}

function doDiary ( divEl ) {  // just draw what you want
	snrDebug(`doing Diary on divEl`);
	global.snrResult = 'doDiary ok';
}

function doPeople ( divEl ) {  // just draw what you want
	snrDebug(`doing People on divEl`);
	global.snrResult = 'doPeople ok';
}

function doPrint ( divEl ) {  // just draw what you want
	snrDebug(`doing Print on divEl`);
	global.snrResult = 'doPrint ok';
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
	testCheck('doDiary ok');
testRoute(`index.html#Introduction`);
	testCheck('doIntro ok');
testRoute(`index.html#People`);
	testCheck('doPeople ok');
testRoute(`index.html#Print`);
	testCheck('doPrint ok');
