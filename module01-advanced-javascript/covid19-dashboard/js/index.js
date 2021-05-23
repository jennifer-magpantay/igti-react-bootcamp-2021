// global variables
let countries = [];
let summary = [];
let country;
let date;
let lastDataEntry = [];

// // dom elements
const select = document.querySelector('#slug');
const calendar = document.querySelector('#calendar');
const form = document.querySelector('form');
const root = document.querySelector('root');
const cardConfirmed = document.querySelector('#confirmed');
const cardDeaths = document.querySelector('#deaths');
const cardRecovery = document.querySelector('#recovery');
const cardUpdate = document.querySelector('#update');
const button = document.querySelector('#buttonSubmit');
const title = document.querySelector('#title');

async function init() {
    console.log("loading page")
    // methods

    // 
    countries = await listAllCountries();
    summary = await listSummary();

    // render lists
    renderSummary();
    renderCountriesOptions();

    // events
    button.addEventListener('click', searchCountry);
    form.addEventListener('submit', searchCountry);
    form.addEventListener('change', searchCountry);
}

init();

async function searchCountry(event) {
    event.preventDefault();
    country = select.value;
    date = calendar.value;
    console.log(country, date);

    let dataEntries = await getDataByCountry(country, date);
    console.log(dataEntries);

    lastDataEntry = dataEntries.slice(-1)[0];
    console.log(lastDataEntry);   

    // set into cards
    renderCardResults();
}

function renderSummary() {
    console.log('rendering summary')
    console.log(summary.Global);

    // set title
    title.innerHTML = "Global Cases"
    // confirmed
    cardConfirmed.children[1].innerHTML = summary.Global.TotalConfirmed;
    cardConfirmed.children[2].innerHTML = `Daily range: ${summary.Global.NewConfirmed}`;

    // deaths
    cardDeaths.children[1].innerHTML = summary.Global.TotalDeaths;
    cardDeaths.children[2].innerHTML = `Daily range: ${summary.Global.NewDeaths}`;

    // recovery
    cardRecovery.children[1].innerHTML = summary.Global.TotalRecovered;
    cardRecovery.children[2].innerHTML = `Daily range: ${summary.Global.NewRecovered}`;

    // updates
    let date = new Date(summary.Global.Date);
    cardUpdate.children[1].innerHTML = date.toLocaleString();
}

function renderCountriesOptions() {
    console.log('rendering countries')
    summary.Countries.forEach((country) => {
        // then, for each item, create and element
        const option = document.createElement('option');
        // set its context and values
        option.textContent = country.Country;
        option.value = country.Slug;
        // and finally, append option to the select
        form.slug.appendChild(option);
    });
}

function renderCardResults() {

    title.innerHTML = lastDataEntry.Country;
    // confirmed
    cardConfirmed.children[1].innerHTML = lastDataEntry.Confirmed;
    // cardConfirmed.children[2].innerHTML = `Daily range: ${}`;

    // deaths
    cardDeaths.children[1].innerHTML = lastDataEntry.Deaths;
    // cardDeaths.children[2].innerHTML = `Daily range: ${}`;

    // recovery
    cardRecovery.children[1].innerHTML = lastDataEntry.Recovered;
    // cardRecovery.children[2].innerHTML = `Daily range: ${}`;

    // updates
    cardUpdate.children[0].textContent = "Total Active";
    cardUpdate.children[1].innerHTML = lastDataEntry.Active;
    // cardUpdate.children[2].innerHTML = `Daily range: ${}`;
}
