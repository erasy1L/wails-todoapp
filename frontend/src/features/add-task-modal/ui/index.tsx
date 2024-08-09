import React from "react";
import { FormEvent, useState } from "react";
import TaskChangePriority from "@/features/task-change-priority";
import styles from "./styles.module.scss";
import { task } from "wailsjs/go/models";
import { CreateTask } from "wailsjs/go/app/App";
import { MAX_DESCRIPTION_LENGTH } from "@/shared/helpers/constants";
import useTasksStore from "@/app/store/store";
import TaskDatePick from "@/features/task-date-pick";
import TaskTitleInput from "@/features/task-title-input";
import TaskTextarea from "@/features/task-textarea";

type AddTaskModalProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddTaskModal({ setIsOpen }: AddTaskModalProps) {
    const addTask = useTasksStore((state) => state.add);

    const [disabled, setDisabled] = useState(false);
    const [titleError, setTitleError] = useState<boolean>(false);
    const [dateError, setDateError] = useState<string>("");

    const [
        { title, status, description, priority, started_at, completed_at },
        setFormData,
    ] = useState<task.Request>({
        title: "",
        description: "",
        status: task.Status.todo,
        priority: task.Priority.low,
        started_at: "",
        completed_at: "",
    });

    const handleDateChange = (date: Date, id: string) => {
        if (id == "start-date" && date) {
            setFormData((state) => ({
                ...state,
                started_at: date.toISOString(),
            }));
        } else if (id == "completed-date" && date) {
            setFormData((state) => ({
                ...state,
                completed_at: date.toISOString(),
            }));
        }
    };

    const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (title.length == 0) {
            setTitleError(true);
            return;
        }

        if (!started_at) {
            setDateError("Please pick starting a date");
            return;
        }

        if (
            description.length <= MAX_DESCRIPTION_LENGTH &&
            title.length > 0 &&
            priority
        ) {
            CreateTask({
                title,
                description,
                status,
                priority: priority,
                started_at,
                completed_at,
            })
                .then((res) => {
                    addTask(res);
                    setDisabled(false);
                    setIsOpen(false);
                })
                .catch((e) => console.log(e));

            setDisabled(true);
        }
    };

    return (
        <div className={styles["add-todo-modal"]}>
            <form
                action=""
                method="post"
                onSubmit={onSubmitHandle}
                className={styles["add-todo-modal-inner"]}
            >
                <div className={styles["modal-header"]}>
                    <TaskTitleInput
                        title={title}
                        titleError={titleError}
                        setFormData={setFormData}
                    />
                    <TaskChangePriority setFormData={setFormData} />
                </div>
                <TaskDatePick
                    startedAt={started_at}
                    completedAt={completed_at}
                    handleDateChange={handleDateChange}
                />
                <span className={styles["date-error"]}>{dateError}</span>
                <TaskTextarea
                    description={description}
                    setFormData={setFormData}
                />
                <div className={styles["buttons-wrapper"]}>
                    <button
                        type="button"
                        className={styles["close-btn"]}
                        onClick={() => setIsOpen(false)}
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        disabled={disabled}
                        className={styles["submit-btn"]}
                    >
                        Add a task
                    </button>
                </div>
            </form>
        </div>
    );
}
