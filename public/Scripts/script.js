"use strict";

var articleService = (function () {

    var tags = ["sports", "ecology", "politics", "cinema", "games", "animals", "people", "society"];

    function getArticle(id) {
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
        request.createPostRequest("/articles",article);
    }

    function editArticle(id, article) {
        request.createPatchRequest("/articles/"+id,article);
    }

    function removeArticle(id) {
        request.createDeleteRequest("/articles/"+id);
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