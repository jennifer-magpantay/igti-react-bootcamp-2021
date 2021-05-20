// set here all http requests

// variables
const baseURL = "http://localhost:3000/";

// create a function by passing the fetch api to access the backend

// considering that a promisse is created just inside a fecth request, to get employee and role data to be displayed side by side, we should consider using a nested fetch request
// trying to keep the code clean, we could pass the requests into modules

// first, create a function that will return the response as json()
function returnFetchJson(url) {
    return fetch(url).then((response) => {
        return response.json();
    });
}

// this module returns the fetch for epmployess
function listEmployees() {
    return returnFetchJson(`${baseURL}employees`);
}

// this module returns the fetch for roles
function listRoles() {
    return returnFetchJson(`${baseURL}roles`);
}

// now, pass this function over the request

