import styles from './RadioButton.module.css';
import { getNewId } from "../../services/idService";

/*
    Radio buttons controls what side of the card will be display
    It is implemented with props for id, name, value, checked state and an event listener for the input changes
*/

export default function RadioButton({ id = getNewId, name, value, isChecked = false, onButtonChange }) {

    function handleButtonOnChange(event) {
        if (onButtonChange) {
            onButtonChange(event);
        }
    }
    return (
        <div className={styles.buttonContainer}>
            <input type='radio' id={id} name={name} checked={isChecked} onChange={handleButtonOnChange} />
            <label htmlFor={id} className={styles.buttonLabel}>{value}</label>
        </div>
    )
}
