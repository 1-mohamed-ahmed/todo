import { Trash, Pencil, Check } from "lucide-react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const isCompleted = todo.isCompleted;
  const bgClass = isCompleted ? "bg-white" : "bg-[#80bb40]";
  const iconColor = isCompleted ? "#80bb40" : "white";
  const titleClass = isCompleted ? "line-through text-gray-400" : "text-white";

  return (
    <div className="flex justify-between bg-(--color-card) items-center my-4 px-3 py-3 rounded-lg hover:shadow-xl/20 transition-all duration-150 ease-out hover:py-4">
      <div className="buttons flex items-center gap-3">
        <button
          onClick={() => onDelete(todo)}
          className="border-2 border-delete rounded-full p-2 bg-white cursor-pointer hover:opacity-80 transition-opacity"
          title="حذف"
        >
          <Trash color="var(--delete-color)" size={18} />
        </button>

        <button
          onClick={() => onEdit(todo)}
          className="border-2 border-update rounded-full p-2 bg-white cursor-pointer hover:opacity-80 transition-opacity"
          title="تعديل"
        >
          <Pencil color="var(--color-card)" size={18} />
        </button>

        <button
          onClick={() => onToggle(todo.id)}
          className={`border-2 border-(--color-complete) rounded-full p-2 ${bgClass} cursor-pointer hover:opacity-80 transition-opacity`}
          title={isCompleted ? "إلغاء الإكمال" : "إكتملت"}
        >
          <Check color={iconColor} size={18} />
        </button>
      </div>

      <div className="card-content flex-1 text-end pl-4">
        <h3
          className={`text-[17px] font-medium pb-1 overflow-hidden ${titleClass}`}
        >
          {todo.title}
        </h3>
        {todo.subTitle && (
          <p className="text-gray-300 text-sm">{todo.subTitle}</p>
        )}
      </div>
    </div>
  );
}
