import { useState, useEffect } from 'react';
// components
import { Header } from '../components/header/Header';
import { NavBar } from '../components/navbar/NavBar';
import { Button } from '../components/button/Button';
import { Main } from '../components/main/Main';
import { TopBar } from '../components/topBar/TopBar';
import { Select } from '../components/select/Select';
import { ResultBox } from '../components/resultBox/ResultBox';
import { TableDetailed, TableResume } from '../components/table/Table';
// services
import { IExpenses, renderExpensesByPeriod } from '../services/Backend';
import { YEARS, MONTHS, getIndexMonth } from '../services/Dates';
import { formatNumberCurrency, formatMonthCalendar } from '../services/Format';
import { ReduceCategory, ReduceTotal } from '../services/Reduce';
import { useParams, useHistory } from 'react-router-dom';

export function Dashboard() {
    const history = useHistory();

    // useParams: reads the url params set on route
    // specify in <{}> what this params will receive as types
    // then, use this params to refer to a year or month, without creating states to hold those values
    const param = useParams<{
        year: string, month: string
    }>();

    const [expenses, setExpenses] = useState<IExpenses[]>([]);
    const [hasResume, setHasResume] = useState<boolean>(false);
    const [hasDetailed, setHasDetailed] = useState<boolean>(false);

    // useEffect to control the data renderinh at every change on star-end dates
    useEffect(() => {
        // calling the backend and saving results into the stats   
        renderExpensesByPeriod(param.year, param.month).then((expense) => setExpenses(expense));
    }, [param.month, param.year]);

    // This function is called when the input changes
    const handleSelectYearOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedYear = event.target.value;
        param.year = selectedYear
        // setYear(param.year);
        // setting useHistory to change the URL params
        let path = `/dashboard/${param.year}/${param.month}`;
        history.push(path);
    };


    const handleSelectMonthOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedMonth = event.target.value;
        param.month = getIndexMonth(selectedMonth);
        // setMonth(param.month);

        let path = `/dashboard/${param.year}/${param.month}`;
        history.push(path);
    };

    function handleButtonLogoutOnClick() {

    }

    function handleButtonOptionsOnClick(event: any) {
        if (event.target.innerHTML === "RESUME") {
            setHasResume(true);
        }
        if (event.target.innerHTML === "DETAILED") {
            setHasDetailed(true);
            setHasResume(false);
        }
    }

    const username = "Stranger";

    // rendering data into tables and displaying according to state values
    let results: any = "";

    if (hasDetailed) {
        results = <>
            <p className="caption">{param.year} | {formatMonthCalendar(param.month)}</p>
            <TableDetailed>
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
            </TableDetailed>
        </>
    }

    if (hasResume) {
        results = <>
            <p className="caption">{param.year} | {formatMonthCalendar(param.month)}</p>
            <TableResume>
                <tr>
                    <td>Alimentação</td>
                    <td>{formatNumberCurrency(ReduceCategory(expenses, "Alimentação"))}</td>
                </tr>

                <tr>
                    <td>Lazer</td>
                    <td>{formatNumberCurrency(ReduceCategory(expenses, "Lazer"))}</td>
                </tr>

                <tr>
                    <td>Moradia</td>
                    <td>{formatNumberCurrency(ReduceCategory(expenses, "Moradia"))}</td>
                </tr>

                <tr>
                    <td>Saúde</td>
                    <td>{formatNumberCurrency(ReduceCategory(expenses, "Saúde"))}</td>
                </tr>

                <tr>
                    <td>Transporte</td>
                    <td>{formatNumberCurrency(ReduceCategory(expenses, "Transporte"))}</td>
                </tr>

                <tr>
                    <td>Outros</td>
                    <td>{formatNumberCurrency(ReduceCategory(expenses, "Outros"))}</td>
                </tr>
            </TableResume>
        </>
    }

    return (
        <>
            <Header>
                <NavBar>
                    <p>Hello, {username}</p>
                    <Button type="button" className="button-logout" onClick={handleButtonLogoutOnClick}>LOG OUT</Button>
                </NavBar>
            </Header>

            <Main>

                <TopBar>
                    {/* select year */}
                    <Select labelFor="year" labelText="Year" selectId="year" selectName="year" value={param.year} selectOnChange={handleSelectYearOnChange}>
                        {YEARS.map((year, i) => {
                            return <option key={i} value={year}>{year}</option>
                        }).reverse()}
                    </Select>

                    {/* select month */}
                    <Select labelFor="month" labelText="Month" selectId="month" selectName="month" value={formatMonthCalendar(param.month)} selectOnChange={handleSelectMonthOnChange}>
                        {MONTHS.map((month, i) => {
                            return <option key={i} value={month}>{month}</option>
                        })}
                    </Select>

                    {/* results */}
                    <ResultBox text="Total expenses on period:" result={formatNumberCurrency(ReduceTotal(expenses))} />

                </TopBar>

                {/* Buttons */}
                <div className="options__container">
                    <Button type="button" className="button-options" onClick={handleButtonOptionsOnClick}>RESUME</Button>

                    <Button type="button" className="button-options" onClick={handleButtonOptionsOnClick}>DETAILED</Button>
                </div>

                {/* records results */}

                {results}
            </Main>
        </>
    );
}