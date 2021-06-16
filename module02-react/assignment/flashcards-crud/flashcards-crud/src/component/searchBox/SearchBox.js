import styles from './SearchBox.module.css'; 

export default function SearchBox({ label, name }) {
    return (
        <div className={styles.searchContainer}>
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} name={name} />
        </div>
    )
}
