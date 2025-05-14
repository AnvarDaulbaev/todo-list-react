import React from "react";
import styles from "./styles.module.scss";

const Title = ({ title = "todo list" }: { title?: string }) => {
  return (
    <h1 className={styles.title}>{title}</h1>
  )
};

export default Title;