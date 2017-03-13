document.addEventListener("DOMContentLoaded", startApp);

var user = "null";

function startApp() {
    if (user != "null") {
        document.getElementsByTagName("header")[0].innerHTML = '<div class="user">\
            <img src="Images/logo.png" class="image-Logo">Welcome, ' + user + '! </div>\
            <button class="White-Button " style="margin-right: 3.5%">Add News</button>\
        <button class="White-Button">Log Out</button>'
    }
    else {
        document.getElementsByTagName("header")[0].innerHTML = '<div class="user">\
            <img src="Images/logo.png" class="image-Logo">Welcome, guest!</div>\
        <button class="White-Button">Log In</button>'
    }
}

function getArticles(skip, top, fw) {
    clearPage();
    var articles = articleService.getArticles(skip, top, fw);
    for (var i = 0; i < articles.length; i++) {
        var message = createMessage(articles[i]);
        document.getElementById("News").appendChild(message);
    }
}

function removeArticle(id) {
    if (articleService.removeArticle(id)) {
        var i = containsArticle(id);
        if (i) {
            var items = document.getElementsByClassName("News-Box");
            document.getElementById("News").removeChild(items[i - 1]);
        }
    }
}

function addArticle(article) {
    if (articleService.addArticle(article)) {
        var message = createMessage(article);
        document.getElementById("News").appendChild(message);
    }
}
function editArticle(id, article) {
    if (articleService.editArticle(id, article)) {
        var i = containsArticle(id);
        if (i) {
            var NewMessage = createMessage(articleService.getArticle(id));
            var items = document.getElementsByClassName("News-Box");
            document.getElementById("News").replaceChild(NewMessage, items[i - 1]);
        }
    }
}

function removeTag(tag) {
    if (articleService.removeTag(tag)) {
        var str = "<a href=\"tag\" class=\"Tag\">'";
        str += tag;
        str += "'</a>";
        var items = document.getElementsByClassName("News-Box");
        for (var i = 0; i < items.length; i++) {
            items[i].innerHTML = items[i].innerHTML.replace(str, "");
            document.getElementById("News").appendChild(items[i]);
        }
    }
}
function createMessage(article) {
    var container = document.createElement('div');
    var tags = "";
    for (var i = 0; i < article.tags.length; i++) {
        tags += "<a href=\"tag\" class=\"Tag\">'";
        tags += article.tags[i];
        tags += "'</a>  ";
    }
    container.innerHTML =
        '<div class="News-Box">\
        <div class="Text-Box">\
        <a href="index.html" class="Name">' + article.title + '</a>\
        <span hidden="true">' + article.id + '</span>\
        <div class="Small-Text"><span>' + article.author + ',  </span><span>' + article.createdAt.toLocaleDateString() + '</span></div>\
        <div class="Regular-Text">' + article.summary + '</div>\
        <div class="Tags">' + tags + '</div></div>\
        <img src="Images/05453.gif" class="image"></div>';
    return container.firstChild;
}

function containsArticle(id) {
    var items = document.getElementsByClassName("News-Box");
    for (var i = 0; i < items.length; i++) {
        var str = '<span hidden="true">';
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