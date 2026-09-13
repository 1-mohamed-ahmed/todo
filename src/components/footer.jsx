import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from "../contexts/todosContext";

export default function Footer({ updateTodoData, setUpdateTodoData }) {
  const { todos, setTodos, showSnackbar } = useContext(TodosContext);

  const [inputTitle, setInputTitle] = useState(
    () => updateTodoData?.title || "",
  );

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedInput = inputTitle.trim();
    if (!trimmedInput) return;

    if (updateTodoData) {
      const updatedTodos = todos.map((todo) =>
        todo.id === updateTodoData.id ? { ...todo, title: trimmedInput } : todo,
      );

      setTodos(updatedTodos);
      showSnackbar("تم تعديل المهمة! ✅", "success");
      setUpdateTodoData(null);
    } else {
      const newTodo = {
        id: uuidv4(),
        title: trimmedInput,
        subTitle: "",
        isCompleted: false,
      };

      setTodos([...todos, newTodo]);
      showSnackbar("تم إضافة المهمة! ✅", "success");
    }

    setInputTitle("");
  }

  return (
    <div className="pt-5">
      <form className="flex flex-row-reverse px-2 pb-6" onSubmit={handleSubmit}>
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
          {updateTodoData ? "تعديل" : "إضافة"}
        </button>
      </form>
    </div>
  );
}
