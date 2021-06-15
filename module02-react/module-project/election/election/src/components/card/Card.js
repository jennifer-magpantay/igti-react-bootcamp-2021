import styles from './Card.module.css';

/*
create a card component to hold data from each candidadate passing the props for name, votes percentage, total of votes and if has won the election
*/

export default function Card({ name, username, percentage, votes }) {
    // avatars from API https://avatars.dicebear.com/api/:sprites/:seed.svg

    let url = `https://avatars.dicebear.com/api/bottts/${username}.svg`

    return (
        <div className={styles.card}>
            <div className={styles.cardAside}>
                <img className={styles.avatar} src={url} alt="Avatar Bot" />
            </div>

            <div className={styles.cardMain}>
                <h2>{name}</h2>
                <p>Total of votes: {votes}</p>
                <p>Percentagem: {percentage}</p>
            </div>
        </div>
    )
}
