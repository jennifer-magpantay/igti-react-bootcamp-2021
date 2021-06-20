import React from "react";
import { useState, useEffect } from "react";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
// components
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
// services
import { ICalendar, renderCalendar } from "../app/Backend";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btnCreate: {
      width: "100%",
      padding: "0.75em 3em",
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
      borderRadius: "50px",
      color: "#fff",
    },
    search: {
      position: "relative",
      marginTop: "16px",
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.5),
      },
      border: "1px solid #ddd",
      borderRadius: "50px",
    },
    searchIcon: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      padding: theme.spacing(0, 2),
      pointerEvents: "none",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      width: "100%",
      padding: theme.spacing(1.5),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      cursor: "pointer",
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    title: {
      margin: "1em 0",
      paddingLeft: "16px",
    },
    container: {
      display: "flex",
      alignItems: "center",
      "& > label": {
        paddingLeft: "08px",
      },
    },
  })
);

export default function AsideCalendar() {
  const classes = useStyles();
  const [agendaList, setAgendaList] = useState<ICalendar[]>([]);
  const [isSelected, setIsSelected] = useState<boolean[]>([]);

  // useEffect to control the data renderinh at every change on star-end dates
  useEffect(() => {
    // calling the backend and saving results into the stats
    renderCalendar().then((calendar) => setAgendaList(calendar));
    setIsSelected(agendaList.map(() => true));
  }, []);

  function handleCheckboxOnChange(){
    console.log(event);
  }

  return (
    <>
      {/* create button */}
      <div>
        <Button className={classes.btnCreate} variant="contained">
          CREATE
        </Button>

        {/* calendar */}

        {/* search */}
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>

        {/* list calendar */}
        <h3 className={classes.title}>Agenda List</h3>
        {agendaList.map((item) => {
          return (
            <div key={item.id} className={classes.container}>
              <input
                type="checkbox"
                name={item.name}
                id={item.name}
                value={item.name}
                checked={isSelected}
                onChange={handleCheckboxOnChange}
              />
              <label htmlFor={item.name}>{item.name}</label>
            </div>
          );
        })}
      </div>
    </>
  );
}
