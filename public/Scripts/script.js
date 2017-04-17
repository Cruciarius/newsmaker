"use strict";
//import {request} from "createRequest.js";

/*export*/ let articleService = (function () {

    let tags = ["sports", "ecology", "politics", "cinema", "games", "animals", "people", "society"];

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
        if (key == "createdAt") {
            return new Date(value);
        }
        return value;
    }

    return {
        addArticle: addArticle,
        editArticle: editArticle,
        removeArticle: removeArticle,
        addTag: addTag,
        removeTag: removeTag,
        parseDate: parseDate
    };

}());