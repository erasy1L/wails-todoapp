import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./styles.module.scss";
import AddTaskModal from "@/features/add-task-modal";
import TaskList from "@/widgets/task-list";
import TaskFilter from "@/features/task-filter";
import { FilterTasksByStatus, ListTasks } from "wailsjs/go/app/App";
import useTasksStore from "./store/store";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const tasks = useTasksStore();

    useEffect(() => {
        if (tasks.currStatusFilter == undefined) {
            ListTasks().then((res) => {
                tasks.set(res);
            });
        } else {
            FilterTasksByStatus(tasks.currStatusFilter).then((res) => {
                tasks.set(res);
            });
        }
    }, [tasks.currStatusFilter]);

    return (
        <div className={styles.main}>
            <div className={styles.banner}>
                <h2>Welcome back!</h2>
                <p>Here's a list of your tasks</p>
            </div>

            <div className={styles.dashboard}>
                <div className={styles["dashboard__header"]}>
                    <TaskFilter />
                    <button
                        type="button"
                        className={styles.btn}
                        onClick={() => setIsOpen(true)}
                    >
                        Add todo
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="modal"
                            style={{
                                width: "100%",
                            }}
                            initial={{
                                scale: 0.95,
                                opacity: 0.7,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                            }}
                            exit={{
                                scale: 0.95,
                                opacity: 0.7,
                            }}
                            transition={{
                                duration: 0.15,
                            }}
                        >
                            <AddTaskModal key="modal" setIsOpen={setIsOpen} />
                        </motion.div>
                    ) : (
                        <TaskList tasks={tasks.tasks} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default App;
