import { Variants, motion } from "framer-motion";
import React, { MouseEvent, useState } from "react";
import styles from "./styles.module.scss";
import { task } from "wailsjs/go/models";

const variants: Variants = {
    open: {
        opacity: 1,
        y: 0,
    },
    closed: {
        opacity: 0,
        y: 20,
    },
};

type TaskChangePriorityProps = {
    placeholder?: string;
    setFormData: React.Dispatch<React.SetStateAction<task.Request>>;
};

export default function TaskChangePriority({
    placeholder,
    setFormData,
}: TaskChangePriorityProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownPlaceholder, setDropwdownPlaceholder] = useState(
        placeholder ?? "Priority"
    );

    const priorityHandle = (priority: task.Priority) => {
        setFormData((state) => ({ ...state, priority }));

        setDropwdownPlaceholder(priority);
    };

    return (
        <motion.div
            initial={false}
            className={styles["dropdown-btn"]}
            animate={isDropdownOpen ? "open" : "closed"}
            onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
            }}
            data-priority={dropdownPlaceholder}
        >
            {dropdownPlaceholder.charAt(0).toUpperCase() +
                dropdownPlaceholder.slice(1)}
            <motion.ul
                className={styles.dropdown}
                variants={{
                    open: {
                        clipPath: "inset(0% 0% 0% 0% round 10px)",
                    },
                    closed: {
                        clipPath: "inset(10% 50% 90% 50% round 10px)",
                    },
                }}
                onClick={(e: MouseEvent<HTMLUListElement>) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                }}
                style={{ pointerEvents: isDropdownOpen ? "auto" : "none" }}
            >
                <motion.li
                    variants={variants}
                    data-priority="low"
                    onClick={() => {
                        priorityHandle(task.Priority.low);
                    }}
                >
                    {task.Priority.low.charAt(0).toUpperCase() +
                        task.Priority.low.slice(1)}
                </motion.li>
                <motion.li
                    variants={variants}
                    data-priority="medium"
                    onClick={() => priorityHandle(task.Priority.medium)}
                >
                    {task.Priority.medium.charAt(0).toUpperCase() +
                        task.Priority.medium.slice(1)}
                </motion.li>
                <motion.li
                    variants={variants}
                    data-priority="high"
                    onClick={() => priorityHandle(task.Priority.high)}
                >
                    {task.Priority.high.charAt(0).toUpperCase() +
                        task.Priority.high.slice(1)}
                </motion.li>
            </motion.ul>
        </motion.div>
    );
}
