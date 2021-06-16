import styles from './Form.module.css';
import Button from '../button/Button';

export default function Form() {
    return (
        <div className={styles.formContainer}>
            <form>
                <div className={styles.formRow}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" />

                    <div className={styles.formRow}>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" maxLength="230" rows="5" cols="33" />
                    </div>

                    <div className={styles.buttonContainer}>
                        <Button type="submit" name="submit">SAVE</Button>
                        <Button type="button" name="clear">CLEAR</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
