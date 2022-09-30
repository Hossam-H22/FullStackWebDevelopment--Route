var productIdInput = document.getElementById('productIdInput');
var productNameInput = document.getElementById('productNameInput');
var productPriceInput = document.getElementById('productPriceInput');
var productCategoryInput = document.getElementById('productCategoryInput');
var productDescriptionInput = document.getElementById('productDescriptionInput');
var searchInput = document.getElementById('search');
var ProductsContainer = [];

getDataFromStorage();

// database
// var db = window.openDatabase("data.db", "1.0", "CRUD DataBase", 1000000);
// db.transaction(function(tx) {
//     tx.executeSql('SELECT * FROM crud', [], function (tx, resultado) {
//         var rows = resultado.rows;
//         var tr = '';
//         for(var i = 0; i < rows.length; i++){
//                 tr += (rows[i].name+' <br> ');                
//         }
//         console.log("in data base"); 
//         console.log(tr); 

//     }, null);
// });


function addOrUpdate(){
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
    var regexText = /^[A-Za-z]{3,500}$/;
    var regexPrice = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;
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