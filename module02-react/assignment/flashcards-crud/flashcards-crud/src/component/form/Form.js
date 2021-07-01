import styles from './Form.module.css';
import Button from '../button/Button';
import { InputTextField } from '../inputs/InputTextField';
import { InputTextArea } from '../inputs/InputTextArea';
import { useState } from 'react';

/*
    Form will hold the input and text area components
    To control their changes, set states for each component 
*/

export default function Form({ onFormSubmit }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function clearText() {
        setTitle("");
        setDescription("");
    }

    function handleFormReset() {
        clearText();
    }

    function handleInputChange(event) {
        const elementName = event.target.name;
        if (elementName === "title") {
            setTitle(event.target.value)
        }
        if (elementName === "description") {
            setDescription(event.target.value)
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log("submiting form")
        console.log(event);
        if (onFormSubmit) {
            onFormSubmit(title, description);
            clearText();
        }
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
                <InputTextField name="title" labelTitle="Card title" inputValue={title} onInputChange={handleInputChange} />

                <InputTextArea name="description" labelTitle="Description" textAreaValue={description} onTextAreaChange={handleInputChange} />

                <div className={styles.buttonContainer}>
                    <Button type="submit" name="submit">SAVE</Button>
                    <Button type="reset" name="reset">CLEAR</Button>
                </div>
            </form>
        </div >
    )
}
