// global variables
// lists
let countries = [];
let summary = [];

// entries registers
let dataEntry = [];
let lastDataEntry = [];
let secondLastDataEntry = [];
let dataEntryPeriod = [];

// events
let country;
let calendarDate;

// charts
let barChart;
let pieChart;
let lineChart;

// label charts
let xLabel = [];
let yLabel = [];
let yDeaths = [];
let yRecovered = [];

// dom elements
// form
const form = document.querySelector('form');
const select = document.querySelector('#slug');
const calendarFrom = document.querySelector('#calendarFrom');
const calendarTo = document.querySelector('#calendarTo');
const button = document.querySelector('#buttonSubmit');
const buttonClear = document.querySelector('.clear');

// cards
const title = document.querySelector('#title');
const cardConfirmed = document.querySelector('#confirmed');
const cardDeaths = document.querySelector('#deaths');
const cardRecovery = document.querySelector('#recovery');
const cardUpdate = document.querySelector('#update');

// div charts
const divBar = document.querySelector('.bar-chart');
const divLine = document.querySelector('.line-chart');

async function init() {

    // getting data
    // countries = await listAllCountries();
    summary = await listSummary();

    // render results
    renderCountriesOptions();
    renderGlobalSummary();

    // events  
    // form.addEventListener('submit', searchCountry);
    // form.addEventListener('change', searchCountry);
    button.addEventListener('click', searchCountry);
    buttonClear.addEventListener('click', resetApplication);
}

init();

// event handlers
function resetApplication(event) {

    event.preventDefault();

    // clean inputs
    select.value = "";
    calendarFrom.value = "";
    calendarTo.value = "";

    // reset arrays
    resetArrays();

    // add hiden to line chart div
    divBar.classList.remove('hidden');
    divLine.classList.add('hidden');

    // render summary again
    renderCountriesOptions();
    renderGlobalSummary();
}

async function searchCountry(event) {

    event.preventDefault();

    // get event.target values
    country = select.value;
    calendarDateFrom = calendarFrom.value;
    calendarDateTo = calendarTo.value;

    // call the function to search data by chosen country and date
    dataEntry = await getDataByCountryAndDates(country, calendarDateFrom, calendarDateTo);

    // then, save into variables the penultimate and last date entries to calculate the daily cases
    // use lodash to manage the data from the arrays
    secondLastDataEntry = _.nth(dataEntry, -2);
    // secondLastDataEntry = dataEntry.slice(-2)[0];

    lastDataEntry = _.last(dataEntry);
    // lastDataEntry = dataEntry.slice(-1)[0];

    dataEntryPeriod = dataEntry;

    // call function to set data and render country results
    renderCountrySummary()
}

