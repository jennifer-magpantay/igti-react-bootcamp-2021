type TableProps = {
    children: any;
}

export function TableDetailed(props: TableProps) {
    const {children} = props;
    return (
        <div className="table__container">
            <table aria-label="Detailed Expenses of the period">
                <thead>
                    <tr>
                        <th>Expense</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {/* tr td content to be rendered at Home */}
                    {children}
                </tbody>
            </table>
        </div >
    );
}

export function TableResume(props: TableProps) {
    const { children } = props;
    return (
        <div className="table__container">
            <table aria-label="Resumed Expenses of the period">
                <thead>
                    <tr>                      
                        <th>Category</th>                      
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {/* tr td content to be rendered at Home */}
                    {children}
                </tbody>
            </table>
        </div >
    );
}