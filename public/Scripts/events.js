"use strict";

var pagination = (function () {
    var TOTAL;
    var PER_PAGE = 10;
    var CURRENT_PAGE = 1;
    var SHOW_MORE_BUTTON;
    var SHOW_MORE_CALLBACK;
    var isFirst = true;

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
        init: init,
        isFirst: isFirst
    }
}());
var searchButton = document.getElementById("search-button");
var showNewsButton = document.getElementById("show-10-news");
var showArticle = document.querySelector(".News");
var toMain = document.getElementById("to-main");
var changeArticle = document.getElementById("changeArticle");
var apply = document.getElementById("apply");
var remove = document.getElementById("removeArticle");
var log = document.getElementById("authorisation");

function handleClickShowMore() {
    articleService.filterConfig.author = author.value;
    if (fromDate.value && toDate.value) {
        articleService.filterConfig.createdAfter = new Date(fromDate.value);
        articleService.filterConfig.createdBefore = new Date(toDate.value);
    }
    if (select.value) {
        let options = [].slice.call(select.options);
        articleService.filterConfig.tags = options
            .filter(function (option) {
                return option.selected;
            })
            .map(function (option) {
                return option.value;
            })
            .join(', ');
        select.value = undefined;
    }
    else {
        articleService.filterConfig.author = undefined;
        articleService.filterConfig.createdAfter = undefined;
        articleService.filterConfig.createdBefore = undefined;
        articleService.filterConfig.tags = undefined;
    }
    articleService.countArticles(articleService.filterConfig);
        let oReq = new XMLHttpRequest();
        oReq.open("GET", "/length");
        oReq.setRequestHeader("Access-Control-Allow-Origin", "*");
        oReq.send();
        oReq.onreadystatechange = function () {
            if (oReq.readyState == 4) {
                let total = JSON.parse(oReq.responseText);
                let paginationParams = pagination.init(total.value, domService.getArticles);
                domService.getArticles(paginationParams.skip, paginationParams.top, articleService.filterConfig);
            }
        };
}

function goToArticlePage(event) {
    if (event.target.className !== "Name") {
        return;
    }
    var id = event.target.parentElement.getElementsByTagName("span")[0].textContent;
    location.href = "article.html";
    localStorage.setItem("id", id);
}
function handleApply() {
    ACDomService.ACArticle();
    localStorage.removeItem("changingArticle");
    location.href = "article.html";
}

function handleRemove() {
    localStorage.setItem("deleted", localStorage.getItem("id"));
    articleService.removeArticle(localStorage.getItem("deleted"));
    location.href = "index.html";
}
function login() {
    if (loginService.log()) {
        location.href = "index.html";
    }
    else {
        console.log(1);
        loginName.value = "WRONG USER";
    }
}
function goToMain() {
    location.href = "index.html";
}

function handleChangeArticle() {
    localStorage.setItem("changingArticle", localStorage.getItem("id"));
    location.href = "ACarticle.html";
}


function handleClickLogIn() {
    location.href = "autorisation.html";
}

function handleAddNews() {
    location.href = "ACarticle.html";
}
if (showNewsButton) {
    showNewsButton.addEventListener("click", handleClickShowMore);
}
if (searchButton) {
    searchButton.addEventListener("click", handleClickShowMore);
}
if (toMain) {
    toMain.addEventListener("click", goToMain);
}
if (showArticle) {
    showArticle.addEventListener("click", goToArticlePage);
}
if (changeArticle) {
    changeArticle.addEventListener("click", handleChangeArticle);
}
if (apply) {
    apply.addEventListener("click", handleApply);
}
if (remove) {
    remove.addEventListener("click", handleRemove);
}
if (log) {
    log.addEventListener("click", login);
}