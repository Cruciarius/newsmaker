var articleDomService = (function () {
    document.addEventListener("DOMContentLoaded", startApp);
    var id = localStorage.getItem("id");
    var user = localStorage.getItem("user") || null;

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
        showArticle(articleService.getArticle(id.toString()));
    }

    function guest() {
        document.getElementsByTagName("header")[0].innerHTML = '<div class="user">\
            <img src="Images/logo.png" class="image-Logo">Welcome, guest!</div>\
            <button class="White-Button" id="log-in">Log In</button>';
        document.getElementById("log-in").addEventListener("click", handleClickLogIn);
    }

    function showArticle(article){
        var message = createMessage(article);
        document.getElementsByClassName("Big-Block")[0].insertBefore(message,document.getElementsByTagName("span")[0]);
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
            '<div class="article" id=article">\
            <h1>'+ article.title +'</h1>\
        <span hidden="true">' + article.id + '</span>\
        <div class="Small-Text"><span>' + article.author + ',  </span><span>' + article.createdAt.toLocaleDateString() + '</span></div>\
        <img src="Images/05453.gif" class="image">\
        <div class="Regular-Text">' + article.content + '</div>\
        <div class="Tags">' + tags + '</div></div>';
        return container.firstChild;
    }

    return {
        showArticle:showArticle
    }
}());