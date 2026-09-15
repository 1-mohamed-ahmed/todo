import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "loaded":
      return action.payload;

    case "added": {
      const trimmedInput = action.payload.inputTitle.trim();
      if (!trimmedInput) return currentTodos;

      const newTodo = {
        id: uuidv4(),
        title: trimmedInput,
        subTitle: "",
        isCompleted: false,
      };

      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "deleted": {
      const updatedTodosAfterDelete = currentTodos.filter((t) => {
        return t.id !== action.payload.id;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodosAfterDelete));

      return updatedTodosAfterDelete;
    }

    case "updated": {
      const updatedTodos = currentTodos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.newInputTitle,
          };
        }
        return todo;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "isCompleted": {
      const updatedTodos = currentTodos.map((todo) => {
        if (todo.id === action.payload) {
          const updateCompleted = !todo.isCompleted;
          return { ...todo, isCompleted: updateCompleted };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    default: {
      throw Error(`undefiend action ${action.type}`);
    }
  }
}
