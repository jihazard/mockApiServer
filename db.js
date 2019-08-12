var firstRoute  = require('../dbs/db.json');
var secondRoute = require('./dbs/db2.json');

// and so on
var data =  {
    firstRoute  : firstRoute,
    secondRoute : secondRoute
    // and so on
    }

    router.render = function (req, res) {

        // manually wrap any response send by json-server into an object
        // this is something like `res.send()`, but it is cleaner and meaningful
        // as we're sending json object not normal text/response
        res.json({
          user: req.user, // the user we stored previously in `simpleAuth` function
          body: res.locals.data // the original server-json response is stored in `req.locals.data`
        })
      }

module.exports = function() {
    return firstRoute;
}


