import DatePicker from "@/shared/ui/date-picker";
import styles from "./styles.module.scss";

type TaskDatePick = {
    startedAt: string | null;
    completedAt: string | null;
    handleDateChange: (date: Date, id: string) => void;
};

export default function TaskDatePick({
    startedAt,
    completedAt,
    handleDateChange,
}: TaskDatePick) {
    let parsedStartedAt = startedAt ? new Date(Date.parse(startedAt)) : null;
    let parsedCompletedAt = completedAt
        ? new Date(Date.parse(completedAt))
        : null;

    return (
        <div className={styles["task-date-picker"]}>
            <div>
                <span>Start date</span>
                <DatePicker
                    id="start-date"
                    placeholder="Start date"
                    date={parsedStartedAt}
                    handleDateChange={handleDateChange}
                />
            </div>
            <div>
                <span>Completed date</span>
                <DatePicker
                    id="completed-date"
                    placeholder="Completed date"
                    date={parsedCompletedAt!}
                    handleDateChange={handleDateChange}
                />
            </div>
        </div>
    );
}
