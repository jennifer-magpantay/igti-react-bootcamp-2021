import { MONTHS } from "./Backend";

export function formatMonthCalendar(i: number) {
    return MONTHS[i - 1];
}

export function getIndexMonth(month: string) {
    const value = (MONTHS.indexOf(month)).toString().padStart(2, "0")
    return value;
}

export function formatNumberCurrency(value: number) {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(value);
}