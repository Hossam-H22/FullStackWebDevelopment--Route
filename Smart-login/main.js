var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
var message = document.getElementById('message');
var userName;
var usersArray = [];
var baseURL = '';
var curruntPage = '';


// Url Configuration
var pathparts = location.pathname.split('/');
for (var i = 0; i < pathparts.length - 1; i++) baseURL += '/' + pathparts[i];
curruntPage = "/"+pathparts[pathparts.length - 1];
if (location.hostname != '') baseURL = 'https://' + location.hostname;
// console.log(baseURL);


// Get Data From Local Storage
if (localStorage.getItem('users') != null) {
    usersArray = JSON.parse(localStorage.getItem('users'));
    userName = localStorage.getItem('User');
}


// Check Home Page
if (curruntPage == "/home.html"){
    if (userName == null) window.location.href = baseURL + '/index.html';
    else document.getElementById('username').innerHTML = "Welcome " + userName;
}









// Validation Functions For Signup
function isEmpty() {
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return true;
    } else {
        return false;
    }
}
function isEmailExist() {
    for (var i = 0; i < usersArray.length; i++) {
        if (usersArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function signUp() {
    if (isEmpty()) {
        message.innerHTML = '<span class="text-danger m-3">All inputs is required</span>';
        return;
    }
    else if (isEmailExist()) {
        message.innerHTML = '<span class="text-danger m-3">Email already exists</span>';
        return;
    } 

    var User = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    usersArray.push(User);
    localStorage.setItem('users', JSON.stringify(usersArray));
    message.innerHTML = '<span class="text-success m-3">Success</span>';
}





// Validation Functions For Login
function isLoginEmpty() {
    if (signinPassword.value == "" || signinEmail.value == "") return true;
    else return false;
}

function login() {
    if (isLoginEmpty()) {
        message.innerHTML = '<span class="text-danger m-3">All inputs is required</span>';
        return;
    }

    for (var i = 0; i < usersArray.length; i++) {
        if (usersArray[i].email.toLowerCase() == signinEmail.value.toLowerCase() && usersArray[i].password == signinPassword.value) {
            localStorage.setItem('User', usersArray[i].name);
            window.location.href = baseURL + '/home.html';
        } 
        else message.innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>';
    }
}






function logout() {
    localStorage.removeItem('User');
}