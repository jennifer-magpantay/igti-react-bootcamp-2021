// set here all http requests

// variables
const baseURL = "http://localhost:3000";

// create a function by passing the fetch api to access the backend

// considering that a promisse is created just inside a fecth request, to get employee and role data to be displayed side by side, we should consider using a nested fetch request
// trying to keep the code clean, we could pass the requests into modules

// first, create a function that will return the response as json() and also any errors if there is one
function returnFetchJson(url, options) {
    return fetch(url, options).then((response) => {
        // if response is ok, then return response.json
        if (response.ok) {
            return response.json();
        } else {
            // throw a error
            throw new Error(response.statusText);
        }
    }).catch(error => {
        throwError("Data loading error", error);
        throw error;
    });
}

// this module returns the fetch for epmployess
function listEmployees() {
    return returnFetchJson(`${baseURL}/employees`);
}

// this module returns the fetch for roles
function listRoles() {
    return returnFetchJson(`${baseURL}/roles`);
}
// now, pass these functions over the request

// set here the requests
function createEmployeeRegister(employee) {
    return returnFetchJson(`${baseURL}/employees`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
    });
}

function updateEmployeeRegister(id, employee) {
    return returnFetchJson(`${baseURL}/employees/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
    });
}

function deleteEmployeeRegister(id) {
    return returnFetchJson(`${baseURL}/employees/${id}`, {
        method: 'DELETE',
    });
}

