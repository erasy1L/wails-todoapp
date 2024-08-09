import {
    ChangeEvent,
    MouseEvent,
    useState,
    FormEvent,
    useCallback,
} from "react";
import { Variants, motion } from "framer-motion";
import styles from "./styles.module.scss";
import TaskChangePriority from "@/features/task-change-priority";
import { task } from "wailsjs/go/models";
import { DeleteTask, UpdateTask } from "wailsjs/go/app/App";
import { MAX_DESCRIPTION_LENGTH } from "@/shared/helpers/constants";
import Checkbox from "@/shared/ui/checkbox";
import TaskDatePick from "@/features/task-date-pick";
import TaskDelete from "@/features/task-delete";
import useTasksStore from "@/app/store/store";
import TaskTextarea from "@/features/task-textarea";

const taskVariants: Variants = {
    expanded: {
        height: "100%",
    },
    closed: {
        height: "64px",
    },
};

const taskHeaderVariants: Variants = {
    expanded: {
        clipPath: "inset(0% -0.76% 0% -0.76% round 10px)",
        display: "flex",
    },
    closed: {
        clipPath: "inset(0% 0% 100.00% 0% round 10px)",
        transitionEnd: {
            display: "none",
        },
    },
};

export default function TaskRow({ data }: { data: task.Task }) {
    const removeTaskFromStore = useTasksStore((state) => state.remove);

    const [isExpand, setIsExpand] = useState(false);

    const [
        { title, status, description, priority, started_at, completed_at },
        setFormData,
    ] = useState<task.Request>({
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        started_at: data.started_at,
        completed_at: data.completed_at,
    });

    const onChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (
            e.target instanceof HTMLTextAreaElement &&
            e.target.value.length <= MAX_DESCRIPTION_LENGTH
        )
            setFormData((state) => ({ ...state, description: e.target.value }));

        if (e.target instanceof HTMLInputElement)
            setFormData((state) => ({ ...state, title: e.target.value }));
    };

    const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        UpdateTask(data.id, {
            title,
            description,
            status: data.status,
            priority: priority,
            started_at: started_at,
            completed_at: completed_at,
        })
            .then(() => console.log(`Updated task ${data.id}`))
            .catch((e) => console.log(e));

        setIsExpand(false);
    };

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

    const handleCheckboxChange = useCallback(
        (isChecked: boolean) => {
            UpdateTask(data.id, {
                title,
                description,
                status: isChecked ? task.Status.done : task.Status.todo,
                priority: priority,
                started_at: started_at,
                completed_at: new Date().toISOString(),
            })
                .then(() => {
                    if (isChecked) {
                        setFormData((state) => ({
                            ...state,
                            completed_at: new Date().toISOString(),
                        }));
                    }

                    console.log(
                        `Marked task ${data.id} as ${
                            isChecked
                                ? task.Status.done + " ✅"
                                : task.Status.todo + " ❌"
                        }`
                    );
                })
                .catch((e) => console.log(e));
        },
        [
            UpdateTask,
            completed_at,
            data.id,
            description,
            priority,
            setFormData,
            started_at,
            title,
        ]
    );

    const handleDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        DeleteTask(data.id)
            .then(() => {
                removeTaskFromStore(data.id);
                console.log(`Deleted task ${data.id}`);
            })
            .catch((e) => console.log(e));
    };

    return (
        <motion.div
            variants={taskVariants}
            animate={isExpand ? "expanded" : "closed"}
            className={styles.task}
            onClick={() => {
                setIsExpand(true);
            }}
        >
            <form
                action=""
                method="post"
                onSubmit={onSubmitHandle}
                className={styles["add-todo-modal-inner"]}
            >
                <div className={styles["task-header"]}>
                    <div
                        style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Checkbox
                            defaultChecked={
                                status == task.Status.todo ? false : true
                            }
                            handleCheckboxChange={handleCheckboxChange}
                        />
                    </div>
                    <input
                        value={title}
                        onChange={onChange}
                        className={styles["task-input"]}
                        style={{
                            border: isExpand
                                ? "1px #222428 solid"
                                : "1px transparent solid",
                        }}
                    />
                    <TaskChangePriority
                        placeholder={priority}
                        setFormData={setFormData}
                    />
                    <TaskDelete handleClick={handleDeleteClick} />
                </div>
                <motion.div
                    initial={false}
                    className={styles["task-content"]}
                    variants={taskHeaderVariants}
                >
                    <TaskDatePick
                        startedAt={started_at}
                        completedAt={completed_at}
                        handleDateChange={handleDateChange}
                    />
                    <TaskTextarea
                        description={description}
                        setFormData={setFormData}
                    />

                    <div className={styles["buttons-wrapper"]}>
                        <button
                            type="button"
                            className={styles["close-btn"]}
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation();
                                setIsExpand(false);
                            }}
                        >
                            Close
                        </button>
                        <button type="submit" className={styles["edit-btn"]}>
                            Edit
                        </button>
                    </div>
                </motion.div>
            </form>
        </motion.div>
    );
}
