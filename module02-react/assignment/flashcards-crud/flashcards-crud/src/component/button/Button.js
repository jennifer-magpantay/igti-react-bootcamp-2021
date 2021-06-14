import styles from './Button.module.css';

/* 
    Button component with props for value and event listsner
*/

export default function Button({ children, onButtonClick }) {

    function handleButtonOnClick() {
        if (onButtonClick) {
            onButtonClick();
        }
    }

    return (
        <button className={styles.button} onClick={handleButtonOnClick}>
            {children}
        </button>
    )
}
