import { MONTHS } from "./Dates";

export function formatMonthCalendar(i: string):string {
    return MONTHS[Number(i) - 1];
}

export function formatNumberCurrency(value: number) {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(value);
}