// Components
import { TodosProvider } from "./contexts/todosProvider";
import TodoList from "./components/todoList";

function App() {
  return (
    <TodosProvider>
      <div className="w-full p-3 min-h-screen overflow-hidden sm:flex items-center justify-center sm:bg-black">
        <TodoList />
      </div>
    </TodosProvider>
  );
}

export default App;
