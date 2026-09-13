//  =========== GENERAT SPECIAL ID =============
import { v4 as uuidv4 } from "uuid";
//  =========== ============ =============

//  =========== OTHER =============
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";
//  =========== ======= =============

export default function Footer() {
  const myContext = useContext(TodosContext);

  function handleSubmit(event) {
    event.preventDefault();

    if (!myContext.input.trim()) return;

    if (myContext.updateId !== null) {
      const updateTodo = myContext.todos.map((todo) => {
        if (myContext.updateId == todo.id) {
          return {
            ...todo,
            title: myContext.input,
          };
        } else {
          return todo;
        }
      });
      myContext.showSnackbar("تم تعديل المهمة! ✅", "success");

      myContext.setTodos(updateTodo);
      myContext.setUpdateId(null);
      // localStorage.setItem("todos", JSON.stringify(updateTodo));
      myContext.setInput("");
      return;
    }

    addTask(myContext.input);
    myContext.showSnackbar("تم اضافة المهمة! ✅", "success");

    myContext.setInput("");
  }

  function addTask(value) {
    const newTodo = {
      id: uuidv4(),
      title: value,
      subTitle: "",
      isCompleted: false,
    };
    const updateTodos = [...myContext.todos, newTodo];
    myContext.setTodos(updateTodos);
    // localStorage.setItem("todos", JSON.stringify(updateTodos));
  }

  return (
    <div className="pt-5">
      <form
        className="flex flex-row-reverse px-2 pb-6"
        onSubmit={(event) => handleSubmit(event)}
      >
        <input
          onChange={(event) => {
            myContext.setInput(event.target.value);
          }}
          value={myContext.input}
          type="search"
          placeholder="عنوان المهمة"
          className="flex-1 border-none bg-gray-200 p-3 ml-2 rounded-lg focus:outline-none"
        />

        <button
          // onClick={handleOnChange}
          type="submit"
          className="w-24 p-2 bg-delete text-white rounded-lg cursor-pointer hover:bg-[#98163d] transition duration-200 ease-in"
        >
          اضافة
        </button>
      </form>
    </div>
  );
}
