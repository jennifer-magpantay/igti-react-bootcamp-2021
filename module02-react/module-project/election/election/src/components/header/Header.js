import styles from './Header.module.css'

export default function Header({ children }) {
    return (
        <header>
            <h1 className={styles.headerTitle}>{children}</h1>
        </header>
    )
}
