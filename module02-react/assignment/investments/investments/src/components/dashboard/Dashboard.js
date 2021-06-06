import styles from './Dashboard.module.css';

export default function Dashboard({ description, children }) {
    return (
        <div>
            {/* content from: investments.description */}
            <header>{description}</header>

            <div className={styles.container}>

                {children}

                <aside>
                    {children}
                </aside>

                <main>
                    {/* graphs */}
                </main>

            </div>

        </div>
    )
}
