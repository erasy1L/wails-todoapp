import { forwardRef, useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import styles from "./styles.module.scss";

export default function DatePicker({
    id,
    date,
    placeholder,
    handleDateChange,
}: {
    id: string;
    date: Date | null;
    placeholder?: string;
    handleDateChange: (date: Date, id: string) => void;
}) {
    const [selected, setSelected] = useState<Date | null>(date);
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        setSelected(date);
    }, [date]);

    return (
        <div className={styles["date-picker-wreapper"]}>
            <DatePickerBtn
                placeholder={placeholder}
                value={selected}
                onClick={() => setHidden((prev) => !prev)}
            />
            {!hidden ? (
                <DayPicker
                    id={id}
                    mode="single"
                    selected={selected!}
                    onSelect={(selected) =>
                        setSelected(() => {
                            handleDateChange(selected!, id);
                            return selected!;
                        })
                    }
                    styles={{
                        day_button: {
                            width: "2rem",
                            height: "2rem",
                        },
                        month_caption: {
                            paddingLeft: "0.9rem",
                            fontSize: "1rem",
                        },
                    }}
                />
            ) : null}
        </div>
    );
}

type DatePickerBtnProps = {
    value: Date | null;
    placeholder?: string;
    onClick: (e: any) => void;
};

const DatePickerBtn = forwardRef(
    ({ value, placeholder, onClick }: DatePickerBtnProps, ref: any) => (
        <button
            type="button"
            className={styles["date-picker-btn"]}
            onClick={onClick}
            ref={ref}
            style={{
                letterSpacing: "2px",
            }}
        >
            {value ? value.toLocaleDateString() : placeholder}
        </button>
    )
);
