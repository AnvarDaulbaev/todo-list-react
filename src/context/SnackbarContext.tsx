'use client';

import React from "react";

type SnackbarType = "error" | "success" | "delete";

interface SnackbarContextProps {
  showSnackbar: (message: string, type: SnackbarType, timeout: number, onUndo?: () => void) => void;
  snackbarMessage: string | null;
  snackbarType: SnackbarType | null;
  snackbarTimeout: number;
  undoDelete: () => void;
};

const SnackbarContext = React.createContext<SnackbarContextProps | undefined>(undefined);

export const SnackbarProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [undo, setUndo] = React.useState<(() => void) | null>(null);
  const [snackbarTimeout, setSnackbarTimeout] = React.useState<number>(0);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string | null>(null);
  const [snackbarType, setSnackbarType] = React.useState<SnackbarType | null>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const showSnackbar = (message: string, type: SnackbarType, timeout: number, onUndo?: () => void) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarTimeout(timeout);

    if (type === "delete" && onUndo) {
      setUndo(() => onUndo);
    } else {
      setUndo(null);
    }

    timeoutRef.current = setTimeout(() => {
      setSnackbarMessage(null);
      setUndo(null);
      timeoutRef.current = null;
    }, timeout);
  };

  const undoDelete = () => {
    if (undo) undo();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSnackbarMessage(null);
    setUndo(null);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, snackbarMessage, snackbarType, snackbarTimeout, undoDelete }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextProps => {
  const context = React.useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  };

  return context;
};