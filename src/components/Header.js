import React from "react";
import Button from "@material-ui/core/Button";
import Classes from "./Header.css";
import Badge from "@material-ui/core/Badge";

// const isActive = (value) => {
//   return ((value===this.props.filter[0].Status) ?'btn-primary':'default');
// }

const Header = ({ value, onChange, all, done, inprogress }) => (
  <header className={Classes.Header}>
    <Badge color="primary" badgeContent={all} className={Classes.margin}>
      <Button
        variant="contained"
        color={value === "all" ? "secondary" : "default"}
        onClick={() => onChange("all")}
      >
        All
      </Button>
    </Badge>
    <Badge color="primary" badgeContent={inprogress} className={Classes.margin}>
      <Button
        variant="contained"
        color={value === "inProgress" ? "secondary" : "default"}
        onClick={() => onChange("inProgress")}
      >
        In Progress
      </Button>
    </Badge>
    <Badge color="primary" badgeContent={done} className={Classes.margin}>
      <Button
        variant="contained"
        color={value === "done" ? "secondary" : "default"}
        onClick={() => onChange("done")}
      >
        Done
      </Button>
    </Badge>
  </header>
);

export default Header;
