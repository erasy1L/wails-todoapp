import TaskRow from "@/entities/task/ui/task-row";
import styles from "./styles.module.scss";
import { task } from "wailsjs/go/models";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Loader from "@/shared/ui/loader";
import useTasksStore from "@/app/store/store";

export default function TaskList({ tasks }: { tasks: task.Task[] }) {
    const [loading, setLoading] = useState(true);

    const currStatusFilter = useTasksStore((state) => state.currStatusFilter);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300); // 300ms delay for loading simulation

        return () => clearTimeout(timer);
    }, [currStatusFilter]);

    return (
        <div className={styles["task-list"]}>
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loading"
                        className={styles["loader"]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Loader />
                    </motion.div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {tasks.length >= 1 ? (
                            tasks.map((t) => (
                                <motion.div
                                    key={t.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <TaskRow data={t} />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                className={styles["empty-list"]}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                No tasks for now
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </AnimatePresence>
        </div>
    );
}
