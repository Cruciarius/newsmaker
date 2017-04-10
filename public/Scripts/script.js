"use strict";

var articleService = (function () {

    var tags = ["sports", "ecology", "politics", "cinema", "games", "animals", "people", "society"];

    function getArticle(id) {
        articles = JSON.parse(localStorage.getItem("allArticles"), parseDate);
        for (var i = 0; i < articles.length; i++) {
            if (id === articles[i].id) {
                return articles[i];
            }
        }
    }

    function getPosition(id) {
        articles = JSON.parse(localStorage.getItem("allArticles"), parseDate);
        for (var i = 0; i < articles.length; i++) {
            if (id === articles[i].id) {
                return i;
            }
        }
        return -1;
    }

    function validateArticle(article) {
        if (article.id === undefined || article.title === undefined || article.author === undefined || article.summary === undefined || article.createdAt == null || article.content === undefined) {
            return false;
        }
        if (article.tags.length === 0 || article.title.length >= 100 || article.summary.length >= 200 || article.title.length === 0 || article.summary.length === 0) {
            return false;
        }
        return true;
    }

    function validateId(id) {
        articles = JSON.parse(localStorage.getItem("allArticles"), parseDate);
        for (var i = 0; i < articles.length; i++) {
            if (articles[i].id == id) {
                return false;
            }
        }
        return true;
    }

    function addArticle(article) {
        let oReq = request.createGetRequest("/articles");
        oReq.onreadystatechange = function () {
            article = article || JSON.parse(localStorage.getItem("articleTemp"));
            for (var i = 0; i < tags.length; i++) {
                if (tags.indexOf(article.tags[i]) === -1) {
                    article.tags.splice(i, 1);
                }
            }
            article.id = localStorage.getItem("size");
            article.id++;
            console.log(article.id);
            if (validateArticle(article) && validateId(article.id)) {
                article.id = (articles.length + 1).toString();
                articles.push(article);
                localStorage.setItem("size", article.id);
                localStorage.setItem("allArticles", JSON.stringify(articles));
                return true;
            }
            else {
                return false;
            }
        };

    }

    function editArticle(id, article) {
        let oReq = request.createGetRequest("/articles/:id");
        oReq.onreadystatechange = function () {
            id = JSON.parse(oReq.responseText,parseDate).id;
            request.createPatchRequest("/articles/:"+id,article);
        };
    }

    function removeArticle(id) {
        articles = JSON.parse(localStorage.getItem("allArticles"), parseDate);

        var i = getPosition(id);
        if (i != -1) {
            articles[i].deleted = true;
            articles.splice(i, 1);
            localStorage.setItem("allArticles", JSON.stringify(articles));
            return true;
        }
        return false;
    }

    function addTag(tag) {
        if (tags.indexOf(tag) === -1) {
            tags.push(tag);
            return true;
        }
        return false;
    }

    function removeTag(tag) {
        if (tags.indexOf(tag) != -1) {
            tags.splice(tags.indexOf(tag), 1);
            return true;
        }
        return false;
    }

    function parseDate(key, value) {
        if (key == 'createdAt') {
            return new Date(value);
        }
        return value;
    }

    return {
        getArticle: getArticle,
        validateArticle: validateArticle,
        validateId: validateId,
        addArticle: addArticle,
        editArticle: editArticle,
        removeArticle: removeArticle,
        addTag: addTag,
        removeTag: removeTag,
        parseDate: parseDate
    }

}());