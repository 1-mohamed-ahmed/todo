import { useState, useEffect, useMemo, useCallback } from "react";
import ShowDialog from "../components/dialog";
import ShowSnackbar from "../components/snackBar";
import { TodosContext } from "./todosContext";

export const TodosProvider = ({ children }) => {
  //  =========== STATES =============
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("خطأ في جلب البيانات من localStorage:", error);
      return [];
    }
  });

  const [state, setState] = useState("all");
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const deleteTodo = useCallback(
    (taskId) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== taskId));
      setTodoToDelete(null);
      showSnackbar("تم حذف المهمة! ✅", "success");
    },
    [showSnackbar],
  );

  const contextValue = useMemo(
    () => ({
      todos,
      setTodos,
      state,
      setState,
      todoToDelete,
      setTodoToDelete,
      showSnackbar,
      deleteTodo,
    }),
    [todos, state, todoToDelete, showSnackbar, deleteTodo],
  );

  return (
    <TodosContext.Provider value={contextValue}>
      {children}

      {todoToDelete !== null && (
        <ShowDialog
          todo={todoToDelete}
          handleClose={() => setTodoToDelete(null)}
          deleteTodo={deleteTodo}
        />
      )}

      <ShowSnackbar
        handleClose={handleCloseSnackbar}
        message={snackbar.message}
        open={snackbar.open}
        severity={snackbar.severity}
      />
    </TodosContext.Provider>
  );
};
