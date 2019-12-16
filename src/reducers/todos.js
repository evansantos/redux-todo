import { combineReducers } from "redux";
import todo from "./todo";

const byId = (state = {}, action) => {
  switch (action.type) {
    case "ADD_TODO":
    case "TOGGLE_TODO":
      return { ...state, [action.id]: todo(state[action.id], action) };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.id];

    default:
      return state;
  }
};

const todos = combineReducers({
  byId,
  allIds
});

const getAllTodos = state => state.allIds.map(id => state.byId[id]);

export const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos(state);
  switch (filter) {
    case "active":
      return allTodos.filter(t => !t.completed);

    case "completed":
      return allTodos.filter(t => t.completed);

    case "all":
      return allTodos;

    default:
      return new Error(`Unknown filter: ${filter}.`);
  }
};

export default todos;
