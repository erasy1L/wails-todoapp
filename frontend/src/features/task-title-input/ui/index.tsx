import React, { ChangeEvent } from "react";
import styles from "./styles.module.scss";
import { task } from "wailsjs/go/models";

type TaskTitleInputProps = {
    title: string;
    titleError: boolean;
    setFormData: React.Dispatch<React.SetStateAction<task.Request>>;
};

export default function TaskTitleInput({
    title,
    titleError,
    setFormData,
}: TaskTitleInputProps) {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((state) => ({ ...state, title: e.target.value }));
    };

    return (
        <>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={onChange}
                className={styles["task-title-input"]}
                data-valid={!titleError}
            />
        </>
    );
}
