import { useContext, useMemo } from "react";
import { TodosContext } from "../contexts/todosContext";
import TodoItem from "./todoItem";

export default function TodoList({ onEditTodo }) {
  const { todos, setTodos, state, setTodoToDelete, showSnackbar } =
    useContext(TodosContext);

  function handleToggleTodo(id) {
    const targetTodo = todos.find((t) => t.id === id);
    if (!targetTodo) return;

    const nextCompletedState = !targetTodo.isCompleted;

    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, isCompleted: nextCompletedState } : t,
    );

    setTodos(updatedTodos);

    if (nextCompletedState) {
      showSnackbar("تم إكمال المهمة بنجاح! ✅", "success");
    } else {
      showSnackbar("تم إلغاء إكمال المهمة", "info");
    }
  }

  const filteredTodos = useMemo(() => {
    switch (state) {
      case "completed":
        return todos.filter((todo) => todo.isCompleted);
      case "unCompleted":
        return todos.filter((todo) => !todo.isCompleted);
      default:
        return todos;
    }
  }, [state, todos]);

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        لا توجد مهام لعرضها حالياً
      </div>
    );
  }

  return (
    <div className="max-h-100 sm:max-h-120 overflow-y-auto px-1">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggleTodo}
          onDelete={setTodoToDelete}
          onEdit={onEditTodo}
        />
      ))}
    </div>
  );
}
