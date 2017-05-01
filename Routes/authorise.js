let passport = require('passport');

module.exports = function (app) {

    app.get('/authorise', function (req, res) {
        console.log(1);
        if (req.isAuthenticated()) {
            console.log(2);
            res.redirect('/');
        }
        console.log(3);
        res.redirect("/authorise");
    });

    app.get('/sign-out', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/authorise', function(req,res,next) {
        passport.authenticate('local',
            function (err, user, info) {
                return err
                    ? next(err)
                    : user
                        ? req.logIn(user, function (err) {
                            return err
                                ? next(err)
                                : res.redirect('/authorise');
                        })
                        : res.redirect('/');
            }
        )(req, res, next)
    });
    
    function isA() {
        
    }
};
