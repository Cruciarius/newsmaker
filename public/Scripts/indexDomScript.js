"use strict";
var domService = (function () {

    document.addEventListener("DOMContentLoaded", startApp);
    var user = localStorage.getItem("user") || null;

    function startApp() {
        if (user != null) {
            document.getElementsByTagName("header")[0].innerHTML = '<div class="user">\
 <img src="Images/logo.png" class="image-Logo">Welcome, ' + user + '! </div>\
 <button class="White-Button " style="margin-right: 3.5%" id="add-news">Add News</button>\
 <button class="White-Button" id="log-out">Log Out</button>';
            document.getElementById("log-out").addEventListener("click", guest);
            document.getElementById("add-news").addEventListener("click", handleAddNews);
        }
        else guest();
        createTagsList();
        handleClickShowMore();
    }

    function guest() {
        document.getElementsByTagName("header")[0].innerHTML = '<div class="user">\
 <img src="Images/logo.png" class="image-Logo">Welcome, guest!</div>\
 <button class="White-Button" id="log-in">Log In</button>';
        document.getElementById("log-in").addEventListener("click", handleClickLogIn);
    }

    function createTagsList() {
        let str = "<option value=''></option>";
        let tags = JSON.parse(localStorage.getItem("allTags"));
        for (let i = 0; i < tags.length; i++) {
            str += "<option value='";
            str += tags[i];
            str += "'>";
            str += tags[i];
            str += "</option>";
        }
        document.getElementById("select").innerHTML = str;
    }

    function getArticles(string) {
        string = string || "/articles?skip=0&top=10";
        clearPage();
        let oReq = request.createGetRequest(string);
        oReq.onreadystatechange = function () {
             if (oReq.readyState == 4) {
                 if (oReq.status != 200) {
                     alert(oReq.status + ': ' + oReq.statusText);
                 }
                 else {
                     let articles = JSON.parse(oReq.responseText, articleService.parseDate).articles;
                     for (let i = 0; i < articles.length; i++) {
                         let message = createMessage(articles[i]);
                         document.getElementById("News").appendChild(message);
                     }
                 }
             }
         }
    }

    function removeArticle(id) {
        if (articleService.removeArticle(id)) {
            let i = containsArticle(id);
            if (i) {
                let items = document.getElementsByClassName("News-Box");
                document.getElementById("News").removeChild(items[i - 1]);
            }
        }
    }
    function removeTag(tag) {
        if (articleService.removeTag(tag)) {
            let str = "<a href=\"tag\" class=\"Tag\">'";
            str += tag;
            str += "'</a>";
            let items = document.getElementsByClassName("News-Box");
            for (let i = 0; i < items.length; i++) {
                items[i].innerHTML = items[i].innerHTML.replace(str, "");
                document.getElementById("News").appendChild(items[i]);
            }
        }
    }

    function createMessage(article) {
        let container = document.createElement('div');
        let tags = "";
        for (let i = 0; i < article.tags.length; i++) {
            tags += "<a href=\"tag\" class=\"Tag\">'";
            tags += article.tags[i];
            tags += "'</a>  ";
        }
        container.innerHTML =
            '<div class="News-Box">\
            <div class="Text-Box">\
            <div class="Name">' + article.title + '</div>\
 <span hidden="true">' + article.id + '</span>\
 <div class="Small-Text"><span>' + article.author + ',  </span><span>' + article.createdAt.toLocaleDateString() + '</span></div>\
 <div class="Regular-Text">' + article.summary + '</div>\
 <div class="Tags">' + tags + '</div></div>\
 <img src="Images/05453.gif" class="image"></div>';
        return container.firstChild;
    }

    function containsArticle(id) {
        let items = document.getElementsByClassName("News-Box");
        for (let i = 0; i < items.length; i++) {
            let str = '<span hidden="true">';
            str += id;
            str += '</span>';
            if (items[i].innerHTML.indexOf(str) != -1) {
                return i + 1;
            }
        }
        return false;
    }

    function clearPage() {
        document.getElementById("News").innerHTML = '';
    }

    return {
        getArticles: getArticles,
        removeArticle: removeArticle,
        removeTag: removeTag
    }
}());
