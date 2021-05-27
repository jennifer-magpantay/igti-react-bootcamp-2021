const apiRequest = axios.create({
    baseURL: "https://api.covid19api.com"
})

// set here all requests:
// requests GET
async function listAllCountries() {
    let response = await apiRequest.get("/countries");
    return response.data;
}

async function listSummary() {
    let response = await apiRequest.get("/summary");
    return response.data;
}

async function getDataByCountry(country, date) {
    let response = await apiRequest.get(`/country/${country}?from=2020-03-01T00:00:00Z&to=${date}T00:00:00Z`);
    return response.data;
}

async function getDataByCountryAndDayes(country, dateFrom, dateTo) {
    let response = await apiRequest.get(`/country/${country}?from=${dateFrom}T00:00:00Z&to=${dateTo}T00:00:00Z`);
    return response.data;
}

// error function to display message
function showError(error) {
    document.querySelector('#error').innerHTML = "Data load error";
}

