"use strict";

var pagination = (function () {
    var TOTAL;
    var PER_PAGE = 10;
    var CURRENT_PAGE = 1;
    var SHOW_MORE_BUTTON;
    var SHOW_MORE_CALLBACK;

    function init(total, showMoreCb) {
        TOTAL = total;
        SHOW_MORE_CALLBACK = showMoreCb;
        SHOW_MORE_BUTTON = document.getElementById("show-10-news");
        SHOW_MORE_BUTTON.addEventListener('click', handleShowMoreClick);

        if (getTotalPages() <= CURRENT_PAGE) {
            hideShowMoreButton();
        }

        return getParams();
    }

    function handleShowMoreClick() {
        var paginationParams = nextPage();
        SHOW_MORE_CALLBACK(paginationParams.skip, paginationParams.top, articleService.filterConfig);
    }

    function getTotalPages() {
        return Math.ceil(TOTAL / PER_PAGE);
    }

    function nextPage() {
        CURRENT_PAGE++;
        if (getTotalPages() <= CURRENT_PAGE) {
            hideShowMoreButton();
        }

        return getParams();
    }

    function getParams() {
        return {
            top: PER_PAGE,
            skip: (CURRENT_PAGE - 1) * PER_PAGE
        };
    }

    function hideShowMoreButton() {
        SHOW_MORE_BUTTON.hidden = true;
    }

    return {
        init: init
    }
}());
var searchButton = document.getElementById("search-button");
var showNewsButton = document.getElementById("show-10-news");
var showArticle = document.querySelector(".News");
var toMain = document.getElementById("to-main");
var changeArticle = document.getElementById("changeArticle");

function handleClickShowMore(){
    articleService.filterConfig.author = author.value;
    if(fromDate.value && toDate.value){
        articleService.filterConfig.createdAfter = new Date(fromDate.value);
        articleService.filterConfig.createdBefore = new Date(toDate.value);
    }
    var total = articleService.getArticlesLength(articleService.filterConfig);
    var paginationParams = pagination.init(total, domService.getArticles);
    console.log(total);
    domService.getArticles(paginationParams.skip, paginationParams.top, articleService.filterConfig);
}

function goToArticlePage(event){
    if (event.target.className !== "Name") {
        return;
    }
    var id = event.target.parentElement.getElementsByTagName("span")[0].textContent;
    location.href="article.html";
    localStorage.setItem("id",id);
}

function goToMain() {
    location.href = "index.html";
}

function handleChangeArticle() {
    location.href = "ACarticle.html";
    localStorage.setItem("changingArticle", articleService.getArticle(localStorage.getItem("id")));
}

function handleClickLogIn() {
    location.href="autorisation.html";
}

function handleAddNews() {
    location.href="ACarticle.html";
}
if(showNewsButton){
    showNewsButton.addEventListener("click", handleClickShowMore);
}
if(searchButton){
    searchButton.addEventListener("click", handleClickShowMore);
}
if(toMain){
    toMain.addEventListener("click", goToMain);
}
if(showArticle){
    showArticle.addEventListener("click", goToArticlePage);
}
if(changeArticle){
    changeArticle.addEventListener("click", handleChangeArticle);
}