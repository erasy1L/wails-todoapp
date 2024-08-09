import { MouseEvent, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import styles from "./styles.module.scss";

type CheckboxProps = {
    defaultChecked: boolean;
    handleCheckboxChange: (isChecked: boolean) => void;
};

export default function Checkbox({
    defaultChecked,
    handleCheckboxChange,
}: CheckboxProps) {
    const [isChecked, setIsChecked] = useState(defaultChecked);

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        setIsChecked((prev) => {
            handleCheckboxChange(!prev);
            return !prev;
        });
    };

    return (
        <div className={styles["checkbox-wrapper"]} onClick={handleClick}>
            {isChecked ? (
                <MdCheckBox size="1.50rem" />
            ) : (
                <MdCheckBoxOutlineBlank size="1.50rem" />
            )}
        </div>
    );
}
