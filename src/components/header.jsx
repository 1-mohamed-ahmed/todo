//  =========== MATERIAL UI =============
import { ButtonGroup, Button } from "@mui/material";
//  =========== ========== =============

//  =========== OTHER =============
import { TodosContext } from "../contexts/todosContext";
import { useContext } from "react";
//  =========== =========== =============

export default function Header() {
  const myContext = useContext(TodosContext);
  return (
    <div className="flex flex-col justify-center">
      <div className="head relative">
        <h1 className="absolute bottom-0 right-0 left-0 text-center text-5xl font-bold">
          مهامي
        </h1>
        <hr className="text-border-color px-2 text-[#e5e5e5]" />
      </div>

      <div className="pt-5 flex justify-center ">
        <ButtonGroup
          color="secondary"
          variant="outlined"
          aria-label="Basic button group"
        >
          <Button
            onClick={() => {
              myContext.setState("unCompleted");
            }}
          >
            غير منجز
          </Button>
          <Button
            onClick={() => {
              myContext.setState("completed");
            }}
          >
            منجز
          </Button>
          <Button
            onClick={() => {
              myContext.setState("all");
            }}
          >
            الكل
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
