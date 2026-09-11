import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";

var initialTodos = [
  {
    id: uuidv4(),
    title: "المهمة الاولي",
    subTitle: "هذة هي المهمة الاولي",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الثانية",
    subTitle: "هذة هي المهمة الثانية",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الثالثة",
    subTitle: "هذة هي المهمة الثالثة",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الرابعة",
    subTitle: "هذة هي المهمة الرابعة",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الخامسة",
    subTitle: "هذة هي المهمة الخامسة",
    isCompleted: false,
  },
];
export const TodosContext = createContext(initialTodos);
// export formContext;
