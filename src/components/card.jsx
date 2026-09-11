import CustomeCard from "./customeCard";
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";

export default function Card() {
  const myContext = useContext(TodosContext);
  const cardItem = myContext.filterTodos().map((todo) => {
    return <CustomeCard key={todo.id} todoList={todo} />;
  });

  return <div className="h-150  sm:h-137.5 overflow-y-auto">{cardItem}</div>;
}
