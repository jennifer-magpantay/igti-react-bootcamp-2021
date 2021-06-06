// functions: format number to pt-BR pattern
function formatNumber(number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
}

function formatMonth(i) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[i - 1];
}

export { formatNumber, formatMonth }