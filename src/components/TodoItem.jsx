import React, { useContext } from "react";
import { Context } from "../main";

const TodoItem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  const { loading } = useContext(Context);
  return (
    <div className="todo">
      <div className="todo_task">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className="todo_delete">
        <input
          onChange={() => updateHandler(id)}
          disabled={loading}
          type="checkbox"
          checked={isCompleted}
        />
        <button onClick={() => deleteHandler(id)} className="btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
