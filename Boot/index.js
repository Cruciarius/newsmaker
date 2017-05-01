module.exports = function (app) {
    require("./requests")(app);
    require("./passport")(app);
};