// =========== COMPONENTS =============

import Card from "./components/card";
import Footer from "./components/footer";
import Header from "./components/header";
import ShowDialog from "./components/dialog";

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
  const [todoToDelete, setTodoToDelete] = useState(null);

  // save todos in localStorage automatically during use setTodos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function deleteTodo(taskId) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== taskId));

    setTodoToDelete(null);
  }

  //  =========== ========= =============

  return (
    <TodosContext.Provider
      value={{
        todos: todos,
        setTodos: setTodos,
        state: state,
        setState: setState,
        input: input,
        setInput: setInput,
        updateId: updateId,
        setUpdateId: setUpdateId,
      }}
    >
      <div className="w-full p-3 min-h-screen overflow-hidden sm:flex items-center justify-center sm:bg-black">
        <div className="w-full h-full bg-white sm:w-1/2 md:w-1/2  rounded-[10px] pt-13 px-3 ">
          <Header />

          <Card setTodoToDelete={setTodoToDelete} />
          {todoToDelete != null && (
            <ShowDialog
              todo={todoToDelete}
              handleClose={() => setTodoToDelete(null)}
              deleteTodo={deleteTodo}
            />
          )}
          <Footer />
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
