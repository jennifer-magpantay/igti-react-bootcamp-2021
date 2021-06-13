import styles from './App.module.css';
import { data } from '../../data/investments';
import TableInvestments from '../../components/table/TableInvestments';
import Graph from '../../components/graph/Graph';

function App() {
  return (
    <>
      <h1 className={styles.header}>Investment Performace | 2020</h1>
      {/* map data to render table investments */}
      {
        data.map(investment => {
          return (
            <div className={styles.container} key={investment.id}>
              <TableInvestments>
                {investment}
              </TableInvestments>

              {/* and render graphs */}
              <Graph description={investment.description}>{investment}</Graph>
            </div>
          )
        })
      }
    </>
  );
}

export default App;
