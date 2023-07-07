let Search = document.getElementById("searchInput");
let searchResultEl = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppend(result) {
    let {
        title,
        link,
        description
    } = result;
    //1.result--div container
    let resultEle = document.createElement("div");
    resultEle.classList.add("result-item");
    searchResultEl.appendChild(resultEle);

    //2.Title--anchor
    let resulttitle = document.createElement("a");
    resulttitle.classList.add('result-title');
    resulttitle.textContent = title;
    resulttitle.href = link;
    resulttitle.target = "_blank";
    resultEle.appendChild(resulttitle);
    //3.Title-Break 
    let titleBreak = document.createElement("br");
    resultEle.appendChild(titleBreak);
    //4.url --href
    let URLEl = document.createElement('a');
    URLEl.classList.add("result-url");
    URLEl.href = link;
    URLEl.textContent = link;
    URLEl.target = "_blank";
    resultEle.appendChild(URLEl);

    //5.Line- Break 
    let lineBreak = document.createElement("br");
    resultEle.appendChild(lineBreak);

    //6. description--paragraph
    let descr = document.createElement("p");
    descr.classList.add("line-description");
    descr.textContent = description;
    resultEle.appendChild(descr);
}

function displayResult(searchResult) {
    spinner.classList.toggle('d-none');
    for (let result of searchResult) {
        createAndAppend(result);
    }
}

function wikipidea(event) {
    if (event.key === "Enter") {
        searchResultEl.textContent = "";
        spinner.classList.toggle('d-none');
        let searchInput = Search.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET",
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                let {
                    search_results
                } = data;
                displayResult(search_results);
            });
    }
}
Search.addEventListener("keydown", wikipidea);