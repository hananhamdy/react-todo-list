import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CommentIcon from "@material-ui/icons/Comment";
import TextField from "@material-ui/core/TextField";
import Classes from "./TodoList.css";

class TodoList extends Component {
  state = { EditTitle: this.props.list.title };
  EditTodoOnChangeHandler = e => {
    this.setState({ EditTitle: e.target.value });
  };
  EditDoneTodoHandler = e => {
    e.preventDefault();
    this.props.onEdit({
      ...this.props.list,
      title: this.state.EditTitle,
      showEdit: false,
    });
  };

  render() {
    // console.log(this.state.EditTitle);
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <List className={Classes.List}>
              <ListItem
                dense
                button
                className={this.props.list.completed ? Classes.Done : null}
              >
                <Checkbox
                  checked={this.props.list.completed}
                  onChange={() => {
                    this.props.doneTodo(this.props.list);
                  }}
                />
                <b className={this.props.type === "Heigh" ? Classes.Red : null}>
                  {this.props.type}
                </b>
                <ListItemText
                  primary={this.props.list.title}
                  className={this.props.list.completed ? Classes.Done : null}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete">
                    <DeleteIcon
                      onClick={() => {
                        this.props.removeTodo(this.props.list);
                      }}
                    />
                  </IconButton>
                  <IconButton aria-label="Comment">
                    <CommentIcon
                      onClick={() => {
                        this.props.editTodo(this.props.list);
                      }}
                    />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {this.props.list.showEdit ? (
                <ListItem>
                  <form
                    onSubmit={this.EditDoneTodoHandler}
                    className={Classes.Container}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="edit"
                      label="Edit Do"
                      margin="normal"
                      variant="outlined"
                      value={this.state.EditTitle}
                      className={Classes.TextField}
                      onChange={this.EditTodoOnChangeHandler}
                    />
                  </form>
                </ListItem>
              ) : null}
            </List>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
