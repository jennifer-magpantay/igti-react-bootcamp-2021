import "../styles/main.css";
import { useState, useEffect } from "react";
// components
import { Header } from "../components/header/Header";
import { Aside } from "../components/aside/Aside";
import { Main } from "../components/main/Main";
import { TopBar } from "../components/topBar/TopBar";
import { Select } from "../components/select/Select";
import { ResultBox } from "../components/resultBox/ResultBox";
import { Table } from "../components/table/Table";
// services
import { IExpenses, renderExpensesByPeriod } from "../services/Backend";
import { YEARS, MONTHS, getIndexMonth } from "../services/Dates";
import { formatNumberCurrency } from "../services/Format";
import { ReduceCategory, ReduceTotal } from "../services/Reduce";

export function Home() {
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [expenses, setExpenses] = useState<IExpenses[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // useEffect to control the data rendering at every change on star-end dates
  useEffect(() => {
    // calling the backend and saving results into states
    renderExpensesByPeriod(year, month).then((expense) => setExpenses(expense));
    getCategories(expenses); //ERROR - categories has been loaded just after 2nd interaction after they are restarted
  }, [year, month]);

  // This function is called when the input changes
  const handleSelectYearOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
  };

  const handleSelectMonthOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedMonth = event.target.value;
    const selectedMonthStr = getIndexMonth(selectedMonth);
    setMonth(selectedMonthStr);
  };

  function getCategories(expenses: IExpenses[]) {
    // find a way to sort the array before get its categories

    // filtring the categories
    // 1. read the lis with map
    const categories = expenses
      .map((expense) => expense.categoria)
      .sort((a, b) => {
        return a.localeCompare(b);
      });

    // 2. eliminate duplicate bys using new Set(arr)
    // PS.: transform the var into an array first
    const categoriesSet = Array.from(new Set(categories));
    setCategories(categoriesSet);
  }

  // it will check if year and month has valid values
  function checkDates(year: string, month: string) {
    // if they are undefined or == "--", return no results
    if (!year || !month || year === "--" || month === "--") {
      return <p className="results caption">No results to display</p>;
    }
    // if year and month has valid values, then render table with results from expenses.map()
    if (year && month) {
      return (
        <>
          <Table>
            {/* tr td content to be rendered by mapping the data list */}
            {expenses.map((expense) => {
              const { id, descricao, categoria, dia, valor } = expense;
              return (
                <tr key={id}>
                  <td>{descricao}</td>
                  <td>{categoria}</td>
                  <td>{dia}</td>
                  <td>{formatNumberCurrency(valor)}</td>
                </tr>
              );
            })}
          </Table>
        </>
      );
    }
  }

  function renderOptions(list: string[] | number[], item: any) {
    return list.map((item, i) => {
      return (
        <option key={i} value={item}>
          {item}
        </option>
      );
    });
  }

  function renderTotalExpenses() {
    return (
      <ResultBox
        text="Total expenses on period:"
        result={formatNumberCurrency(ReduceTotal(expenses))}
      />
    );
  }

  function renderCategoriesTotalComponent(categories: string[]) {
    return categories.map((expense) => (
      <ResultBox
        key={expense}
        text={expense}
        result={formatNumberCurrency(ReduceCategory(expenses, expense))}
      />
    ));
  }

  return (
    <>
      <Header>Expenses Control</Header>
      <div className="home__container">
        <Aside>
          <TopBar>
            {/* select year */}
            <Select
              labelFor="year"
              labelText="Year"
              selectId="year"
              selectName="year"
              selectOnChange={handleSelectYearOnChange}
            >
              <option value="--">--</option>
              {renderOptions(YEARS, year).reverse()}
            </Select>

            {/* select month */}
            <Select
              labelFor="month"
              labelText="Month"
              selectId="month"
              selectName="month"
              selectOnChange={handleSelectMonthOnChange}
            >
              <option value="--">--</option>
              {renderOptions(MONTHS, month)}
            </Select>

            {/* total results */}
            {renderTotalExpenses()}

            {/* results by category */}
            {renderCategoriesTotalComponent(categories)}
          </TopBar>
        </Aside>

        <Main>
          {/* call the function to check the dates and based on the result, render the table */}
          {checkDates(year, month)}
        </Main>
      </div>
    </>
  );
}
