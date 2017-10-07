
# simpleNavBar

a simple browser/npm module for static sites to quickly build a nav bar that triggers app view actions

Usage

* include/require the module
* define nav bar items, app functions
** func called with div in to which to draw whatever
* setup router, connected to a div
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
   // main div id,    nav bar title,   routing data
snr("testAppDiv",   "testSNR App",    appRoutingData);
```
