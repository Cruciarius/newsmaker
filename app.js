var express = require("express");
var http = require("http");
var app = express();


require("./Boot/index")(app);
require('./Routes/index')(app);

http.createServer(app).listen(app.get('port'), function () {
    if ('development' == app.get('env')) {
        console.log('Express server listening on port ' + app.get('port'));
    }
});