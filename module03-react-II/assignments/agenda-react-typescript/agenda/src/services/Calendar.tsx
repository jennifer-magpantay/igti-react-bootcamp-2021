import { IEvents } from "../app/Backend";

export const DAYS_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function formatMonthCalendar(i: number) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[i - 1];
}

// function to get the current date, which will be displayed at the top nav
export function getCurrentDateTopNav() {
  const currentDate = new Date();
  return setCurrentDateTopNav(currentDate);
}

export function setCurrentDateTopNav(date: Date) {
  const monthIndex = date.getMonth() + 1;
  const month = formatMonthCalendar(monthIndex);
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
  currentDay: number,
  events: IEvents[];
}

// function to generate the calendar dynamically
// a calendar is composed by weeks and each week is composed by days
// then, the ICalendar will be a [][] => weeks[] & week[]
export function generateCalendar(allEvents: IEvents[]): ICalendar[][] {
  const weeks: ICalendar[][] = [];
  // set the current date
  const date = new Date();

  // get the current month 
  const currentMonth = date.getMonth() + 1;

  // getting the first day of the month: create a new date using the current date as params
  let firstDay = new Date(date.valueOf());
  // based on this 'new' date, set it to 1 to get the first date of the month
  firstDay.setDate(1);

  // get the day of the week from first day: values from 0 - 6
  const dayOfTheWeek = firstDay.getDay();
  // then, set the new date with a calculation/difference between the first day of the month - the day of the week fot eh first day
  firstDay.setDate(1 - dayOfTheWeek);

  // then, through a do/while loop, build the week[], according tho the days of week
  do {
    const week: ICalendar[] = [];
    for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
      const dateISOToString = convertDate(firstDay);
      // push the result into the array week
      week.push({
        date: dateISOToString,
        currentDay: firstDay.getDate(),
        events: allEvents.filter((event) => event.date === dateISOToString),
      });
      // increase one day to firstDay after each loop
      firstDay.setDate(firstDay.getDate() + 1);
    }
    // once the week ends, push it into weeks array
    weeks.push(week);
    // until breaks the loop - when the month values are different
  } while (firstDay.getMonth() !== currentMonth);
  return weeks;
}

function getMonday(date: Date) {
  date = new Date(date);
  var day = date.getDay(),
    difference = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(difference));
}
