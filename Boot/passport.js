"use strict";
let db = require("diskdb");
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
db = db.connect("./public/Data", ["users.json"]);

passport.use(new LocalStrategy(
    function (user,password,done) {
        db.users.findOne({"login":user},function (err,user) {
            console.log(user);
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (password!=user.password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            app.locals.user = user;
            return done(null, user);
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
        err
            ? done(err)
            : done(null,user);
    });
});
module.exports = function (app) {
};
