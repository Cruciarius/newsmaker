"use strict";

let pagination = (function () {
    var TOTAL;
    var PER_PAGE = 10;
    var CURRENT_PAGE = 1;
    var SHOW_MORE_BUTTON;

    function init(total){
        TOTAL = total;
        SHOW_MORE_BUTTON = document.getElementById("show-10-news");
        SHOW_MORE_BUTTON.addEventListener("click", handleShowMoreClick);
        if (getTotalPages() <= CURRENT_PAGE) {
            hideShowMoreButton();
        }
        return getParams();
    }

    function handleShowMoreClick() {
        var paginationParams = nextPage();
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
    };
}());
let searchButton = document.getElementById("search-button");
let showNewsButton = document.getElementById("show-10-news");
let showArticle = document.querySelector(".News");
let toMain = document.getElementById("to-main");
let changeArticle = document.getElementById("changeArticle");
let apply = document.getElementById("apply");
let remove = document.getElementById("removeArticle");
let log = document.getElementById("authorisation");
let filterConfig = {
    author: undefined,
    createdAfter: undefined,
    createdBefore: undefined,
    tags: undefined
};
let id;

function handleClickShowMore() {
    filterConfig.author = author.value || undefined;
    if (fromDate.value && toDate.value) {
        filterConfig.createdAfter = new Date(fromDate.value);
        filterConfig.createdBefore = new Date(toDate.value);
    }
    else {
        filterConfig.createdAfter = undefined;
        filterConfig.createdBefore = undefined;
    }
    if (select.value) {
        let options = [].slice.call(select.options);
        filterConfig.tags = options
            .filter(function (option) {
                return option.selected;
            })
            .map(function (option) {
                return option.value;
            })
            .join(", ");
        select.value = undefined;
    }
    else {
        filterConfig.tags = undefined;
    }
    let p = new Promise(function (resolve,reject) {
        let oReq = request.createGetRequest("/articles");
        oReq.onload = function () {
            resolve(oReq.responseText);
        }
    });
    p.then(function (resolve) {
        let total = JSON.parse(resolve).length;
        let paginationParams = pagination.init(total);
        let string = request.createArticlesString(filterConfig,paginationParams);
        domService.getArticles(string);
    });
}


function goToArticlePage(event) {
    if (event.target.className !== "Name") {
        return;
    }
    id = event.target.parentElement.getElementsByTagName("span")[0].textContent;
    location.href = "article.html?id="+id;
}

function handleChangeArticle() {
    let p = new Promise(function (resolve,reject) {
    let oReq = request.createGetRequest("/id");
    oReq.onload = function () {
        resolve(oReq.responseText);
    }});
    p.then(function (resolve) {
        id = JSON.parse(resolve);
        location.href = "ACarticle.html?id=" + id;
    });
}

function handleApply() {
    ACDomService.ACArticle();
    let p = new Promise(function (resolve,reject) {
        let oReq = request.createGetRequest("/id");
        oReq.onload = function () {
            resolve(oReq.responseText);
        }});
    p.then(function (resolve) {
        id = JSON.parse(resolve);
        location.href = "article.html?id=" + id;
    });
}

function handleRemove() {
    let p = new Promise(function (resolve,reject) {
        let oReq = request.createGetRequest("/id");
        oReq.onload = function () {
            resolve(oReq.responseText);
        }});
    p.then(function (resolve) {
        id = JSON.parse(resolve);
        articleService.removeArticle(id);
        location.href = "index.html";
    });
}
function goToMain() {
    location.href = "index.html";
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