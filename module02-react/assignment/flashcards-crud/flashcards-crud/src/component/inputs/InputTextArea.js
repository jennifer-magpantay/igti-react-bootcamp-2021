import styles from './Inputs.module.css';
import { getNewId } from '../../services/idService';

export function InputTextArea({ id = getNewId(), name, labelTitle, textAreaValue, onTextAreaChange, maxLength = 230 }) {

    function handleInputOnChange(event) {
        if (onTextAreaChange) {
            onTextAreaChange(event);
        }
    }

    // counting characters
    const charCounter = textAreaValue.length;

    return (

        <div className={styles.inputRow}>
            <label htmlFor={name}>{labelTitle}</label>
            <textarea name={name} id={id} onChange={handleInputOnChange} value={textAreaValue} maxLength={maxLength} rows="5" cols="33" required />
            <div className={styles.textareaCounter}>
                <span>{charCounter} | {maxLength}</span>
            </div>

        </div>
    )
}
