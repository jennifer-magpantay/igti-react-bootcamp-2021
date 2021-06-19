// styles
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
  DAYS_OF_WEEK,
  getToday,
  generateCalendar,
} from "../services/Calendar";

const useStyles = makeStyles({
  tableContainer: {
    height: "100%",
    overflowX: "hidden",
  },
  table: {
    minHeight: "100%",
    "& td": {
      borderRight: "1px solid #ddd",
    },
  },
});

export default function TableContent() {
  const classes = useStyles();
  const WEEKS = generateCalendar(getToday());

  return (
    <>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* render days of week */}
              {DAYS_OF_WEEK.map((day) => (
                <TableCell key={day} align="center">
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {/* render the table body content */}
            {WEEKS.map((week, i) => {
              return (
                <TableRow key={i}>
                  {week.map((day) => (
                    <TableCell key={day.date} align="center">
                      {day.date}
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
