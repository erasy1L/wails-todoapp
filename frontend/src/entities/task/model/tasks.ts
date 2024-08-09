import { task } from "wailsjs/go/models";

export type Task = {
    id: string;
    title: string;
    description: string;
    status: task.Status;
    priority: task.Priority;
    started_at: Date;
    completed_at: Date;
};
