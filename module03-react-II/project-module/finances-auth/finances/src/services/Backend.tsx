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
    return returnFetchJson(`${URL}/despesas`, { credentials: 'include'});
}

// Given query: http://localhost:3001/despesas?mes=2021-01&_sort=dia
export function renderExpensesByPeriod(year: string, month: string): Promise<IExpenses[]> {
    return returnFetchJson(`${URL}/despesas?mes=${year}-${month}&_sort=dia`, { credentials: 'include'});
}

// register a user
export interface IUser {
    nome: string
    email: string
    senha: string
}

// POST /sessao/criar: create an endpoint to login the user
export function loginUserSession(email: string, senha: string): Promise<IUser> {
    return returnFetchJson(`${URL}/sessao/criar`, {
        method: 'POST',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, senha}),
    });
}

// GET /sessao/usuario : check if the user has a session registered
export function getUserSession(): Promise<IUser>{
    return returnFetchJson(`${URL}/sessao/usuario`, { credentials: 'include'});
}

// POST /sessao/finalizar : close the user session
export function logoutUserSession(): Promise<IUser>{
    return returnFetchJson(`${URL}/sessao/finalizar`, {
        credentials: 'include',
        method: 'POST',
    });
}


