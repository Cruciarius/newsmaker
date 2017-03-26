"use strict";

var ACDomService = (function () {
    document.addEventListener("DOMContentLoaded", startApp);
    var user = localStorage.getItem("user") || null;
    var change = false;

    function startApp() {
        if (user != "null") {
            document.getElementsByTagName("header")[0].innerHTML = '<div class="user">\
            <img src="Images/logo.png" class="image-Logo">Welcome, ' + user + '! </div>\
            <button class="White-Button " style="margin-right: 3.5%" id="add-news">Add News</button>\
            <button class="White-Button" id="log-out">Log Out</button>';
            document.getElementById("log-out").addEventListener("click", guest);
            document.getElementById("add-news").addEventListener("click",handleAddNews);
        }
        else guest();
        if(localStorage.getItem("changingArticle")){
            change = true;
            console.log(1);
            createMessage(articleService.getArticle(localStorage.getItem("changingArticle")));
        }
        else {
            change = false;
        }
    }

    function ACArticle(){
        var article = {
            id: undefined,
            author : undefined,
            createdAt : undefined,
            title: undefined,
            summary: undefined,
            content: undefined,
            tags: undefined
        };
        article.title = ChangingName.value;
        article.summary = ChangingShortDescription.value;
        article.content = ChangingArticleText.value;
        article.tags = ChangingTags.value.split(",");
        if(change){
            localStorage.setItem("articleTemp", JSON.stringify(article));
            articleService.editArticle(localStorage.getItem("changingArticle"));
            localStorage.setItem("id", JSON.parse((localStorage.getItem("changingArticle")), articleService.parseDate));
        }
        else{
            article.author = user;
            article.createdAt = new Date();
            localStorage.setItem("articleTemp", JSON.stringify(article));
            localStorage.setItem("id", localStorage.getItem("size"));
            articleService.addArticle();
        }
    }

    function guest() {
        document.getElementsByTagName("header")[0].innerHTML = '<div class="user">\
            <img src="Images/logo.png" class="image-Logo">Welcome, guest!</div>\
            <button class="White-Button" id="log-in">Log In</button>';
        document.getElementById("log-in").addEventListener("click", handleClickLogIn);
    }

    function createMessage(article) {
        var tags = "";
        for (var i = 0; i < article.tags.length; i++) {
            tags += article.tags[i];
            tags += ", ";
        }
        document.getElementById("ChangingName").value = article.title;
        document.getElementById("info").textContent = article.author + "   ," + article.createdAt.toLocaleDateString() + ",   id:" + article.id;
        document.getElementById("ChangingShortDescription").value = article.summary;
        document.getElementById("ChangingArticleText").value = article.content;
        document.getElementById("ChangingTags").value = tags;
    }

    return{
        ACArticle:ACArticle
    }

}());