import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleTodo } from "../actions";
import { getVisibleTodos } from "../reducers";
import TodoList from "./TodoList";

const mapStateToProps = (state, { match }) => ({
  todos: getVisibleTodos(state, match.params.filter || "all")
});

const visibleToDoList = withRouter(
  connect(
    mapStateToProps,
    { onTodoClick: toggleTodo }
  )(TodoList)
);

export default visibleToDoList;
