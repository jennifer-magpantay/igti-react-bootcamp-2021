import { useState, useEffect } from 'react';
// components
import { Header } from '../components/header/Header';
import { Aside } from '../components/aside/Aside';
import { Main } from '../components/main/Main';
import { TopBar } from '../components/topBar/TopBar';
import { Select } from '../components/select/Select';
import { ResultBox } from '../components/resultBox/ResultBox';
import { Table } from '../components/table/Table';
// services
import { IExpenses, renderExpensesByPeriod } from '../services/Backend';
import { YEARS, MONTHS, getIndexMonth } from '../services/Dates';
import { formatNumberCurrency } from '../services/Format';
import { ReduceCategory, ReduceTotal } from '../services/Reduce';

export function Dashboard() {
    const [year, setYear] = useState<string>("2021");
    const [month, setMonth] = useState<string>("01");
    const [expenses, setExpenses] = useState<IExpenses[]>([]);
    console.log(year, month)

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

    return (
        <>
            <Header>Expenses Control</Header>
            <div className="home__container">
                <Aside>
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
                        <ResultBox text="Total expenses on period:" result={formatNumberCurrency(ReduceTotal(expenses))} />

                        <ResultBox text="Alimentação:" result={formatNumberCurrency(ReduceCategory(expenses, "Alimentação"))} />

                        <ResultBox text="Lazer:" result={formatNumberCurrency(ReduceCategory(expenses, "Lazer"))} />

                        <ResultBox text="Moradia:" result={formatNumberCurrency(ReduceCategory(expenses, "Moradia"))} />

                        <ResultBox text="Saúde:" result={formatNumberCurrency(ReduceCategory(expenses, "Saúde"))} />

                        <ResultBox text="Transporte:" result={formatNumberCurrency(ReduceCategory(expenses, "Transporte"))} />

                        <ResultBox text="Outros:" result={formatNumberCurrency(ReduceCategory(expenses, "Outros"))} />

                    </TopBar>
                </Aside>

                <Main>
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
                </Main>
            </div>
        </>
    );
}