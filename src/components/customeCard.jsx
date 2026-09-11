//  =========== ICONS UI =============

import { Trash, Pencil, Check } from "lucide-react";

//  =========== OTHER =============

import { TodosContext } from "../contexts/todosContext";
import { useState, useContext } from "react";
//  =========== =============== =============

//  =========== MATERIAL UI =============
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//  =========== ============= =============

export default function CustomeCard({ todoList }) {
  // useState
  const myContext = useContext(TodosContext);
  const [isOpen, setIsOpen] = useState(false);

  const bg = todoList.isCompleted ? "bg-white" : "bg-[#80bb40]";
  const iconColor = todoList.isCompleted ? "#80bb40" : "white";
  const completed = todoList.isCompleted ? "line-through" : "";

  // ======= FUNCTIONS =========

  // Add new task
  function addNewTask(id) {
    const updateCompleted = myContext.todos.map((t) => {
      if (t.id == id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    myContext.setTodos(updateCompleted);
  }

  // delete task
  function handleClose() {
    setIsOpen(false);
  }

  function deleteTodo(taskId) {
    myContext.setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== taskId);
      myContext.setTodos(updatedTodos);
      return updatedTodos;
    });

    setIsOpen(false);
  }

  function handleUpdate(taskId) {
    const todo = myContext.todos.find((todo) => todo.id === taskId);
    myContext.setInput(todo.title);
    myContext.setUpdateId(todo.id);
  }

  return (
    <div className=" flex justify-between bg-(--color-card) items-center my-8 px-3 transition-all duration-150 ease-out py-3 hover:py-6 rounded-lg hover:shadow-xl/20">
      <div className="buttons flex-1 flex justify-between py-6">
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="border-4 border-delete rounded-full hover:opacity-85  p-2 bg-white cursor-pointer hover:shadow-xl/20"
        >
          <Trash color="var(--delete-color)" size={20} />
        </button>
        <button
          onClick={() => handleUpdate(todoList.id)}
          className="border-4 border-update hover:opacity-85  rounded-full p-2 bg-white  cursor-pointer hover:shadow-xl/20"
        >
          <Pencil color="var(--color-card)" size={20} />
        </button>
        <button
          onClick={() => {
            addNewTask(todoList.id);
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
          {todoList.title}
        </h1>
        <p className="text-gray-300">{todoList.subTitle}</p>
      </div>
      {/* Delete Dialog */}
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>حذف المهمة</DialogTitle>

        <DialogContent>
          <DialogContentText>هل أنت متأكد من حذف هذه المهمة؟</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>إلغاء</Button>

          <Button
            onClick={() => deleteTodo(todoList.id)}
            color="error"
            autoFocus
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
