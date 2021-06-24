import { MONTHS } from "./Dates";

export function formatMonthCalendar(i: number) {
    return MONTHS[i - 1];
}

export function formatNumberCurrency(value: number) {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(value);
}