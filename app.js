/*var express = require("express");
var app = express();
app.use(express.static("public"));
console.log("Hello");
app.get("/", function(rec, res){
    res.render("index",{});
});
app.listen(3000);*/

var http = require("http");
var static = require("node-static");
var file = new static.Server("public");

http.createServer(function(req, res) {
    file.serve(req, res);
}).listen(8080);

console.log('Server running on port 8080');