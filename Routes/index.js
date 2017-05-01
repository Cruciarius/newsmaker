module.exports = function (app) {
    require("./main")(app);
    require("./authorise")(app);
};
