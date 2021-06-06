// functions: format number to pt-BR pattern
function formatNumber(number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
}

export { formatNumber }