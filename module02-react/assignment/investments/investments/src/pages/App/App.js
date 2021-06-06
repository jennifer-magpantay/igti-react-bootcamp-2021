// import React, { useState } from 'react';
import styles from './App.module.css';
import { data } from '../../data/investments';
import { formatNumber, formatMonth } from '../../helpers/format.js'
import Dashboard from "../../components/dashboard/Dashboard";
import TableInvestments from '../../components/table/TableInvestments';
import Graph from '../../components/graph/Graph';

function App() {
  // const [description, setDescription] = useState([]);

  const { investments, reports } = data;
  // console.log(investments, reports);

  let desc, month, value, calc, total;
  return (

    <>
      {
        investments.map((investment, i) => {
          let filter = reports.filter((report) => { return report.investmentId === investment.id }).sort((a, b) => a.month > b.month ? 1 : -1);

          for (i = 0; i < filter.length; i++) {
            desc = investment.description;
            month = formatMonth(filter[i].month);
            value = filter[i].value.toFixed(2);
            total = filter[11].value.toFixed(2) * 100 / filter[0].value.toFixed(2) - 100

            // const tr = document.createElement('tr');
            // const mon = document.createElement('td');
            // mon.textContent = month;
            // const val = document.createElement('td');
            // val.textContent = value;
            // tr.appendChild(mon);
            // tr.appendChild(val)
            // document.querySelector('tbody').appendChild(tr);

            console.log(desc, month, value, total.toFixed(2));
          }

          for (i = 1; i < filter.length; i++) {
            calc = filter[i].value.toFixed(2) * 100 / filter[i - 1].value.toFixed(2) - 100;

            console.log(calc.toFixed(2));
          }

          return (
            <div className={styles.container}>
              <TableInvestments key={investment.id} description={desc} total={total.toFixed(2)}>
                <tr>
                  <td>{month}</td>
                  <td>{value}</td>
                  <td>{calc.toFixed(2)}</td>
                </tr>
              </TableInvestments>

              <Graph description={desc} months={month} calc={calc.toFixed(2)}/>
            </div>
          )
        })
      }
      {/* is is returning just the last month of each investment */}
    </>
  );
}

export default App;
