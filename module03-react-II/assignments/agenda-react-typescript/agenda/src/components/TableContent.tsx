// styles
import { makeStyles } from "@material-ui/core/styles";

// components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  tableContainer: {
    height: "100%",
    overflowX: "hidden",
  },
  table: {
    // width: "100%",
    minHeight: "100%",
    "& td": {
      borderRight: "1px solid #ddd",
    },
    // "& * td:nth-of-type(1)": {
    //   borderLeft: "1px solid #ddd",
    // },
  },
});

export default function TableContent() {
  const classes = useStyles();

  const DAYS_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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
            <TableRow>
              {/* render days of week */}
              {DAYS_OF_WEEK.map((day) => (
                <TableCell key={day} align="center">
                  X
                </TableCell>
              ))}
            </TableRow>

            <TableRow>
              {/* render days of week */}
              {DAYS_OF_WEEK.map((day) => (
                <TableCell key={day} align="center">
                  X
                </TableCell>
              ))}
            </TableRow>

            <TableRow>
              {/* render days of week */}
              {DAYS_OF_WEEK.map((day) => (
                <TableCell key={day} align="center">
                  X
                </TableCell>
              ))}
            </TableRow>

            <TableRow>
              {/* render days of week */}
              {DAYS_OF_WEEK.map((day) => (
                <TableCell key={day} align="center">
                  X
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
