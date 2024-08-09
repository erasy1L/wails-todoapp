import { task } from "wailsjs/go/models";
import { create } from "zustand";

interface TasksState {
    tasks: task.Task[];
    currStatusFilter: task.Status | undefined;
    setCurrStatusFilter: (status: task.Status | undefined) => void;
    set: (tasks: task.Task[]) => void;
    add: (task: task.Task) => void;
    remove: (id: string) => void;
}

const useTasksStore = create<TasksState>((set) => ({
    tasks: [],
    currStatusFilter: undefined,
    setCurrStatusFilter: (status) => set({ currStatusFilter: status }),
    set: (tasks) => set({ tasks }),
    add: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    remove: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id != id) })),
}));

export default useTasksStore;
