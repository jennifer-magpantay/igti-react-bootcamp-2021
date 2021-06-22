export const YEARS = [2020, 2021];
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
];

export function getCurrentDate() {
    const date = new Date();
    return date;
}

export function getCurrentYear(date: Date): string {
    return String(date.getFullYear());
}

export function getCurrentMonth(date: Date): string {
    return String(date.getMonth() + 1);
}

// const currentYear = getCurrentYear(getCurrentDate());
// const currentMonth = getCurrentMonth(getCurrentDate());

export function getIndexMonth(month: string) {
    const value = MONTHS.indexOf(month);
    const valueStr = (value + 1).toString().padStart(2, "0")
    return valueStr;
}