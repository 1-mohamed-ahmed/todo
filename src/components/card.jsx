// import CustomeCard from "./customeCard";
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";
import { useMemo } from "react";
import { Trash, Pencil, Check } from "lucide-react";

export default function Card({ setTodoToDelete }) {
  // useState
  const myContext = useContext(TodosContext);

  // ======= FUNCTIONS =========

  // Add new task
  function toggleTodo(id) {
    const todo = myContext.todos.find((t) => t.id === id);
    const newCompletedState = !todo.isCompleted;
    const updateCompleted = myContext.todos.map((t) => {
      if (t.id == id) {
        // showSnackbar("تم إكمال المهمة بنجاح! ✅", "success");
        return {
          ...t,
          isCompleted: newCompletedState,
        };
      }
      return t;
    });
    myContext.setTodos(updateCompleted);
    if (newCompletedState) {
      myContext.showSnackbar("تم إكمال المهمة بنجاح! ✅", "success");
    } else {
      myContext.showSnackbar("تم إلغاء إكمال المهمة", "info");
    }
  }

  function handleUpdate(taskId) {
    const todo = myContext.todos.find((todo) => todo.id === taskId);
    myContext.setInput(todo.title);
    myContext.setUpdateId(todo.id);
  }

  const filterTodos = useMemo(() => {
    if (myContext.state === "all") {
      return myContext.todos;
    } else if (myContext.state === "completed") {
      const completedTodos = myContext.todos.filter((todo) => todo.isCompleted);

      return completedTodos;
    } else if (myContext.state === "unCompleted") {
      const filteredTodos = myContext.todos.filter((todo) => !todo.isCompleted);
      return filteredTodos;
    } else {
      return [];
    }
  }, [myContext.state, myContext.todos]);

  const cardItem = filterTodos.map((todo) => {
    const bg = todo.isCompleted ? "bg-white" : "bg-[#80bb40]";
    const iconColor = todo.isCompleted ? "#80bb40" : "white";
    const completed = todo.isCompleted ? "line-through" : "";
    return (
      <div
        key={todo.id}
        className=" flex justify-between bg-(--color-card) items-center my-8 px-3 transition-all duration-150 ease-out py-3 hover:py-6 rounded-lg hover:shadow-xl/20"
      >
        <div className="buttons flex-1 flex justify-between py-6">
          <button
            onClick={() => {
              setTodoToDelete(todo);
            }}
            className="border-4 border-delete rounded-full hover:opacity-85  p-2 bg-white cursor-pointer hover:shadow-xl/20"
          >
            <Trash color="var(--delete-color)" size={20} />
          </button>
          <button
            onClick={() => handleUpdate(todo.id)}
            className="border-4 border-update hover:opacity-85  rounded-full p-2 bg-white  cursor-pointer hover:shadow-xl/20"
          >
            <Pencil color="var(--color-card)" size={20} />
          </button>
          <button
            onClick={() => {
              toggleTodo(todo.id);
            }}
            className={`border-4 border-(--color-complete) hover:opacity-85 rounded-full p-2 ${bg} cursor-pointer hover:shadow-xl/20`}
          >
            <Check color={iconColor} size={20} />
          </button>
        </div>
        <div className="card-content flex-4 text-end">
          <h1
            className={`text-[17px] text-white pb-2 overflow-hidden ${completed} `}
          >
            {todo.title}
          </h1>
          <p className="text-gray-300">{todo.subTitle}</p>
        </div>
      </div>
    );
  });

  return (
    <div className={`max-h-100 sm:max-h-120 overflow-y-auto`}>{cardItem}</div>
  );
}
