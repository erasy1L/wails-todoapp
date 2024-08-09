import { useEffect, useState } from "react";
import { MdCheckBox, MdOutlineIndeterminateCheckBox } from "react-icons/md";
import { task } from "wailsjs/go/models";
import { filtersList, getFilterById } from "../lib/config";
import styles from "./styles.module.scss";
import useTasksStore from "@/app/store/store";

export default function TaskFilter() {
    const [status, SetStatus] = useState<task.Status>();

    const setCurrStatusFilter = useTasksStore(
        (state) => state.setCurrStatusFilter
    );

    const filterHandler = (filter: task.Status | undefined) => {
        SetStatus(filter);
    };

    useEffect(() => {
        setCurrStatusFilter(status);
    }, [status]);

    return (
        <div className={styles["toggle-btn-wrapper"]}>
            <div className={styles.name}>Filter tasks:</div>
            <div className={styles["toggle-btn-group"]}>
                {filtersList.map(({ title, id, filterStatus }) => (
                    <div
                        key={id}
                        data-active={
                            status === filterStatus
                                ? `${filterStatus}-active`
                                : filterStatus
                        }
                        className={styles["toggle-btn"]}
                        onClick={() => {
                            if (status === filterStatus) {
                                filterHandler(undefined);
                            } else {
                                filterHandler(getFilterById(id).filterStatus);
                            }
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                            }}
                        >
                            {getFilterById(id).filterStatus ==
                            task.Status.todo ? (
                                <MdOutlineIndeterminateCheckBox />
                            ) : (
                                <MdCheckBox />
                            )}
                            {title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
