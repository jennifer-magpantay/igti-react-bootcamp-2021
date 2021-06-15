// functions: format number to pt-BR pattern
function formatNumberCurrency(number) {
    return new Intl.NumberFormat('en-BR', { style: 'currency', currency: 'EUR' }).format(number);
}

function formatNumber(number) {
    return new Intl.NumberFormat('en-BR', { style: 'decimal'}).format(number);
}

function formatPercentage(number) {
    if (number < 0) {
        console.log(number)
    }
    return number.toFixed(2) + "%";
}

function formatMonth(i) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[i - 1];
}

export { formatNumberCurrency, formatNumber, formatPercentage, formatMonth }