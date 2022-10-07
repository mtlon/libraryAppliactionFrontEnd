document.addEventListener('DOMContentLoaded', function () {
    var xhr = new XMLHttpRequest();
  
    xhr.open("GET", 'http://localhost:8080/api/books', true);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var books = JSON.parse(this.response);

            books.forEach(book => {
                appendToBookList(book);
            });
        } else if (this.status != 200) {
            var errorMsg = "Something went wrong... Please try again"

            document.getElementById('error-message').innerHTML = errorMsg;
        }
    }

    xhr.send();

    $("#datepicker").datepicker({
        format: "yyyy",
        viewMode: "years", 
        minViewMode: "years",
        autoclose: true
    }); 
});

function searchTitle() {
    clearBookList();
    var searchTerm = document.getElementById("title").value.toLowerCase();

    var xhr = new XMLHttpRequest();
  
    xhr.open("GET", 'http://localhost:8080/api/books', true);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var books = JSON.parse(this.response);

            books.forEach(book => {
                if (book.title.toLowerCase() == searchTerm) {
                    appendToBookList(book);
                }
            });
        } else if (this.status != 200) {
            var errorMsg = "Something went wrong... Please try again"

            document.getElementById('error-message').innerHTML = errorMsg;
        }
    }

    xhr.send();
}

function searchAuthor() {
    clearBookList();
    var searchTerm = document.getElementById("author").value.toLowerCase();

    var xhr = new XMLHttpRequest();
  
    xhr.open("GET", 'http://localhost:8080/api/books', true);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var books = JSON.parse(this.response);

            books.forEach(book => {
                var authorFullName = (book.authorName + " " + book.authorSurname).toLowerCase();
            
                if (book.authorName.toLowerCase() == searchTerm || book.authorSurname.toLowerCase() == searchTerm || authorFullName == searchTerm) {
                    appendToBookList(book);
                }
            });
        } else if (this.status != 200) {
            var errorMsg = "Something went wrong... Please try again"

            document.getElementById('error-message').innerHTML = errorMsg;
        }
    }

    xhr.send();
}

function searchYear() {
    clearBookList();
    var searchTerm = document.getElementById("datepicker").value;

    var xhr = new XMLHttpRequest();
  
    xhr.open("GET", 'http://localhost:8080/api/books', true);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var books = JSON.parse(this.response);

            books.forEach(book => {
                if (book.releaseYear == searchTerm) {
                    appendToBookList(book);
                }
            });
        } else if (this.status != 200) {
            var errorMsg = "Something went wrong... Please try again"

            document.getElementById('error-message').innerHTML = errorMsg;
        }
    }

    xhr.send();
}

function appendToBookList(book) {
    var html = "<li>";

    if (book.isBorrowed != 0) {
        html = "<li class='borrowed'>";
    }
    
    html += "<h2>" + book.title + "</h2>";
    html += "<h4>Author: " + book.authorName + " " + book.authorSurname + "</h4>";
    html += "<h4>Release year: " + book.releaseYear + "</h4>";

    if (book.isBorrowed != 0) {
        html += "<button class='btn-inactive'>Borrowed</button>";
    } else {
        html += "<button id='book-" + book.id + "' onclick='borrowBook(this)'>Borrow</button>";
    }

    document.getElementById('book-list').innerHTML += html;
}

function borrowBook(element) {
    var xhr = new XMLHttpRequest();
    var bookId = element.id.substring(element.id.indexOf('-') + 1);
  
    xhr.open("PATCH", "http://localhost:8080/api/books/" + bookId, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $(element).addClass('btn-inactive');
            $(element).text('Borrowed');
            $(element).parent().addClass('borrowed');
        } else if (this.status != 200) {
            alert("An error occurred during borrow");
        }
    }

    var bookData = {
        "isBorrowed": 1
    }

    xhr.send(JSON.stringify(bookData));
}

function clearBookList() {
    document.getElementById('book-list').innerHTML = '';
}

function goToHome() {
    window.location.href = "http://localhost:5500";
}

function showAllBooks() {
    window.location.reload();
}