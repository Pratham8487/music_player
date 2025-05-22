// import React, { createContext, useContext, useState, type ReactNode } from 'react';

// interface QueueContextType {
//   queue: string[];
//   addToQueue: (id: string) => void;
//   removeFromQueue: (id: string) => void;
//   clearQueue: () => void;
// }

// const QueueContext = createContext<QueueContextType | undefined>(undefined);

// export const QueueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [queue, setQueue] = useState<string[]>([]);

//   const addToQueue = (id: string) => {
//     setQueue((prev) => {
//       if (!prev.includes(id)) {
//         console.log("Adding to queue:", id);
//         return [...prev, id];
//       }
//       console.log("Already in queue:", id);
//       return prev;
//     });
//   };

//   const removeFromQueue = (id: string) => {
//     setQueue((prev) => prev.filter((item) => item !== id));
//   };

//   const clearQueue = () => {
//     setQueue([]);
//   };

//   return (
//     <QueueContext.Provider value={{ queue, addToQueue, removeFromQueue, clearQueue }}>
//       {children}
//     </QueueContext.Provider>
//   );
// };

// export const useQueue = () => {
//   const context = useContext(QueueContext);
//   if (context === undefined) {
//     throw new Error('useQueue must be used within a QueueProvider');
//   }
//   return context;
// };

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface QueueContextType {
  queue: string[];
  addToQueue: (id: string) => void;
  removeFromQueue: (id: string) => void;
  clearQueue: () => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "video_queue";

export const QueueProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [queue, setQueue] = useState<string[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(queue));
  }, [queue]);

  const addToQueue = (id: string) => {
    setQueue((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const removeFromQueue = (id: string) => {
    setQueue((prev) => prev.filter((item) => item !== id));
  };

  const clearQueue = () => {
    setQueue([]);
  };

  return (
    <QueueContext.Provider
      value={{ queue, addToQueue, removeFromQueue, clearQueue }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (context === undefined) {
    throw new Error("useQueue must be used within a QueueProvider");
  }
  return context;
};
