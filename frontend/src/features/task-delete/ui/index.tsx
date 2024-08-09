import { IoTrashBinSharp } from "react-icons/io5";
import styles from "./styles.module.scss";

type TaskDeleteProps = {
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function TaskDelete({ handleClick }: TaskDeleteProps) {
    return (
        <div className={styles["task-delete"]} onClick={handleClick}>
            <IoTrashBinSharp size={"1.2rem"} />
        </div>
    );
}
