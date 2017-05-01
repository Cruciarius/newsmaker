let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let db = require("diskdb");
let passport = require("passport");
let cookieParser = require('cookie-parser');
let flash = require("connect-flash");
let session = require("express-session");

db.connect("./public/Data", ["articles.json"]);
module.exports = function (app) {
    app.set("port", (process.env.PORT || 5000));
    app.use(express.static("public"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(session({ secret: 'BIGSECRET' }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    let articles = db.articles.find();

    let filterConfig = {
        skip: undefined,
        top: undefined,
        author: undefined,
        createdAfter: undefined,
        createdBefore: undefined,
        tags: undefined
    };

    let response = {
        articles: undefined,
        length: undefined,
        id: undefined
    };

    function validateArticles(articles, fc) {
        filterConfig = fc || filterConfig;
        articles = articles.sort(compareDates);
        let arr = [];
        for (let i = filterConfig.skip; i < articles.length && filterConfig.top > 0; i++) {
            if (isSearched(articles[i])) {
                if (validateArticle(articles[i])) {
                    arr.push(articles[i]);
                    filterConfig.top--;
                }
            }
        }
        return arr;
    }

    app.get("/articles", function (req, res) {
        filterConfig.skip = req.query.skip || 0;
        filterConfig.top = req.query.top || articles.length;
        filterConfig.author = req.query.author;
        filterConfig.createdAfter = req.query.createdAfter;
        filterConfig.createdBefore = req.query.createdBefore;
        filterConfig.tags = req.query.tags;
        response.articles = validateArticles(articles, filterConfig);
        response.length = response.articles.length;
        res.json(response);
    });

    app.get("/articles/:id", function (req, res) {
        let id = response.id = req.params.id;
        res.json(articles.filter(article => id == article.id)[0]);
    });

    app.get("/id", function (req, res) {
        res.json(response.id);
    });

    app.get("/articles401/:id", function (req, res) {
        res.status(401).end();
    });

    app.get("/articles500/:id", function (req, res) {
        (function a() {
            a();
        }());

        res.end(500);
    });

    app.post("/articles", function (req, res) {
        let article = {
            title: req.body.title,
            summary: req.body.summary,
            createdAt: req.body.createdAt,
            author: req.body.author,
            content: req.body.content,
            tags: req.body.tags,
            deleted: false,
            id: articles.length
        };
        if (validateArticle(article)) {
            articles.push(article);
            response.id = article.id;
            res.json(article);
        }
    });

    app.delete("/articles", function (req, res) {
        let id = req.query.id || req.body.id;
        articles = articles.filter(article => id != article.id);
        res.json({idWasRemoved: Number(id)});
    });

    app.delete("/articles/:id", function (req, res) {
        let id = req.params.id;
        articles = articles.filter(article => id != article.id);
        res.json({idWasRemoved: Number(id)});
    });

    app.patch("/articles/:id", function (req, res) {
        let id = req.params.id.replace(":", "");
        let i = articles.indexOf(articles.filter(article => id == article.id)[0]);
        if (req.body.title) {
            articles[i].title = req.body.title;
        }
        if (req.body.summary) {
            articles[i].summary = req.body.summary;
        }
        if (req.body.content) {
            articles[i].content = req.body.content;
        }
        if (req.body.tags) {
            articles[i].tags = req.body.tags;
        }
        res.json(articles[i]);
    });

    app.get("/user", function (req,res) {
        res.json(user);
    });


    function validateArticle(article) {
        if (!article.id || !article.title || !article.author || !article.summary || !article.createdAt || !article.content) {
            return false;
        }
        if (article.tags.length == 0 || article.title.length >= 100 || article.summary.length >= 200 || article.title.length == 0 || article.summary.length == 0) {
            return false;
        }
        return true;
    }

    function compareDates(a, b) {
        return (new Date(a.createdAt) - new Date(b.createdAt));
    }

    function isSearched(element) {
        return (compareAuthor(element) && compareDate(element) && compareTags(element));
    }

    function compareAuthor(element) {
        if (filterConfig.author) {
            if (filterConfig.author.toLowerCase() === element.author.toLowerCase()) {
                return true;
            }
            return false;
        }
        return true;
    }

    function compareDate(element) {
        if (filterConfig.createdBefore && filterConfig.createdAfter) {
            if ((new Date(filterConfig.createdAfter)).getTime() <= element.createdAt.getTime() && (new Date(filterConfig.createdBefore)).getTime() >= element.createdAt.getTime()) {
                return true;
            }
            return false;
        }
        return true;
    }

    function find(array, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] == value) return i;
        }
        return -1;
    }

    function compareTags(element) {
        if (filterConfig.tags) {
            let filter = filterConfig.tags.split(", ");
            for (let i = 0; i < element.tags.length; i++) {
                if ((find(filter, element.tags[i]) != -1) && element.tags[i] != "") {
                    return true;
                }
            }
            return false;
        }
        return true;
    }

};
