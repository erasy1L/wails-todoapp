import { task } from "wailsjs/go/models";

export type Filter = {
    id: number;
    title: string;
    filterStatus: task.Status;
};

export const filters: Record<number, Filter> = {
    1: {
        id: 1,
        title: "To do",
        filterStatus: task.Status.todo,
    },
    2: {
        id: 2,
        title: "Done",
        filterStatus: task.Status.done,
    },
};

export const filtersList = Object.values(filters);

export const getFilterById = (id: number) => filters[id];
