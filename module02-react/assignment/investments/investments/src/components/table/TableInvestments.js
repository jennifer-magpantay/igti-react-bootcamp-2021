import styles from './TableInvestments.module.css';
import { formatMonth, formatPercentage, formatNumber } from '../../helpers/format';

export default function TableInvestments({ children: investment }) {

    const { description, totalIncome, totalPercentage, reports } = investment;

    return (
        <aside>
            <header>
                <h3 className={styles.header}>{description}</h3>
                <h5 className={styles.headerCaption} style={{ color: totalIncome >= 0 ? "#2f3640" : "#e84118" }}>Total income: {formatNumber(totalIncome)} | {formatPercentage(totalPercentage)}</h5>
            </header>


            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Amount $$</th>
                        <th>Calc %</th>
                    </tr>
                </thead>

                <tbody>
                    {/* map the reports to display content */}
                    {
                        reports.map(({ id, month, value, percentage }) => {

                            return (
                                <tr key={id} style={{ color: percentage >= 0 ? "#2f3640" : "#e84118"}}>
                                    <td>{formatMonth(month)}</td>
                                    <td>{formatNumber(value)}</td>
                                    <td>{formatPercentage(percentage)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>

                <tfoot></tfoot>
            </table>
        </aside>

    )
}
