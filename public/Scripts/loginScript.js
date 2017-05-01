let loginService = (function () {
    document.addEventListener("DOMContentLoaded", guest);

    function guest() {
        document.getElementsByTagName("header")[0].innerHTML = "<div class=\"user\">\
            <img src=\"Images/logo.png\" class=\"image-Logo\">Welcome, guest!</div>\
            <button class=\"White-Button\" id=\"log-in\">Log In</button>";
        document.getElementById("log-in").addEventListener("click", handleClickLogIn);
    }
    
}());