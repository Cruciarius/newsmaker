"use strict";
/*import {handleAddNews, handleClickLogIn} from "events.js";
import {request} from "createRequest.js";
import {articleService} from "script.js";*/

/*export*/ let ACDomService = (function () {
    document.addEventListener("DOMContentLoaded", startApp);
    var user = localStorage.getItem("user") || null;
    let change = false;
    let id = request.getUrlVars()["id"];

    function startApp() {
        if (user != null) {
            document.getElementsByTagName("header")[0].innerHTML = "<div class=\"user\">\
            <img src=\"Images/logo.png\" class=\"image-Logo\">Welcome, " + user + "! </div>\
            <button class=\"White-Button \" style=\"margin-right: 3.5%\" id=\"add-news\">Add News</button>\
            <button class=\"White-Button\" id=\"log-out\">Log Out</button>";
            document.getElementById("log-out").addEventListener("click", guest);
            document.getElementById("add-news").addEventListener("click", handleAddNews);
        }
        else guest();
        if (id) {
            change = true;
            let oReq = request.createGetRequest("/articles/" + id);
            oReq.onreadystatechange=function(){
                if (oReq.readyState == 4) {
                    let article = JSON.parse(oReq.responseText, articleService.parseDate);
                    createMessage(article);
                }
            };
        }
        else {
            change = false;
        }
    }

    function ACArticle() {
        let article = {
            id: undefined,
            author: undefined,
            createdAt: undefined,
            title: undefined,
            summary: undefined,
            content: undefined,
            tags: undefined
        };
        article.title = ChangingName.value;
        article.summary = ChangingShortDescription.value;
        article.content = ChangingArticleText.value;
        article.tags = ChangingTags.value.split(", ");
        if (change) {
            id = request.getUrlVars()["id"];
            articleService.editArticle(id,article);
        }
        else {
            article.author = user;
            article.createdAt = new Date();
            articleService.addArticle(article);
        }
    }

    function guest() {
        document.getElementsByTagName("header")[0].innerHTML = "<div class=\"user\">\
            <img src=\"Images/logo.png\" class=\"image-Logo\">Welcome, guest!</div>\
            <button class=\"White-Button\" id=\"log-in\">Log In</button>";
        document.getElementById("log-in").addEventListener("click", handleClickLogIn);
    }

    function createMessage(article) {
        let tags = "";
        for (let i = 0; i < article.tags.length; i++) {
            tags += article.tags[i];
            tags += ", ";
        }
        document.getElementById("ChangingName").value = article.title;
        document.getElementById("info").textContent = article.author + "   ," + article.createdAt.toLocaleDateString() + ",   id:" + article.id;
        document.getElementById("ChangingShortDescription").value = article.summary;
        document.getElementById("ChangingArticleText").value = article.content;
        document.getElementById("ChangingTags").value = tags;
    }

    return {
        ACArticle: ACArticle
    };

}());