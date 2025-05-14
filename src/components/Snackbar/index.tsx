'use client';

import React from "react";
import { useSnackbar } from "@/context/SnackbarContext";
import Undo from "../../../public/icons/undo.svg";
import styles from "./styles.module.scss";

const Snackbar = ({}) => {
  const { snackbarMessage, snackbarType, snackbarTimeout, undoDelete } = useSnackbar();
  const [progress, setProgress] = React.useState(100);
  const [secondsLeft, setSecondsLeft] = React.useState(0);

  React.useEffect(() => {
    if (snackbarType === "delete" && snackbarTimeout > 0) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const percentLeft = Math.max(0, 100 - (elapsed / snackbarTimeout) * 100);
        const timeLeft = Math.max(0, snackbarTimeout - elapsed);

        setProgress(percentLeft);
        setSecondsLeft(Math.ceil(timeLeft / 1000));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [snackbarType, snackbarTimeout, snackbarMessage]);

  if (!snackbarMessage) return null;

  return (
    <div className={`${styles.snackbar} ${styles[snackbarType || "delete"]}`}>
      {snackbarType === "delete" ? (
        <div className={styles.snackbar__undo} onClick={undoDelete}>
          <div className={styles.snackbar__timer}>
            <svg className={styles.snackbar__circle} viewBox="0 0 36 36">
              <path
                className={styles.snackbar__circle_bg}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={styles.snackbar__circle_fg}
                strokeDasharray={`${progress}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <text x="18" y="22" textAnchor="middle" className={styles.snackbar__circle_seconds}>
              {secondsLeft}
            </text>
          </div>
          <span>{snackbarMessage}</span>
          <Undo />
        </div>
      ) : (
        <span>{snackbarMessage}</span>
      )}
    </div>
  );
};

export default Snackbar;