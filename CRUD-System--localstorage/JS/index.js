var productIdInput = document.getElementById('productIdInput');
var productNameInput = document.getElementById('productNameInput');
var productPriceInput = document.getElementById('productPriceInput');
var productCategoryInput = document.getElementById('productCategoryInput');
var productDescriptionInput = document.getElementById('productDescriptionInput');
var searchInput = document.getElementById('search');
var errorList = document.querySelector('.Error');
var ProductsContainer = [];
var regexPrice = new RegExp(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/);
var Errors = [];

getDataFromStorage();



function addOrUpdate(){ 
    if (!checkValidateInput()) return;

    if (document.getElementById('product-btn').innerHTML == "Add Product") addProduct();
    else addExistingProduct();
        
    document.getElementById('product-btn').innerHTML = "Add Product";
}






function setDataInStorage(){
    localStorage.setItem('Products', JSON.stringify(ProductsContainer));
}
function getDataFromStorage(){
    if (localStorage.getItem('Products') != null){
        ProductsContainer = JSON.parse(localStorage.getItem('Products'));
        displayProducts();
    }
}




function clearForm(){
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
}




function displayProducts(){
    var cartoona = ``;
    for(var i=0 ; i<ProductsContainer.length ; i++){
        cartoona += `<tr>
        <td>${i}</td>
        <td>${ProductsContainer[i].name}</td>
        <td>${ProductsContainer[i].price}</td>
        <td>${ProductsContainer[i].category}</td>
        <td>${ProductsContainer[i].description}</td>
        <td><button class="btn btn-sm btn-danger" onclick="deletaProduct(${i})">Delete</button></td>
        <td><button class="btn btn-sm btn-warning" onclick="updateProduct(${i})">Update</button></td>
        </tr>`;
    }
    document.getElementById('tableBody').innerHTML = cartoona;
}





function checkValidateInput()
{
    var done = true;
    if (productNameInput.value == "") {
        Errors.push("Empty Name");
        done = false;
    }

    if (productPriceInput.value == "") {
        Errors.push("Empty Price");
        done = false;
    } 
    else if (productPriceInput.value.search(regexPrice)) {
        Errors.push("Invalid Price");
        done = false;
    }

    if (productCategoryInput.value == "") {
        Errors.push("Empty Category");
        done = false;
    }
    
    if (productDescriptionInput.value == "") {
        Errors.push("Empty Description");
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



function addProduct(){

    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value
    }

    ProductsContainer.push(product);
    clearForm();
    setDataInStorage();
    displayProducts();
}





function deletaProduct(deletedIndex){
    ProductsContainer.splice(deletedIndex, 1);
    setDataInStorage();
    displayProducts();
}








function updateProduct(updatedIndex){
    productIdInput.value = updatedIndex;
    productNameInput.value = ProductsContainer[updatedIndex].name;
    productPriceInput.value = ProductsContainer[updatedIndex].price;
    productCategoryInput.value = ProductsContainer[updatedIndex].category;
    productDescriptionInput.value = ProductsContainer[updatedIndex].description;

    document.getElementById('product-btn').innerHTML = "Update";
}


function addExistingProduct(){
    var i = productIdInput.value;
    console.log(i);
    ProductsContainer[i].name = productNameInput.value;
    ProductsContainer[i].price = productPriceInput.value;
    ProductsContainer[i].category = productCategoryInput.value;
    ProductsContainer[i].description = productDescriptionInput.value;

    clearForm();
    setDataInStorage();
    displayProducts();
}







function searchProduct(){
    var cartoona = ``;
    var name;
    var term = searchInput.value;
    for(var i=0 ; i<ProductsContainer.length ; i++){
        if(ProductsContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            if (term.length > 0) name = (ProductsContainer[i].name.toLowerCase()).replace(term.toLowerCase(), `<mark>${term.toLowerCase()}</mark>`);
            else name = ProductsContainer[i].name;

            cartoona += `<tr>
            <td>${i}</td>
            <td>${name}</td>
            <td>${ProductsContainer[i].price}</td>
            <td>${ProductsContainer[i].category}</td>
            <td>${ProductsContainer[i].description}</td>
            <td><button class="btn btn-sm btn-danger" onclick="deletaProduct(${i})">Delete</button></td>
            <td><button class="btn btn-sm btn-warning" onclick="updateProduct(${i})">Update</button></td>
            </tr>`;
        }
    }
    document.getElementById('tableBody').innerHTML = cartoona;
}