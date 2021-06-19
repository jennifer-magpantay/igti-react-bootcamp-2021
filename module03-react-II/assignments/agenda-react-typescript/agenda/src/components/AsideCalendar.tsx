import React from "react";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

// list
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

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
      marginTop: "1em",
      paddingLeft: "16px",
    },
    listRoot: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function AsideCalendar() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

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
        <List className={classes.listRoot}>
          {/* render a list */}
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;
            return (
              <ListItem
                key={value}
                role={undefined}
                dense
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>

                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              </ListItem>
            );
          })}
        </List>
      </div>
    </>
  );
}
