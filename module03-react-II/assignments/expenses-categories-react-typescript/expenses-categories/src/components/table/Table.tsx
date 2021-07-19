type TableProps = {
  children: any;
};

export function Table(props: TableProps) {
  const { children } = props;
  return (
    <div className="table__container">
      <table>
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
          {/* <tr>
                        <td>Drinkns</td>
                        <td>Happy Hour</td>
                        <td>13</td>
                        <td>25.99</td>
                    </tr> */}
        </tbody>
      </table>
    </div>
  );
}
