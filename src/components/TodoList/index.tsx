import React from "react";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";
import { useSnackbar } from "@/context/SnackbarContext";
import TodoItem from "../TodoItem";
import Modal from "../Modal";
import styles from "./styles.module.scss";

export interface TodoListProps {
  id: number;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
};

interface TodoFilterList {
  search: string;
  filter: string;
  theme: string;
};

const TodoList: React.FC<TodoFilterList> = ({ search, filter, theme }) => {
  const { showSnackbar } = useSnackbar();
  const { openModal } = useModal();
  const [nextId, setNextId] = React.useState(1);
  const [initialized, setInitialized] = React.useState(false);
  const [todos, setTodos] = React.useState<TodoListProps[]>([]);

  const handleAdd = (todo: Omit<TodoListProps, "id" | "completed">) => {
    const newTodo = { ...todo, id: nextId, completed: false };
    setTodos(prev => [...prev, newTodo]);
    setNextId(nextId + 1);
  };

  const handleUpdate = (update: TodoListProps) => {
    setTodos(prev => prev.map(t => t.id === update.id ? update : t));
  };

  const handleDelete = (todo: TodoListProps, index: number) => {
    setTodos(prev => prev.filter(t => t.id !== todo.id));
    showSnackbar("Undo", "delete", 5000, () => {
      setTodos(prev => {
        const updated = [...prev];
        updated.splice(index, 0, todo);
        return updated;
      });
    });
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    const matchesFilter = filter === "All" || 
      (filter === "Complete" && todo.completed) ||
      (filter === "Incomplete" && !todo.completed);
    return matchesSearch && matchesFilter;
  });

  React.useEffect(() => {
    const storedTodos = localStorage.getItem("todo_data");
    const storedIndex = localStorage.getItem("todo_key");

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }

    if (storedIndex) {
      setNextId(parseInt(storedIndex, 10));
    }

    setInitialized(true);
  }, [])

  React.useEffect(() => {
    if (initialized) {
      localStorage.setItem("todo_data", JSON.stringify(todos));
      localStorage.setItem("todo_key", nextId.toString());
    }
  }, [todos, nextId]);

  return (
    <div key={theme} className={styles.todoList}>
      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo, index) => (
          <TodoItem
            key={index}
            index={index + 1}
            todo={todo}
            onEdit={() => openModal({type: "edit", todo})}
            onClick={() => openModal({type: "view", todo})}
            onDelete={() => openModal({type: "delete", todo, onDelete: () => handleDelete(todo, index)})}
            onToggle={() => setTodos(
              (prev) => prev.map(
                (item) => item.id === todo.id ? { ...item, completed: !item.completed } : item
              ))}
            isLast={index === todos.length - 1}
          />
        ))) : (
          <div className={styles.todoList__empty}>
            <Image
              width={100}
              height={100}
              quality={100}
              src={`/images/${theme}-empty.png`}
              alt="Empty"
            />
            <span>Empty...</span>
          </div>
        )}
      <div className={styles.todoList__btn}>
        <button onClick={() => openModal({type: "create"})} />
      </div>
      <Modal onAdd={handleAdd} onUpdate={handleUpdate} />
    </div>
  )
};

export default TodoList;