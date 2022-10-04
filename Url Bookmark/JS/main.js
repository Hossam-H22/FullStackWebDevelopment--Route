var nameInput = document.getElementById('name');
var urlInput = document.getElementById('url');
var errorList = document.querySelector('.Error');
var UrlContainer = [];
var Errors = [];
// var regexText = new RegExp(/^[A-Za-z]{3,500}$/);
var regexUrl = new RegExp(/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/);

getDataFromStorage();



function setDataInStorage() {
    localStorage.setItem('Url', JSON.stringify(UrlContainer));
}

function getDataFromStorage() {
    if (localStorage.getItem('Url') != null) {
        UrlContainer = JSON.parse(localStorage.getItem('Url'));
        displayUrl();
    }
}


function clearForm() {
    nameInput.value = "";
    urlInput.value = "";
}



function displayUrl() {
    var cartoona = ``;
    for (var i = 0; i < UrlContainer.length; i++) {
        cartoona += `
        <div class="col-2 p-2">
            <div class="bg-light shadow-sm text-center py-3 px-1">
                <h3 class="pb-3">${UrlContainer[i].name}</h3>
                <a href="${UrlContainer[i].url}" class="btn btn-sm btn-info" target="_blank">Vist</a>
                <div onclick="deletaProduct(${i})" class="btn btn-sm btn-danger">Delete</div>
            </div>
        </div>`;
    }
    document.getElementById('bookmark-content').innerHTML = cartoona;
}





function checkValidateInput() {
    var done = true;
    if (nameInput.value == "") {
        Errors.push("Empty Name");
        done = false;
        console.log(Errors[0]);
    }


    if (urlInput.value == "") {
        Errors.push("Empty Url");
        done = false;
    } else if (urlInput.value.search(regexUrl)) {
        Errors.push("Invalid Url");
        done = false;
    } else if (UrlContainer.find(({ url }) => url === urlInput.value)) {
        Errors.push("Url Is Exists");
        done = false;
    }

    showError();
    return done;
}

function showError() {
    var cartoona = ``;
    for (var i = 0; i < Errors.length; i++) {
        cartoona += `<li>${Errors[i]}</li>`
    }
    errorList.innerHTML = cartoona;
    Errors = [];
}

function http(url) {
    if (!url.search("http://") && !url.search("https://"))
        return "http://" + url;
    return url;
}

function addUrl() {
    var urlBookmark = {
        name: nameInput.value,
        url: http(urlInput.value)
    }
    if (!checkValidateInput()) return;

    errorList.innerHTML = '';
    UrlContainer.push(urlBookmark);
    clearForm();
    setDataInStorage();
    displayUrl();
}



function deletaProduct(deletedIndex) {
    UrlContainer.splice(deletedIndex, 1);
    setDataInStorage();
    displayUrl();
}