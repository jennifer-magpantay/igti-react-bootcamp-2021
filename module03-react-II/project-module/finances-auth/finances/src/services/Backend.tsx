const URL = "http://localhost:3001";

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

export interface IExpenses {
    id: number
    descricao: string
    categoria: "Saúde" | "Lazer" | "Alimentação" | "Moradia" | "Transporte"
    valor: number
    mes: string
    dia: string
}

export function renderExpenses(): Promise<IExpenses[]> {
    return returnFetchJson(`${URL}/despesas`);
}

// Given query: http://localhost:3001/despesas?mes=2021-01&_sort=dia
export function renderExpensesByPeriod(year: string, month: string): Promise<IExpenses[]> {
    return returnFetchJson(`${URL}/despesas?mes=${year}-${month}&_sort=dia`);
}

// register a user
export interface IUser {
    name: string
    email: string
    password: string
}

// POST /sessao/criar
export function createUserRegister(user: IUser[]): Promise<IUser[]> {
    return returnFetchJson(`${URL}/POST /sessao/criar`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
}

// GET /sessao/usuario
export function getUserRegister(){
    
}

// POST /sessao/finalizar
export function logoutUserRegister(){}


