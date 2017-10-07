

"use strict";

// export simpleNavRouter object
//
// developer creates index.html with   <div id=MainContainer> </div>
//
// winds up with
// 		<div id=containDiv>  // from developer
//    		<div class= simpleNavRouterBar >  // this makes the nav Bar div
//         		 <a> navTitle </a>  <a> item1 </a>  <a> item2 </a> ...
//    		</div>
//    		<div id=ReapAppDiv>  // the appDiv in to which the app writes
//    		</div>
// 		</div>

(function() {
var root = this

var _simpleNavRouter = function ( divID, navTitle, routingData ) {
	let _version = 0;
    let rd = null;
    let containDiv = null;
    let appDiv = null;
    let navBar = null;

    let doRouting = function( ) {
        let newU = location.href;
        //console.log(`doR newU: ${newU}`);
        appDiv.empty();
	   // or do "match" via absolute property value expression
        Object.keys(rd).map( k => {
			//console.debug(`newU match ?: ${newU}   k: ${k}   ${k}.uRE: ${rd[k].uRE}`);
            if (newU.match(rd[k].uRE)) {
				if (typeof ga !== 'undefined') {
					ga('set','page',`/${k['m']}`); // make up pagename for analytics
					ga('send','pageview');
				}
                rd[k]['f'](appDiv); // function can draw what it wants to the div
            }
        });
    };

	containDiv = $(`#${divID}`)
    rd = routingData

    containDiv.empty()  // make sure to empty
    containDiv.append(`<div class="simpleNavRouterBar"> </div>`)
    navBar = $('.simpleNavRouterBar')
    navBar.append(`<div class="simpleNavRouterBarTitle"> ${navTitle} </div>`);
	// set the routing bar items and regular expressions
    Object.keys(rd).map( k => {
		let re = `index.html#` + rd[k]['m'] + '$';
		//console.debug(`setup: setting uRE to ${re}`);
        rd[k].uRE = RegExp(re);

        if (! rd[k].hasOwnProperty("noNav")) {  // otherwise, skip nav
			let e = navBar.append(`<a class="simpleNavRouterBarItem" href="index.html#${rd[k].m}"> ${k} </a`);
			// n.b. just setting the href triggers window.onhashchange(), iff it changed!
		}
	});
	containDiv.append(`<div id="innerApp"> </div>`) // for the app
    appDiv = $('#innerApp')

    window.onhashchange = doRouting;
};

if( typeof exports !== 'undefined' ) {
	if( typeof module !== 'undefined' && module.exports ) {
		exports = module.exports = _simpleNavRouter
	}
	exports.simpleNavRouter = _simpleNavRouter
} else {
    root.simpleNavRouter = _simpleNavRouter
}

}).call(this);
