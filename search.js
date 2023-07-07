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
                h2El.textContent = "Popular Books";
                h2El.classList.add("col-12");
                searchResultsEl.appendChild(h2El);
                let book = jsonData.search_results;
                for (let eachBook in book) {
                    let bookObject = book[eachBook];
                    displaySearchResult(bookObject);
                }
            });
    }

})