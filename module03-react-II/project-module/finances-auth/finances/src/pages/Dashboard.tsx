import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
// components
import { Header } from "../components/header/Header";
import { NavBar } from "../components/navbar/NavBar";
import { Button } from "../components/button/Button";
import { Main } from "../components/main/Main";
import { TopBar } from "../components/topBar/TopBar";
import { Select } from "../components/select/Select";
import { ResultBox } from "../components/resultBox/ResultBox";
import { TableDetailed, TableResume } from "../components/table/Table";
// services
import {
  IExpenses,
  logoutUserSession,
  renderExpensesByPeriod,
} from "../services/Backend";
import { YEARS, MONTHS, getIndexMonth } from "../services/Dates";
import { formatNumberCurrency, formatMonthCalendar } from "../services/Format";
import { ReduceCategory, ReduceTotal } from "../services/Reduce";
import { useAuthContext } from "../services/AuthContent";

export function Dashboard() {
  // call the authContext
  // const { user, logOutApp } = useContext(authContext);
  const { user, logOutApp } = useAuthContext();
  const history = useHistory();

  /* 
        useParams: reads the url params set on route
        specify in <{}> what this params will receive as types
        then, use this params to refer to a year or month, without creating states to hold those values
    */
  const param = useParams<{
    year: string;
    month: string;
  }>();

  const [expenses, setExpenses] = useState<IExpenses[]>([]);
  const [hasResume, setHasResume] = useState<boolean>(false);
  const [hasDetailed, setHasDetailed] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);

  // useMemo(() => function, input)

  // useEffect to control the data renderinh at every change on star-end dates
  useEffect(() => {
    // calling the backend and saving results into the stats
    renderExpensesByPeriod(param.year, param.month).then((expense) =>
      setExpenses(expense)
    );
  }, [param.month, param.year]);

  // This function is called when the input changes
  const handleSelectYearOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedYear = event.target.value;
    param.year = selectedYear;
    // setting useHistory to change the URL params
    let path = `/dashboard/${param.year}/${param.month}`;
    history.push(path);
  };

  const handleSelectMonthOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedMonth = event.target.value;
    param.month = getIndexMonth(selectedMonth);
    let path = `/dashboard/${param.year}/${param.month}`;
    history.push(path);
  };

  function handleButtonLogoutOnClick() {
    // close the session by calling the function on the backend and also, calling the authContext function
    logoutUserSession();
    logOutApp();
    // once the session is closed, the user will be sent to the home page
    let path = "/";
    history.push(path);
  }

  function handleButtonOptionsOnClick(event: any) {
    if (event.target.innerHTML === "RESUME") {
      setHasResume(true);
      getCategories(expenses);
    }
    if (event.target.innerHTML === "DETAILED") {
      setHasDetailed(true);
      setHasResume(false);
    }
  }

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

  function renderCategoriesTotalComponent(list: string[]) {
    return list.map((item) => (
      <tr key={item}>
        <td>{item}</td>
        <td>{formatNumberCurrency(ReduceCategory(expenses, item))}</td>
      </tr>
    ));
  }

  function renderOptions(list: string[] | number[]) {
    return list.map((item, i) => {
      return (
        <option key={i} value={item}>
          {item}
        </option>
      );
    });
  }

  // rendering data into tables and displaying according to state values
  let results: any = "";

  if (hasDetailed) {
    results = (
      <>
        <p className="caption">
          {param.year} | {formatMonthCalendar(param.month)}
        </p>
        <TableDetailed>
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
        </TableDetailed>
      </>
    );
  }

  if (hasResume) {
    results = (
      <>
        <p className="caption">
          {param.year} | {formatMonthCalendar(param.month)}
        </p>
        <TableResume>{renderCategoriesTotalComponent(categories)}</TableResume>
      </>
    );
  }

  return (
    <>
      <Header>
        <NavBar>
          <p>Hello, {user.nome}</p>
          <Button
            type="button"
            className="button-logout"
            onClick={handleButtonLogoutOnClick}
          >
            LOG OUT
          </Button>
        </NavBar>
      </Header>

      <Main>
        <TopBar>
          {/* select year */}
          <Select
            labelFor="year"
            labelText="Year"
            selectId="year"
            selectName="year"
            value={param.year}
            selectOnChange={handleSelectYearOnChange}
          >
            {renderOptions(YEARS).reverse()}
          </Select>

          {/* select month */}
          <Select
            labelFor="month"
            labelText="Month"
            selectId="month"
            selectName="month"
            value={formatMonthCalendar(param.month)}
            selectOnChange={handleSelectMonthOnChange}
          >
            {renderOptions(MONTHS)}
          </Select>

          {/* results */}
          <ResultBox
            text="Total expenses on period:"
            result={formatNumberCurrency(ReduceTotal(expenses))}
          />
        </TopBar>

        {/* Buttons */}
        <div className="options__container">
          <Button
            type="button"
            className="button-options"
            onClick={handleButtonOptionsOnClick}
          >
            RESUME
          </Button>

          <Button
            type="button"
            className="button-options"
            onClick={handleButtonOptionsOnClick}
          >
            DETAILED
          </Button>
        </div>

        {/* records results */}
        {results}
      </Main>
    </>
  );
}
