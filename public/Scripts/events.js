"use strict";

var searchButton = document.getElementById("search-button");
var showNewsButton = document.getElementById("show-10-news");

function handleClickShowTen() {
    pagination();
}

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
        SHOW_MORE_CALLBACK(paginationParams.skip, paginationParams.top);
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

function handleClickSearch(){
    articleService.filterConfig.author = author.value;
    articleService.filterConfig.createdAfter = new Date(fromDate.value);
    articleService.filterConfig.createdBefore = new Date(toDate.value);
    domService.getArticles(0,10,articleService.filterConfig);
}

function handleClickLogIn() {
    location.href="autorisation.html";
}

function handleAddNews() {
    location.href="Add_Change article.html";
}

showNewsButton.addEventListener("click", handleClickShowTen);
searchButton.addEventListener("click", handleClickSearch);