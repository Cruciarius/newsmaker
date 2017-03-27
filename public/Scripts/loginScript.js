var loginService = (function () {
    document.addEventListener("DOMContentLoaded", guest);
    var user = localStorage.getItem("user") || null;

    var users = [
        {
            login: "vasya",
            password: "111111"
        },
        {
            login: "ira",
            password: "qwerty"
        }

    ];

    function log() {
        var login = loginName.value;
        var password = passwordName.value;
        console.log(login);
        console.log(password);
        for (var i = 0; i < users.length; i++) {
            if (users[i].login == login) {
                if (users[i].password = password) {
                    localStorage.setItem("user", login);
                    return true;
                }
                return false;
            }
        }
        return false;
    }

    function guest() {
        document.getElementsByTagName("header")[0].innerHTML = '<div class="user">\
            <img src="Images/logo.png" class="image-Logo">Welcome, guest!</div>\
            <button class="White-Button" id="log-in">Log In</button>';
        document.getElementById("log-in").addEventListener("click", handleClickLogIn);
    }

    return {
        log: log
    }

}());