// rendering countries options to append to select tag
function renderCountriesOptions() {

    // read the array summary.Countries
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

// rendering global results will be displayed when the page is loaded
function renderGlobalSummary() {

    // error when trying to use .map() or .forEach(): it is not a function (??)

    // passing values into variables   
    const confirmed = summary.Global.TotalConfirmed;
    const newConfirmed = summary.Global.NewConfirmed;
    const deaths = summary.Global.TotalDeaths;
    const newDeaths = summary.Global.NewDeaths;
    const recovered = summary.Global.TotalRecovered;
    const newRecovered = summary.Global.NewRecovered;
    const date = summary.Global.Date;

    // render cards & charts
    renderGlobalCardResults(confirmed, newConfirmed, deaths, newDeaths, recovered, newRecovered, date);

    // render top 10 countries
    renderTopTenCountries();

    // render bar chart
    renderBarChart();

    // pie chart
    renderPieChart(confirmed, deaths, recovered)
}

// country results will be displayed once the search event occurs
function renderCountrySummary() {

    // error when trying to use .map() or .forEach(): it is not a function (??)

    // pass the array values into variables
    const lastConfirmed = lastDataEntry.Confirmed;
    const secLastConfirmed = secondLastDataEntry.Confirmed;
    const lastDeath = lastDataEntry.Deaths;
    const secLastDeath = secondLastDataEntry.Deaths;
    const lastRecovered = lastDataEntry.Recovered;
    const secLastRecovered = secondLastDataEntry.Recovered;
    const lastActive = lastDataEntry.Active;
    const secLastActive = secondLastDataEntry.Active;

    // update title
    title.innerHTML = lastDataEntry.Country;

    // render cards
    renderCountryCardResults(lastConfirmed, secLastConfirmed, lastDeath, secLastDeath, lastRecovered, secLastRecovered, lastActive, secLastActive);

    // render charts
    renderPieChart(lastConfirmed, lastDeath, lastRecovered);

    // reseting arrays
    resetArrays();

    dataEntryPeriod.forEach((item, i) => {
        let date = formatDate(item.Date);
        xLabel.push(date);
        const confirmed = item.Confirmed;
        // const confirmed = calcDailyResults(item[i].Confirmed, item[i - 1].Confirmed);
        yLabel.push(confirmed);       
        const deaths = item.Deaths;
        yDeaths.push(deaths);
        const recovered = item.Recovered;
        yRecovered.push(recovered);
    })

    
    for (var i = 1; i < dataEntryPeriod.length; i++) {
       
       calcDailyResults(dataEntryPeriod[i].Confirmed, dataEntryPeriod[i -1].Confirmed);
       
        // console.log("for loop", dataEntryPeriod[i]);
    }

    // dataEntryPeriod.forEach((x, i) => console.log("forEach", x));

    // for (const x of dataEntryPeriod) { console.log("for of", x); }

    console.log("Ex.:", Number(dataEntryPeriod[1].Confirmed) - Number(dataEntryPeriod[0].Confirmed));

    // once we have the data, render the line chart
    renderLineChart();
}


function calcDailyResults(a, b) {
    // get the prop value of current index of the array and subtract the the previous index
    // let prevIndex = i - 1;
    
    let result = Number(a) - Number(b);
    // return result;
    console.log("result", result);
}

function renderTopTenCountries() {

    // read the array countries
    // get from it country names and total: confirmed, deaths and recovered
    // sort it in desc order
    // get just the first 10 indexes

    let data = summary.Countries.map((country) => {
        return {
            name: country.Country,
            confirmed: country.TotalConfirmed,
            deaths: country.TotalDeaths,
            recovered: country.TotalRecovered
        }
    }).sort((a, b) => {
        return b.confirmed - a.confirmed
    }).filter((country, i) => i < 10);

    // .filter will populate the array up to the index 10
    // .slice(0,10) would read all the array to slice it into the indexes between 0 to 10, and then get those elements

    // reseting labels
    resetArrays();

    // then set the data into the label arrays to be used on charts
    data.forEach((item) => {
        const name = item.name;
        xLabel.push(name);
        const confirmed = item.confirmed;
        yLabel.push(confirmed);
        const deaths = item.deaths;
        yDeaths.push(deaths);
        const recovered = item.recovered;
        yRecovered.push(recovered);
    })
}

// charts
// display top 10 countries
function renderBarChart() {
    // chart baisc structure: x = new Chart(x, config) 
    // where x = dom element we want to add the chart
    // and config holds data and options settings to generate the chart

    const data = {
        // labels and dataset
        // labels  to appear at the bottom of the chart
        labels: xLabel,
        datasets: [
            {
                // label to appear on top of the chart, as tittle
                label: "Top 10 Countries: Confirmed Cases",

                // data to be displayed at the left vertical side  of the chart
                data: yLabel,
                borderColor: "rgba(41, 128, 185, 1)",
                backgroundColor: "rgba(41, 128, 185, 1)",
            },
            {
                // label to appear on top of the chart, as tittle
                label: "Deaths Cases",

                // data to be displayed at the left vertical side  of the chart
                data: yDeaths,
                borderColor: "rgba(231, 76, 60, 1)",
                backgroundColor: "rgba(231, 76, 60, 1)",
            },
            {
                // label to appear on top of the chart, as tittle
                label: "Recovered Cases",

                // data to be displayed at the left vertical side  of the chart
                data: yRecovered,
                borderColor: "rgba(46, 204, 113, 1)",
                backgroundColor: "rgba(46, 204, 113, 1)",
            }
        ]
    }

    // config holds the type of the cart and data content
    const config = {
        type: 'bar',
        data: data
    };

    // define the dom element
    const ctx = document.querySelector('#barChart').getContext('2d');

    // check if te pie chart already exists
    if (barChart != undefined) {

        // if yes, destroy the chart
        barChart.destroy();
    }

    // then, create (a new) one
    barChart = new Chart(ctx, config);
}

function renderPieChart(confirmed, deaths, recovered) {

    const data = {
        labels: ["Total Confirmed", "Total Deaths", "Total Recovered"],
        datasets: [{
            data: [confirmed, deaths, recovered],
            backgroundColor: ["rgba(41, 128, 185, 1)", "rgba(231, 76, 60, 1)", "rgba(46, 204, 113, 1)"],
        }]
    };

    const config = {
        type: 'pie',
        data: data
    };

    const ctx = document.querySelector('#pieChart').getContext('2d');

    if (pieChart != undefined) {
        pieChart.destroy();
    }

    pieChart = new Chart(ctx, config);
}

function renderLineChart() {

    // first, remove the hidden class from the line div    
    divLine.classList.remove('hidden');

    // add hidden to the bar div
    divBar.classList.add('hidden');

    const data = {
        labels: xLabel,
        datasets: [
            {
                label: 'Confirmed Cases ',
                data: yLabel,
                fill: false,
                borderColor: 'rgba(41, 128, 185, 1)',
                tension: 0.1
            },
            {
                label: 'Death Cases ',
                data: yDeaths,
                fill: false,
                borderColor: "rgba(231, 76, 60, 1)",
                tension: 0.1
            },
            {
                label: 'Recovered Cases ',
                data: yRecovered,
                fill: false,
                borderColor: "rgba(46, 204, 113, 1)",
                tension: 0.1
            },
        ]
    };

    const config = {
        type: 'line',
        data: data
    };

    var ctx = document.querySelector('#lineChart').getContext('2d');

    if (lineChart != undefined) {
        lineChart.destroy();
    }

    lineChart = new Chart(ctx, config);
}

// render cards
function renderGlobalCardResults(confirmed, newConfirmed, deaths, newDeaths, recovered, newRecovered, currentDate) {
    // set title
    title.innerHTML = "Global Cases";

    // call the parent card and access its children to set the data
    // confirmed
    cardConfirmed.children[1].innerHTML = formatNumber(confirmed);
    cardConfirmed.children[2].innerHTML = `New cases: ${formatNumber(newConfirmed)}`;

    // deaths
    cardDeaths.children[1].innerHTML = formatNumber(deaths);
    cardDeaths.children[2].innerHTML = `New cases: ${formatNumber(newDeaths)}`;

    // recovery
    cardRecovery.children[1].innerHTML = formatNumber(recovered);
    cardRecovery.children[2].innerHTML = `New cases: ${formatNumber(newRecovered)}`;

    // updates
    let date = formatDate(currentDate);
    cardUpdate.children[1].innerHTML = date;
}

function renderCountryCardResults(lastConfirmed, secLastConfirmed, lastDeath, secLastDeath, lastRecovered, secLastRecovered, lastActive, secLastActive) {

    // confirmed
    cardConfirmed.children[1].innerHTML = formatNumber(lastConfirmed);
    // once we get the data from second last and last date, call the function to calculate and return a result
    cardConfirmed.children[2].innerHTML = 'New cases: ' + calculateCases(cardConfirmed, lastConfirmed, secLastConfirmed);

    // deaths
    cardDeaths.children[1].innerHTML = formatNumber(lastDeath);
    cardDeaths.children[2].innerHTML = 'New cases: ' + calculateCases(cardDeaths, lastDeath, secLastDeath);

    // recovery
    cardRecovery.children[1].innerHTML = formatNumber(lastDataEntry.Recovered);
    cardRecovery.children[2].innerHTML = 'New cases: ' + calculateCases(cardRecovery, lastRecovered, secLastRecovered);

    // updates
    cardUpdate.children[0].textContent = "Total Active";
    cardUpdate.children[1].innerHTML = formatNumber(lastActive);
    cardUpdate.children[2].innerHTML = 'New cases: ' + calculateCases(cardUpdate, lastActive, secLastActive);
}



