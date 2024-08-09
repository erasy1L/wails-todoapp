import { motion } from "framer-motion";
import { RiLoader5Fill } from "react-icons/ri";
import styles from "./styles.module.scss";

export default function Loader() {
    return (
        <motion.div
            className={styles["loading-icon"]}
            animate={{ rotate: 360 }}
            transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 1,
            }}
        >
            <RiLoader5Fill size={64} />
        </motion.div>
    );
}
