import styles from './Inputs.module.css';
import { getNewId } from '../../services/idService';

export function InputTextField({ id = getNewId(), name, labelTitle, inputValue, onInputChange }) {

    function handleInputOnChange(event) {
        if (onInputChange) {
            onInputChange(event);
        }
    }

    return (
        <div className={styles.inputRow}>
            <label htmlFor={name}>{labelTitle}</label>
            <input type="text" name={name} id={id} value={inputValue} onChange={handleInputOnChange} autoFocus required />
        </div>
    )
}
