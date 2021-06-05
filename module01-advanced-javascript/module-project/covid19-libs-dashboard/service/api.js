const apiRequest = axios.create({
    baseURL: "https://api.covid19api.com"
})

// set here all requests:
// requests GET
async function listSummary() {
    let response = await apiRequest.get("/summary");
    return response.data;
}

async function getDataByCountryAndDates(country, dateFrom, dateTo) {
    let response = await apiRequest.get(`/country/${country}?from=${dateFrom}T00:00:00Z&to=${dateTo}T00:00:00Z`);
    return response.data;
}

// error function to display message
function showError(error) {
    document.querySelector('#error').innerHTML = "Data load error";
}

