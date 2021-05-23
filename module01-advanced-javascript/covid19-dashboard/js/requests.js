// set here all http requests

// variables
const baseURL = "https://api.covid19api.com";

// function to return the response as json() and also any errors if there is one
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
        // throwError("Data loading error", error);
        throw error;
    });
}

// requests
function listAllCountries() {
    return returnFetchJson(`${baseURL}/countries`);
}

function listSummary() {
    return returnFetchJson(`${baseURL}/summary`);
}

function getDataByCountry(country,date){
    return returnFetchJson(`${baseURL}/country/${country}?from=2020-03-01T00:00:00Z&to=${date}T00:00:00Z`);
}


function showError(error) {
    document.querySelector('#errors').innerHTML = "Loading data error";
}
