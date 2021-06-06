import styles from './App.module.css';
import data from './../../data/investments.json';
import { formatNumber } from '../../helpers/format.js'
import Dashboard from "../../components/dashboard/Dashboard";

function App() {

  console.log(data.investments);
  return (
    <div className={styles.container}>
      <h1>Hello stranger</h1>
      {data.investments.map((item, key) => {
        // filter the reports by investimentId
        let list = data.reports.filter((report) => {
          return report.investmentId === item.id
        }).sort((a, b) => a.month > b.month ? 1 : -1);
        // list returns 7 list ordered by month and grouped by investiment id
        console.log(list);

        return <Dashboard key={item.id}
          description={item.description}
          month={list.month}
          value={formatNumber(list.value)} />
        })
      }
    </div>
  );
}

export default App;
