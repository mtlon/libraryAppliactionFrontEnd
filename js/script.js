function goToLibrary() {
    window.location.href = "http://localhost:5500/library.html";
}

function loginHandler() {
    var xhr = new XMLHttpRequest();
  
    xhr.open("POST", 'http://localhost:8080/api/user/auth', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            goToLibrary();
            
            return false;
        } else if (this.status == 403) {
            var errorMsg = "Invalid username or password"

            document.getElementById('error-message').innerHTML = errorMsg;
        } else if (this.status != 403 && this.status != 200) {
            var errorMsg = "Something went wrong... Please try again"

            document.getElementById('error-message').innerHTML = errorMsg;
        }
    }

    var typedUsername = document.getElementById("username").value;
    var typedPassword = document.getElementById("password").value;

    var userData = {
        "username": typedUsername,
        "password": typedPassword
    }

    xhr.send(JSON.stringify(userData));

    return false;
}
