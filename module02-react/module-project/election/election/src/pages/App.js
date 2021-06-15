import styles from './App.module.css'

import Header from "../components/header/Header";
import Aside from '../components/aside/Aside';
import Main from '../components/main/Main';

function App() {
  return (
    <>
      {/* header */}
      <Header>Elections</Header>

      <div className={styles.container}>
        {/* aside */}
        <Aside>ASIDE</Aside>

        {/* main */}
        <Main>MAIN</Main>
      </div>
    </>
  );
}

export default App;
