import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// services
import {
  IEvents, 
  renderEventsDates
 
} from "../app/Backend";
import { DAYS_OF_WEEK, generateCalendar } from "../services/Calendar";

const useStyles = makeStyles({
  tableContainer: {
    overflowX: "hidden",
  },
  table: {
    "& td": {
      borderRight: "1px solid #ddd",
    },
    tableLayout: "fixed",
  },
  tableHead: {
    "& *": {
      textAlign: "center",
    },
  },
  cell: {
    // width: "calc(100% / 7)",
    position: "relative",
    height: "150px",
    padding: "08px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    "&:hover, &:focus": {
      backgroundColor: "#dddddd",
    },
    "& > span": {
      position: "absolute",
      top: "8px",
      right: "8px",
      display: "block",
      fontWeight: "500",
      textAlign: "right",
    },
  },
  list: {
    "& li": {},
  },
});

export default function TableContent() {
  const classes = useStyles();

  const [events, setEvents] = useState<IEvents[]>([]);  
  // calling the function to render the calendar
  const WEEKS = generateCalendar(events);
  // set start and end date for the month
  const startDate = WEEKS[0][0].date;
  const endDate = WEEKS[WEEKS.length - 1][6].date;

  // useEffect to control the data renderinh at every change on star-end dates
  useEffect(() => {
    // calling the backend and saving results into the stats   
    renderEventsDates(startDate, endDate).then((events) => setEvents(events));
  }, [startDate, endDate]);

  return (
    <>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              {/* render days of week */}
              {DAYS_OF_WEEK.map((day) => (
                <TableCell key={day}>{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {/* render the table body content */}
            {WEEKS.map((week, i) => {
              return (
                <TableRow key={i}>
                  {week.map((day) => (
                    <TableCell key={day.date} className={classes.cell}>
                      <span>{day.currentDay}</span>
                      {day.events.map((event) => {
                        return (
                          <ul key={event.calendarId} className={classes.list}>
                            <li>
                              {event.time || ""} {event.desc}
                            </li>
                          </ul>
                        );
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
