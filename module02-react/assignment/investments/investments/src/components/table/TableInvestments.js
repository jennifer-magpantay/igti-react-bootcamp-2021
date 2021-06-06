import './TableInvestments.module.css';

export default function TableInvestments({ description, children, total }) {
    return (
        <aside>
            <header>{description}</header>
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Amount $$</th>
                        <th>Calc %</th>
                    </tr>
                </thead>

                <tbody>
                    {children}
                </tbody>

                <tfoot>
                    <tr>
                        <td>Total:</td>
                        <td>{total}</td>
                    </tr>
                </tfoot>
            </table>
        </aside>
    )
}
