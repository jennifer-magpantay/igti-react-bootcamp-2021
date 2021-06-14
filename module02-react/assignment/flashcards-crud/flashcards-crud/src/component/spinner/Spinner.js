import styles from './Spinner.module.css'
import ClipLoader from "react-spinners/ClipLoader";

export default function Spinner() {
    return (
        <div className={styles.spinnerContainer}>
            <ClipLoader />
        </div>
    )
}
