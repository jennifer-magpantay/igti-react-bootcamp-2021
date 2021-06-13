import { useState, useEffect } from 'react';
import styles from './Card.module.css';

/*
    create a card component and define as props a title, a description and a bolean value to control the 'flipping' card effect;

    flipping card: considering a card has two sides - one with the title (true) and another with description (false). 
    to choose wich one will be displayed, let's create a state to hold this boolean value.
    to sync the boolean values at every change, lets implement an useEffect as well
    also, to allow this changes, add an event listener to the card    
*/

export default function Card({ title, description, isTitleShown = true }) {
    const [showTitle, setShowTitle] = useState(isTitleShown);

    // useEffect to sync the changes on state caused by the radio buttons choices
    useEffect(() => {
        setShowTitle(isTitleShown)
    }, [isTitleShown])

    function handleCardOnClick() {
        // setShowTitle(!showTitle);
        setShowTitle(currentShowTitle => !currentShowTitle)
    }

    return (

        <div className={styles.card} onClick={handleCardOnClick}>
            {
                // if the state is true, display the title, otherwise, the description
                showTitle ?
                    <span className={styles.cardTitle}>{title}</span>
                    :
                    <span className={styles.cardDescription}>{description}</span>
            }
        </div>
    )
}
