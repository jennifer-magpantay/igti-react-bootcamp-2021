import styles from './Modal.module.css';

export default function Modal({ children }) {
    return (
        <div className={styles.modal}>

            <div className={styles.modalContent}>
                {/* button to close the modal */}
                {children}
            </div>
        </div>
    )
}
