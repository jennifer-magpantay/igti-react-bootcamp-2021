import styles from './Flashcards.module.css'

/*
    Flashcards components works as a single container for the cards
*/

export default function Flashcards({ children: card }) {
    return (
        <div className={styles.container}>
            {card}
        </div>
    )
}
