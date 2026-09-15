import { useState, useReducer, useCallback, useMemo, useEffect } from "react";
import { TodosContext } from "./todosContext";

// import ShowDialog from "../components/dialog";
import ShowSnackbar from "../components/snackBar";
import reducer from "../reducers/todosReducer";

export const TodosProvider = ({ children }) => {
  const [todos, todosDispatch] = useReducer(reducer, []);
  const [state, setState] = useState("all");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  // ====================
  // static function
  // ====================

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      todosDispatch({
        type: "loaded",
        payload: JSON.parse(savedTodos),
      });
    }
  }, []);

  // ========================================

  const filteredTodos = useMemo(() => {
    if (state === "all") return todos;

    if (state === "completed") return todos.filter((todo) => todo.isCompleted);
    else return todos.filter((todo) => !todo.isCompleted);
  }, [state, todos]);

  const showSnackbar = useCallback((message) => {
    setSnackbar({ open: true, message: message });
  }, []);

  // =================
  // context value
  // =================

  const contextValue = useMemo(() => {
    return {
      showSnackbar: showSnackbar,
      dispatch: todosDispatch,
      setState: setState,
      filteredTodos: filteredTodos,
    };
  }, [showSnackbar, filteredTodos]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}

      {/* {todoToDelete !== null && (
        <ShowDialog
          todo={todoToDelete}
          handleClose={() => setTodoToDelete(null)}
          deleteTodo={deleteTodo}
        />
      )} */}

      <ShowSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
    </TodosContext.Provider>
  );
};
