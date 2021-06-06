import styles from './Dashboard.module.css';

export default function Dashboard({ description, month, value }) {
    return (
        <div>
            {/* content from: investments.description */}
            <header>{description}</header>

            <div className={styles.container}>

                <aside>
                    {/* content from: reports.month and reports.value to populate the table */}
                    <table>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Amount</th>
                                <th>Calc %</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>{month}</span></td>
                                <td><span>{value}</span></td>
                                <td><span>15%</span></td>
                            </tr>
                        </tbody>
                    </table>
                </aside>
                <main>
                    {/* graphs */}
                </main>

            </div>

        </div>
    )
}
