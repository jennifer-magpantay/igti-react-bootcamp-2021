import { IExpenses } from "./Backend";

export function ReduceCategory(expenses: IExpenses[], category: string) {
    const total = expenses.filter((item) => { return item.categoria === category }).reduce((acc, curr) => {
        return acc + curr.valor;
    }, 0);
    return total;
}

export function ReduceTotal(expenses: IExpenses[]) {
    const total = expenses.reduce((acc, curr) => {
        return acc + curr.valor;
    }, 0);
    return total;
}