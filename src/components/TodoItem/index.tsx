import React from "react";
import classNames from "classnames";
import { TodoListProps } from "../TodoList";
import Edit from "../../../public/icons/edit.svg";
import Delete from "../../../public/icons/delete.svg";
import styles from "./styles.module.scss";

interface TodoItemsProps {
  index: number;
  todo: TodoListProps;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
  onClick: () => void;
  isLast: boolean;
};

const TodoItem: React.FC<TodoItemsProps> = ({ index, todo, onEdit, onDelete, onToggle, onClick, isLast }) => {
  return (
    <div className={styles.todoItem}>
      <div className={classNames(styles.todoItem__container, {
        [styles.todoItem__container_last]: isLast,
      })}>
        <input type="checkbox" checked={todo.completed} onChange={onToggle} />
        <div 
          className={classNames(styles.todoItem__info, {
            [styles.todoItem__info_checked]: todo.completed,
          })}
          onClick={onClick}
        >
          <span>
            <p>{todo.title}</p>
            <span>#{index}</span>
          </span>
          <p>{todo.description}</p>
        </div>
        <div className={styles.todoItem__actions}>
          <button onClick={onEdit}>
            <Edit />
          </button>
          <button onClick={onDelete}>
            <Delete />
          </button>
        </div>
        </div>
    </div>
  );
};

export default TodoItem;