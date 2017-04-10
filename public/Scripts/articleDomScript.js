

var articleDomService = (function () {

    document.addEventListener("DOMContentLoaded", startApp);

    let id = window.id;
    var user = localStorage.getItem("user") || null;

    function startApp() {
        if (user != null) {
            document.getElementsByTagName("header")[0].innerHTML = '<div class="user">\
            <img src="Images/logo.png" class="image-Logo">Welcome, ' + user + '! </div>\
            <button class="White-Button " style="margin-right: 3.5%" id="add-news">Add News</button>\
            <button class="White-Button" id="log-out">Log Out</button>';
            document.getElementsByClassName("Wide-Space")[0].innerHTML = '<button class="Grey-Button"  id="changeArticle">Change article</button>\
            <button class="Grey-Button" id="to-main">To main page</button>\
            <button class="Grey-Button" id="removeArticle">Remove article</button>';
            document.getElementById("log-out").addEventListener("click", guest);
            document.getElementById("add-news").addEventListener("click",handleAddNews);
            document.getElementById("changeArticle").addEventListener("click", handleChangeArticle);
            document.getElementById("to-main").addEventListener("click", goToMain);
            document.getElementById("removeArticle").addEventListener("click", handleRemove);
        }
        else guest();
        let oReq = request.createGetRequest("/articles/:"+id);
        oReq.onreadystatechange=function(){
            let article = JSON.parse(oReq.responseText,articleService.parseDate);
            showArticle(article);
        }
    }

    function guest() {
        document.getElementsByTagName("header")[0].innerHTML = '<div class="user">\
            <img src="Images/logo.png" class="image-Logo">Welcome, guest!</div>\
            <button class="White-Button" id="log-in">Log In</button>';
        document.getElementById("log-in").addEventListener("click", handleClickLogIn);
        document.getElementsByClassName("Wide-Space")[0].innerHTML = '<button class="Grey-Button" id="to-main">To main page</button>';
        document.getElementById("to-main").addEventListener("click", goToMain);
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
            <h2>'+ article.title +'</h2>\
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