import { useState } from "react";
import Header from "./components/header";
import TodoList from "./components/card";
import Footer from "./components/footer";
import { TodosProvider } from "./contexts/todosProvider";

function App() {
  const [updateTodoData, setUpdateTodoData] = useState(null);

  return (
    <TodosProvider>
      <div className="w-full p-3 min-h-screen overflow-hidden sm:flex items-center justify-center sm:bg-black">
        <div className="w-full h-full bg-white sm:w-1/2 md:w-1/2 rounded-[10px] pt-13 px-3">
          <Header />

          <TodoList onEditTodo={setUpdateTodoData} />

          <Footer
            key={updateTodoData ? updateTodoData.id : "new-todo"}
            updateTodoData={updateTodoData}
            setUpdateTodoData={setUpdateTodoData}
          />
        </div>
      </div>
    </TodosProvider>
  );
}

export default App;
