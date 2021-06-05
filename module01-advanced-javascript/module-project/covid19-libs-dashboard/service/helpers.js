// helpers
// functions: format number to pt-BR pattern
function formatNumber(number) {
    return new Intl.NumberFormat('pt-BR').format(number);
}

// formating dates
function formatDate(d) {
    let date = new Date(d);
    let dateFormated = date.toLocaleString().split(',')[0];
    return dateFormated;
}

// calculating the cases
function calculateCases(element, a, b) {
    let results = Number(a) - Number(b);

    // set conditionals to add different text styles depending on the result value
   
    // for recovered cases:
    if (element === cardRecovery) {
        // if is higher than 0, then set color to blue => progress
        if (results > 0) {
            element.children[2].style.color = '#2980b9';
        }
        // it is lower, set color to red => alert
        else if (results < 0) {
            element.children[2].style.color = '#e74c3c';
        }
    }
     // for any other elements: 
    else if (results > 0) {
        //if is higher than 0, then is red => alert
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

function resetArrays() {
    xLabel = [];
    yLabel = [];
    yDeaths = [];
    yRecovered = [];
}