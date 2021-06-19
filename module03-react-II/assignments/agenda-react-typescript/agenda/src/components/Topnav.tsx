import React from "react";
// components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

// icons
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";

// styles
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appColor: {
      backgroundColor: "#fff",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    logo: {
      width: "17%",
      color: "#2f3640",
    },
    title: {
      flexGrow: 1,
      padding: "0 16px",
      color: "#2f3640",
    },
    avatar: {
      flexGrow: 1,
    },
  })
);

export default function Topnav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* App bar: logo, buttons, month, year, avatar */}
      <AppBar position="static" className={classes.appColor}>
        <Toolbar>
          {/* menu */}
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.logo}>
            CALENDAR
          </Typography>

          {/* prev & next buttons */}
          <IconButton aria-label="previous month button">
            <NavigateBeforeRoundedIcon />
          </IconButton>

          <IconButton aria-label="next month button">
            <NavigateNextRoundedIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Month Year
          </Typography>

          <IconButton className="avatar" aria-label="avatar button">
            <Avatar>H</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
