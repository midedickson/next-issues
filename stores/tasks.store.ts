import { randomUUID } from "crypto";
import { create } from "zustand";

export type Status = "TODO" | "IN_PROGRESS" | "DONE";

export type State = {
  tasks: Task[];
};

export type Actions = {
  addNewTask: (title: string) => void;
  updateTask: (id: string, status: Status) => void;
  removeTask: (id: string) => void;
};

export type Task = {
  id: string;
  title: string;
  status: Status;
};

export const useTaskStore = create<State & Actions>()((set) => ({
  tasks: [],
  addNewTask: (title: string) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: randomUUID(), title: title, status: "TODO" },
      ],
    })),
  updateTask: (id: string, status: Status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),
  removeTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));
