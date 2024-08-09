import { MAX_DESCRIPTION_LENGTH } from "@/shared/helpers/constants";
import styles from "./styles.module.scss";

type TextareaProps = {
    value: string;
    placeholder: string;
    onChange: (e: any) => void;
};

export default function Textarea({
    value,
    placeholder,
    onChange,
}: TextareaProps) {
    return (
        <div className={styles["textarea-wrapper"]}>
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <span>
                {value.length} / {MAX_DESCRIPTION_LENGTH}
            </span>
        </div>
    );
}
