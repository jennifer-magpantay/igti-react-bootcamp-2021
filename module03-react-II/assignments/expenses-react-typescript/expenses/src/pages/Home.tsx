import '../styles/main.css';
import { useState, useEffect } from 'react';
// components
import { Header } from '../components/header/Header';
import { TopBar } from '../components/topBar/TopBar';
import { Select } from '../components/select/Select';
import { ResultBox } from '../components/resultBox/ResultBox';
import { Table } from '../components/table/Table';
// services
import { YEARS, MONTHS, IExpenses, renderExpensesByPeriod } from '../services/Backend';
import { getIndexMonth, formatNumberCurrency } from '../services/Format';

export function Home() {
    const [year, setYear] = useState<string>("2021");
    const [month, setMonth] = useState<string>("01");
    const [expenses, setExpenses] = useState<IExpenses[]>([]);

    // useEffect to control the data renderinh at every change on star-end dates
    useEffect(() => {
        // calling the backend and saving results into the stats   
        renderExpensesByPeriod(year, month).then((expense) => setExpenses(expense));
    }, [year, month]);

    // This function is called when the input changes
    const handleSelectYearOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedYear = event.target.value;
        setYear(selectedYear);
    };

    const handleSelectMonthOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedMonth = event.target.value;
        const selectedMonthStr = getIndexMonth(selectedMonth);
        setMonth(selectedMonthStr);
    };
   
    const total = expenses.reduce((acc, curr) => {
      return acc + curr.valor;
    }, 0);
       
    return (
        <>
            <Header>Expenses Control</Header>
            <TopBar>
                {/* select year */}
                <Select labelFor="year" labelText="Year" selectId="year" selectName="year" selectOnChange={handleSelectYearOnChange}>
                    {YEARS.map((year, i) => {
                        return <option key={i} value={year}>{year}</option>
                    }).reverse()}
                </Select>

                {/* select month */}
                <Select labelFor="month" labelText="Month" selectId="month" selectName="month" selectOnChange={handleSelectMonthOnChange}>
                    {MONTHS.map((month, i) => {
                        return <option key={i} value={month}>{month}</option>
                    })}
                </Select>

                {/* results */}
                <ResultBox result={formatNumberCurrency(total)} />
            </TopBar>

            {/* <Table/> */}
            <Table>
                {/* tr td content to be rendered by mapping the data list */}
                {expenses.map((expense) => {
                    return (
                        <tr key={expense.id}>
                            <td>{expense.descricao}</td>
                            <td>{expense.categoria}</td>
                            <td>{expense.dia}</td>
                            <td>{formatNumberCurrency(expense.valor)}</td>
                        </tr>
                    );
                })}
            </Table>
        </>
    );
}
