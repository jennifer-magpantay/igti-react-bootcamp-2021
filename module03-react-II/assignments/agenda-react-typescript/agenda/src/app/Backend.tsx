// set type/interface
export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IEvents {
  id: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

const URL = "http://localhost:8080";

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

// this module returns the fetch for epmployess
export function renderCalendar(): Promise<ICalendar[]> {
    return returnFetchJson(`${URL}/calendars`);
}

export function renderEvents(): Promise<IEvents[]> {
  return returnFetchJson(`${URL}/events`);
}

export function renderEventsDates(from: string, to:string): Promise<IEvents[]> {
  return returnFetchJson(`${URL}/events?date_gte=${from}&date_lte=${to}&_sort=date,time`);
}


