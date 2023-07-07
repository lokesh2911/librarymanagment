searchForm=document.querySelector('.SearchBar')

document.querySelector('#searchBtn').onclick=()=>{
    searchForm.classList.toggle('active');
     
}

window.onscroll=()=>{
    searchForm.classList.remove('active');
     
    if(window.scrollY >80){
        document.querySelector('.header .header-2').classList.add('active');
    }else{
        document.querySelector('.header .header-2').classList.remove('active');
    }
}

window.onload=()=>{
    if(window.scrollY >80){
        document.querySelector('.header .header-2').classList.add('active');
    }else{
        document.querySelector('.header .header-2').classList.remove('active');
    }
} 




let loginForm=document.querySelector('.login-form-container')
document.querySelector('#LoginBtn').onclick=()=>{
    loginForm.classList.toggle('active');
}

let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");
let url = "https://apis.ccbp.in/book-store?title=";

function displaySearchResult(eachBook) {
    spinner.classList.add("d-none");
    let {
        author,
        imageLink
    } = eachBook;
    let divContainer = document.createElement("div");
    divContainer.id = "setOfBook";
    searchResultsEl.appendChild(divContainer);
    let imgEl = document.createElement("img");
    imgEl.src = imageLink;
    imgEl.classList.add("w-25");
    imgEl.classList.add('result-image');
    divContainer.appendChild(imgEl);
    let authorName = document.createElement("p");
    authorName.textContent = author;
    divContainer.appendChild(authorName);

}

searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        url = url + searchInputEl.value;
        let options = {
            method: "GET",
        };
        spinner.classList.remove("d-none");
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let h2El = document.createElement("h2");

                searchResultsEl.appendChild(h2El);
                let book = jsonData.search_results;
                for (let eachBook in book) {
                    let bookObject = book[eachBook];
                    displaySearchResult(bookObject);
                }
            });
    }

})