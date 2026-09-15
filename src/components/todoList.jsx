import Header from "./header";
import TodoItem from "./todoItem";
import { TodosContext } from "../contexts/todosContext";

import { useState, useContext } from "react";

export default function TodoList() {
  const [inputTitle, setInputTitle] = useState("");
  const [updated, setUpdated] = useState(null);
  const { showSnackbar, dispatch, filteredTodos } = useContext(TodosContext);

  function handleAddNewTodo() {
    dispatch({
      type: "added",
      payload: {
        inputTitle: inputTitle,
      },
    });
    setInputTitle("");
    showSnackbar("تمت إضافة المهمة بنجاح");
  }

  function handleDelete(todo) {
    dispatch({
      type: "deleted",
      payload: {
        id: todo.id,
      },
    });
    showSnackbar("تمت حذف المهمة بنجاح");
  }

  function handleUpdate(todo) {
    setUpdated(todo);
    setInputTitle(todo.title);
  }

  function handleComplete(todoId) {
    dispatch({
      type: "isCompleted",
      payload: todoId,
    });
  }

  return (
    <>
      <div className="w-full h-full bg-white sm:w-1/2 md:w-1/2 rounded-[10px] pt-13 px-3">
        <Header />

        <div className="max-h-100 sm:max-h-120 overflow-y-auto px-1">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              handleComplete={handleComplete}
            />
          ))}
        </div>

        <div className="pt-5">
          <form
            className="flex flex-row-reverse px-2 pb-6"
            onSubmit={(event) => {
              event.preventDefault();

              if (updated !== null) {
                dispatch({
                  type: "updated",
                  payload: { id: updated.id, newInputTitle: inputTitle },
                });
                setInputTitle("");
                showSnackbar("تمت تعديل المهمة بنجاح");

                setUpdated(null);
                return;
              }

              handleAddNewTodo();
            }}
          >
            <input
              type="search"
              placeholder="عنوان المهمة"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              className="flex-1 border-none bg-gray-200 p-3 ml-2 rounded-lg focus:outline-none"
            />

            <button
              type="submit"
              className="w-24 p-2 bg-delete text-white rounded-lg cursor-pointer hover:bg-[#98163d] transition duration-200 ease-in"
            >
              {updated != null ? "تعديل" : "إضافة"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
