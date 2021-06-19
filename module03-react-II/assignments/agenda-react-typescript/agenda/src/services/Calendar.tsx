export const DAYS_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function getToday() {
  const today = new Date();
  return today;
}

export function getMonthAndYear() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const result = `${month} | ${year}`;
  return result;
}

function convertDate(firstDate: Date) {
  //extract the day, month and full year
  firstDate = new Date(firstDate);
  const day = firstDate.getDate().toString().padStart(2, "0");
  const month = (firstDate.getMonth() + 1).toString().padStart(2, "0");
  const year = firstDate.getFullYear();
  // reorder as the data pattern
  const dateString = `${year}-${month}-${day}`;
  //   return result
  return dateString;
}

export interface ICalendar {
  date: string;
}

export function generateCalendar(date: Date): ICalendar[][] {
  const weeks: ICalendar[][] = [];

  // get the current month
  const currentMonth = date.getMonth() + 1;

  // getting the first day of the month: create a new date using date as params
  let firstDay = new Date(date.valueOf());
  // based on this 'new' date, set it to 1 to get the first date of the month
  firstDay.setDate(1);

  // get the day of the week from first day: values from 0 - 6
  const dayOfTheWeek = firstDay.getDay();
  // then, calculate to return the first day of the first week
  firstDay.setDate(1 - dayOfTheWeek);

  do {
    const week: ICalendar[] = [];
    for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
      const dateISOToString = convertDate(firstDay);
      // push the variable into thearray week
      week.push({ date: dateISOToString });
      // increase one day to firstDay after each loop
      firstDay.setDate(firstDay.getDate() + 1);
    }
    // push week into the variable weeks
    weeks.push(week);
    // then, breaks the loop when the month values are different
  } while (firstDay.getMonth() !== currentMonth);
  return weeks;
}

function getMonday(date: Date) {
  date = new Date(date);
  var day = date.getDay(),
    difference = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(difference));
}
