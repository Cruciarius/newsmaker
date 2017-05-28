"use strict";
module.exports = function (app) {
    let db = require("diskdb");
    let passport = require("passport");
    let LocalStrategy = require("passport-local").Strategy;
    db = db.connect("./public/Data", ["users.json"]);

    passport.use(new LocalStrategy({
            usernameField: "username",
            passwordField: "password"
        },
        function (user, password, done) {
            let orig = db.users.findOne({"login": user});
            if (!orig) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if (password != orig.password) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            app.locals.user = user;
            return done(null, user);
        }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
};
