const URL = "http://localhost:3001";

export interface IExpenses {
    id: number
    descricao: string
    categoria: "Saúde" | "Lazer" | "Alimentação" | "Moradia" | "Transporte"
    valor: number
    mes: string
    dia: string
}

// set requests
async function returnFetchJson(url: string, options?: object) {
    try {
        const response = await fetch(url, options);
        // if response is ok, then return response.json
        if (response.ok) {
            return response.json();
        } else {
            // throw a error
            throw new Error(response.statusText);
        }
    } catch (error) {
        throw error;
    }
}

export function renderExpenses(): Promise<IExpenses[]> {
    return returnFetchJson(`${URL}/despesas`);
}

// Given query: http://localhost:3001/despesas?mes=2021-01&_sort=dia
export function renderExpensesByPeriod(year: string, month: string): Promise<IExpenses[]> {
    return returnFetchJson(`${URL}/despesas?mes=${year}-${month}&_sort=dia`);
}



