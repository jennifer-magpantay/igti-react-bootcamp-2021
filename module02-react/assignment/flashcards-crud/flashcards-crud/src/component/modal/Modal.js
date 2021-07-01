import styles from './Modal.module.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function Modal({ children: form, onCloseButton }) {

    function handleButtonOnClick(event) {
        if (onCloseButton) {
            onCloseButton(event);
        }
    }
    return (
        <div className={styles.modal}>

            <div className={styles.modalContent}>
                <button type="button" className={styles.modalButton} onClick={handleButtonOnClick}>
                    <AiOutlineCloseCircle />
                </button>
                {/* button to close the modal */}
                {form}
            </div>
        </div>
    )
}
