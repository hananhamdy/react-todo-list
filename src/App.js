import React, { Component } from "react";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todo: "",
      todos: [],
      idk: 2,
      filter: "all",
      type: "Normal",
      doneTodo: 0,
      inPTodo: 2,
    };
  }

  /**Todo List */
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos").then(response => {
      const todos = response.data.slice(0, 2);
      const updateTodos = todos.map(todo => {
        return {
          ...todo,
          todoType: "Normal",
        };
      });
      this.setState({ todos: updateTodos });
    });
  }

  /**Add Todo */
  AddTodoOnChangeHandler = e => {
    this.setState({ todo: e.target.value });
    // console.log(this.state.todo);
  };
  AddTodoHandler = e => {
    // debugger;
    e.preventDefault();
    // const newTodo = ;
    this.setState(prevState => ({
      todos: [
        {
          userId: 1,
          id: prevState.idk + 1,
          title: prevState.todo,
          completed: false,
          todoType: prevState.type,
        },
        ...this.state.todos,
      ],
      todo: "",
      idk: prevState.idk + 1,
      inPTodo: prevState.inPTodo + 1,
    }));
    // console.log(newTodo);
  };

  /**Remove Todo */
  removeTodoHandler = todo => {
    this.setState(state => ({
      todos: state.todos.filter(t => {
        return t.id !== todo.id;
      }),
      doneTodo: todo.completed ? this.state.doneTodo - 1 : this.state.doneTodo,
      inPTodo: !todo.completed ? this.state.inPTodo - 1 : this.state.inPTodo,
    }));
  };

  /**Done Todo */
  doneTodoHandler = todo => {
    // debugger;
    let el = [...this.state.todos];
    el.splice(el.indexOf(todo), 1);
    todo.completed = !todo.completed;
    todo.completed ? el.push(todo) : el.unshift(todo);

    this.setState(prevState => ({
      todos: [...el],
      doneTodo: todo.completed
        ? this.state.doneTodo + 1
        : this.state.doneTodo - 1,
      inPTodo: todo.completed ? this.state.inPTodo - 1 : this.state.inPTodo + 1,
    }));
    // console.log(this.state.todos.indexOf(todo));
  };

  /**Edit Todo */
  showEditMode = todo => {
    // console.log(this.state.todos, todo);
    this.setState(prevState => ({
      todos: prevState.todos.map(t => {
        if (todo.id === t.id) {
          return { ...t, showEdit: !todo.showEdit };
        } else {
          return t;
        }
      }),
    }));
  };
  onEdit = todo => {
    this.setState({
      todos: this.state.todos.map(t => (todo.id === t.id ? todo : t)),
    });
  };

  /**Filter */
  getFilter = todos => {
    switch (this.state.filter) {
      case "inProgress":
        return todos.filter(t => !t.completed);
      case "done":
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  };
  changeFilter = filter => {
    this.setState({ filter });
  };

  /**Type */
  typeHandler = todos => {
    this.setState({ type: todos });
  };

  render() {
    return (
      <div className="App">
        <Header
          all={this.state.todos.length}
          done={this.state.doneTodo}
          inprogress={this.state.inPTodo}
          value={this.state.filter}
          onChange={this.changeFilter}
        />

        <AddTodo
          addTodo={this.AddTodoHandler}
          AddTodoOnChange={this.AddTodoOnChangeHandler}
          value={this.state.todo}
          type={this.state.type}
          typeH={this.typeHandler}
        />

        {this.getFilter(this.state.todos).map((todo, index) => (
          <TodoList
            key={todo.id}
            list={todo}
            type={todo.todoType}
            removeTodo={this.removeTodoHandler}
            doneTodo={this.doneTodoHandler}
            editTodo={this.showEditMode}
            onEdit={this.onEdit}
          />
        ))}
      </div>
    );
  }
}

export default App;
