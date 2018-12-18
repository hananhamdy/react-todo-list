import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Classes from "./AddTodo.css";

const AddTodo = ({ addTodo, AddTodoOnChange, value, type, typeH }) => (
  <form
    onSubmit={addTodo}
    className={Classes.Container}
    noValidate
    autoComplete="off"
  >
    <TextField
      id="outlined-name"
      label="To Do"
      margin="normal"
      variant="outlined"
      value={value}
      className={Classes.TextField}
      onChange={AddTodoOnChange}
    />
    <br />
    <Button
      color={type === "Heigh" ? "secondary" : "default"}
      className={Classes.button}
      onClick={() => typeH("Heigh")}
    >
      Heigh
    </Button>
    <Button
      color={type === "Meduim" ? "secondary" : "default"}
      className={Classes.button}
      onClick={() => typeH("Meduim")}
    >
      Medium
    </Button>
    <Button
      color={type === "Normal" ? "secondary" : "default"}
      className={Classes.button}
      onClick={() => typeH("Normal")}
    >
      Normal
    </Button>
    <br />
    <br />
  </form>
);

export default AddTodo;
