// =========== COMPONENTS =============

import Card from "./components/card";
import Footer from "./components/footer";
import Header from "./components/header";

//  =========== OTHER =============
import { TodosContext } from "./contexts/todosContext";
import { useState, useEffect } from "react";

function App() {
  //  =========== STATES =============
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [state, setState] = useState("all");
  const [input, setInput] = useState("");
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //  =========== ========= =============

  function filterTodos() {
    if (state === "all") {
      return todos;
    } else if (state === "completed") {
      const completedTodos = todos.filter((todo) => todo.isCompleted);

      return completedTodos;
    } else if (state === "unCompleted") {
      const filteredTodos = todos.filter((todo) => !todo.isCompleted);
      return filteredTodos;
    } else {
      return [];
    }
  }

  return (
    <TodosContext.Provider
      value={{
        todos: todos,
        setTodos: setTodos,
        state: state,
        setState: setState,
        filterTodos: filterTodos,
        input: input,
        setInput: setInput,
        updateId: updateId,
        setUpdateId: setUpdateId,
      }}
    >
      <div className="w-full p-3 min-h-screen overflow-hidden sm:flex items-center justify-center sm:bg-black">
        <div className="w-full h-full bg-white sm:w-1/2 md:w-1/2  rounded-[10px] pt-13 px-3 ">
          <Header />
          <Card />
          <Footer />
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
