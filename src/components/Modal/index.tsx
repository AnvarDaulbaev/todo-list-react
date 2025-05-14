import React from "react";
import { useModal } from "@/context/ModalContext";
import { useSnackbar } from "@/context/SnackbarContext";
import { TodoListProps } from "../TodoList";
import styles from "./styles.module.scss";

const Modal = ({
  onAdd,
  onUpdate
}: {
  onAdd: (todo: Omit<TodoListProps, "id" | "completed">) => void;
  onUpdate: (todo: TodoListProps) => void;
}) => {
  const { showSnackbar } =useSnackbar()
  const { modal, closeModal } = useModal();
  const [title, setTitle] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [description, setDescription] = React.useState("");
  const modalRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (modal?.type === "edit" || modal?.type === "view") {
      setTitle(modal.todo.title);
      setDescription(modal.todo.description);
      setDeadline(modal.todo.deadline);
    } else if (modal?.type === "create") {
      setTitle("");
      setDescription("");
      setDeadline("");
    }
  }, [modal]);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      };
    };
      
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!modal) return null;

  const isReadOnly = modal.type === "view";

  const handleSubmit = () => {
    if (!title || !description || !deadline) {
      showSnackbar("Please fill in the fields", "error", 3000);
      return;
    }

    if (!title.trim() || !description.trim()) return;

    if (modal.type === "create") {
      onAdd({ title, description, deadline });
    }

    if (modal.type === "edit" && modal.todo) {
      onUpdate({
        ...modal.todo,
        title,
        description,
        deadline
      });
    }

    closeModal();
  };

  const handleDelete = () => {
    if (modal.type === "delete" && modal.onDelete) {
      modal.onDelete();
      closeModal();
    }
  };

  return (
    <div className={styles.modal}>
      <div ref={modalRef} className={styles.modal__container}>
        <div className={styles.modal__title}>
          <h3>
            {modal.type === "create" && "New note"}
            {modal.type === "edit" && "Edit note"}
            {modal.type === "view" && "View note"}
            {modal.type === "delete" && "Delete note"}
          </h3>
          <span onClick={closeModal}>X</span>
        </div>
        {(modal.type === "create" || modal.type === "edit" || modal.type === "view") && (
          <>
            <div className={styles.modal__form}>
              <label>Caption</label>
              <input
                type="text"
                placeholder="Caption"
                value={title}
                onChange={e => setTitle(e.target.value)}
                disabled={isReadOnly}
              />
            </div>
            <div className={styles.modal__form}>
              <label>Description</label>
              <textarea
                rows={5}
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                disabled={isReadOnly}
              />
            </div>
            <div className={styles.modal__form}>
              <label>Deadline date</label>
              <input
                type="date"
                value={deadline}
                placeholder=""
                onChange={e => setDeadline(e.target.value)}
                disabled={isReadOnly}
              />
            </div>
          </>
        )}
        {modal.type === "delete" && modal.todo && (
          <div className={styles.modal__delete}>
            <p>Are you sure you want to delete <strong>{modal.todo.title}</strong>?</p>
          </div>
        )}
        <div className={styles.modal__btn}>
          <button onClick={closeModal}>
            Cancel
          </button>
          {modal.type === "view" ? null : modal.type === "delete" ? (
            <button onClick={handleDelete}>
              Delete
            </button>
          ) : (
            <button onClick={handleSubmit}>
              {modal.type === "create" ? "Apply" : "Save"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
