// global variables
let countries = [];
let summary = [];
let lastDataEntry = [];
let penultimateDataEntry = [];
let country;
let date;

// // dom elements
const form = document.querySelector('form');
const select = document.querySelector('#slug');
const calendar = document.querySelector('#calendar');
const button = document.querySelector('#buttonSubmit');

const title = document.querySelector('#title');
const cardConfirmed = document.querySelector('#confirmed');
const cardDeaths = document.querySelector('#deaths');
const cardRecovery = document.querySelector('#recovery');
const cardUpdate = document.querySelector('#update');

const root = document.querySelector('#root');

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

// function to format number of pt-BR format 
function formatNumber(number) {
    return new Intl.NumberFormat('pt-BR').format(number);
}

function renderSummary() {
    console.log('rendering summary')
    // console.log(summary.Global);

    // set title
    title.innerHTML = "Global Cases"
    // confirmed
    cardConfirmed.children[1].innerHTML = formatNumber(summary.Global.TotalConfirmed);
    cardConfirmed.children[2].innerHTML = `Daily cases: ${formatNumber(summary.Global.NewConfirmed)}`;

    // deaths
    cardDeaths.children[1].innerHTML = formatNumber(summary.Global.TotalDeaths);
    cardDeaths.children[2].innerHTML = `Daily cases: ${formatNumber(summary.Global.NewDeaths)}`;

    // recovery
    cardRecovery.children[1].innerHTML = formatNumber(summary.Global.TotalRecovered);
    cardRecovery.children[2].innerHTML = `Daily cases: ${formatNumber(summary.Global.NewRecovered)}`;

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

async function searchCountry(event) {
    event.preventDefault();
    country = select.value;
    date = calendar.value;

    // call the function to search data by chosen country and date
    let dataEntries = await getDataByCountry(country, date);

    // then, save into variables the penultimate and last date entries to calculate the daily cases
    penultimateDataEntry = dataEntries.slice(-2)[0];
    lastDataEntry = dataEntries.slice(-1)[0];

    // update title
    title.innerHTML = lastDataEntry.Country;

    // call function to set data and render the cards
    renderCardResults();
}

function renderCardResults() {
    // call the parent card and access its children to set the data
    // confirmed
    cardConfirmed.children[1].innerHTML = formatNumber(lastDataEntry.Confirmed);
    // once we get the data from penultimate and last date, call the function to calculate and return a result
    cardConfirmed.children[2].innerHTML = 'Daily cases: ' + calculateCases(cardConfirmed, lastDataEntry.Confirmed, penultimateDataEntry.Confirmed);

    // deaths
    cardDeaths.children[1].innerHTML = formatNumber(lastDataEntry.Deaths);
    cardDeaths.children[2].innerHTML = 'Daily cases: ' + calculateCases(cardDeaths, lastDataEntry.Deaths, penultimateDataEntry.Deaths);

    // recovery
    cardRecovery.children[1].innerHTML = formatNumber(lastDataEntry.Recovered);
    cardRecovery.children[2].innerHTML = 'Daily cases: ' + calculateCasesRecovery(cardRecovery, lastDataEntry.Recovered, penultimateDataEntry.Recovered);

    // updates
    cardUpdate.children[0].textContent = "Total Active";
    cardUpdate.children[1].innerHTML = formatNumber(lastDataEntry.Active);
    cardUpdate.children[2].innerHTML = 'Daily cases: ' + calculateCases(cardUpdate, lastDataEntry.Active, penultimateDataEntry.Active);
}

// calculating the cases
function calculateCases(element, a, b) {
    let results = Number(a) - Number(b);

    // set conditionals to add different text styles depending on the result value
    // if is higher than 0, then is red => alert
    if (results > 0) {
        element.children[2].style.color = '#e74c3c';
    }
    // if is lower tahn 0, then is blue => reduction
    else if (results < 0) {
        element.children[2].style.color = '#2980b9';
    }
    // otherwise (if is == 0), then keep its normal color text
    else {
        element.children[2].style.color = '#282828';
    }
    return formatNumber(results);
}

// calculating recovery cases: styles are set as oposite
function calculateCasesRecovery(element, a, b) {
    let results = Number(a) - Number(b);
    // if is higher tahn 0, then is blue => more people getting recovered
    if (results > 0) {
        element.children[2].style.color = '#2980b9';
    }
     // if is lower than 0, then is red => alert (less people getting recovered)
    else if (results < 0) {
        element.children[2].style.color = '#e74c3c';
    }
    else {
        element.children[2].style.color = '#282828';
    }
    return formatNumber(results);
}

