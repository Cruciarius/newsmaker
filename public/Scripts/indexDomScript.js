"use strict";
let domService = (function () {

    document.addEventListener("DOMContentLoaded", startApp);
    let user;
    let tags = ["sports", "ecology", "politics", "cinema", "games", "animals", "people", "society"];

    function startApp() {
        let p = new Promise(function (resolve,reject) {
            let oReq = request.createGetRequest("/user");
            oReq.onload = function () {
                resolve(oReq.responseText);
            }
        });
        p.then(function (response) {
            user = JSON.parse(response);
            if (user != undefined) {
                document.getElementsByTagName("header")[0].innerHTML = "<div class=\"user\">\
 <img src=\"Images/logo.png\" class=\"image-Logo\">Welcome, " + user + "! </div>\
 <button class=\"White-Button \" style=\"margin-right: 3.5%\" id=\"add-news\">Add News</button>\
 <button class=\"White-Button\" id=\"log-out\">Log Out</button>";
                document.getElementById("log-out").addEventListener("click", guest);
                document.getElementById("add-news").addEventListener("click", handleAddNews);
            }
            else guest();
            createTagsList();
            handleClickShowMore();
        })
    }

    function guest() {
        let p = new Promise(function (resolve,reject) {
            let oReq = request.createDeleteRequest("/user");
            oReq.onload = function () {
                resolve(oReq.responseText);
            }
        });
        p.then(function (response) {
        });
        document.getElementsByTagName("header")[0].innerHTML = "<div class=\"user\">\
        <img src=\"Images/logo.png\" class=\"image-Logo\">Welcome, guest!</div>\
        <button class=\"White-Button\" id=\"log-in\">Log In</button>";
        document.getElementById("log-in").addEventListener("click", handleClickLogIn);
    }

    function getArticles(string) {
        string = string || "/articles?skip=0&top=10";
        clearPage();
        let p = new Promise(function (resolve,reject) {
            let oReq = request.createGetRequest(string);
            oReq.onload = function () {
                        resolve(oReq.responseText);
            }
        });
        p.then(function (response) {
            let articles = JSON.parse(response, articleService.parseDate).articles;
            for (let i = 0; i < articles.length; i++) {
                let message = createMessage(articles[i]);
                document.getElementById("News").appendChild(message);
            }
        });
    }

    function createMessage(article) {
        let container = document.createElement("div");
        let tags = "";
        for (let i = 0; i < article.tags.length; i++) {
            //tags += "<a href=\"articles?tags=" + article.tags[i] + "\" class=\"Tag\">'";
            tags += "<a href=\"articles?tags=" + article.tags[i] + "\" class=\"Tag\">'";
            tags += article.tags[i];
            tags += "'</a>  ";
        }
        container.innerHTML =
            "<div class=\"News-Box\">\
            <div class=\"Text-Box\">\
            <div class=\"Name\">" + article.title + "</div>\
 <span hidden=\"true\">" + article.id + "</span>\
 <div class=\"Small-Text\"><span>" + article.author + ",  </span><span>" + article.createdAt.toLocaleDateString() + "</span></div>\
 <div class=\"Regular-Text\">" + article.summary + "</div>\
 <div class=\"Tags\">" + tags + "</div></div>\
 <img src=\"Images/05453.gif\" class=\"image\"></div>";
        return container.firstChild;
    }

    function clearPage() {
        document.getElementById("News").innerHTML = "";
    }

    function createTagsList() {
        let str = "<option value=''></option>";
        for (let i = 0; i < tags.length; i++) {
            str += "<option value='";
            str += tags[i];
            str += "'>";
            str += tags[i];
            str += "</option>";
        }
        document.getElementById("select").innerHTML = str;
    }

    return {
        getArticles: getArticles,
    };
}());
