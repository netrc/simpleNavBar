
# simpleNavBar

a simple browser/npm module for static sites to quickly build a nav bar that triggers app view actions

Usage

* include/require the module
* define nav bar items, app functions
** func called with div in to which to draw whatever
* setup router, connected to a div
** uses window.onhashchange to catch anchor changes
* ... clicking on nav bar items will trigger app functions, that can show whatever in app div

```
var appRoutingData = {
    // Title		  Anchor Name to route    function to call
    'Introduction': { m:"Introduction",      f: doIntro },
    'The Diary':    { m:"",                  f: doDiary },  // just index.html
    'People':       { m:"People",            f: doPeople },
    'Print':        { m:"Print",             f: doPrint,    noNav: true }  // option for no nav item
};
```

Setup:
```
<head>
<script src="https://code.jquery.com/jquery-3.2.1.js"> </script>
<script src="simpleNavRouter.js"> </script>
<link rel="stylesheet" type="text/css" href="simpleNavRouter.css">
</head>

<body>

<div id="AppContainer">
</div>

<script>
function doIntro( divEl ) {  // just draw what you want
	divEl.append(`<div id="intro"> <h1> Introduction </h1> stuf.... </div>`);
}
...

function initPage () {
                  // main div id,  nav title,  routing dat
    simpleNavRouter("AppContainer", "My Diary", appRoutingData);
    location.href="index.html#Introduction";  // kickoff 
}

window.onload = initPage;

</script>
```
