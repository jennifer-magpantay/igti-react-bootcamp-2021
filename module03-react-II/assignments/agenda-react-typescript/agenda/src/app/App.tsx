import "./modern-reset.css";
import "./App.css";
// components
import Topnav from "../components/Topnav";
import AsideCalendar from "../components/AsideCalendar";
import TableContent from "../components/TableContent";

function App() {
  return (
    <>
      {/* header */}
      <header>
        <Topnav />
      </header>

      <div className="container">
        {/* aside */}
        <aside>
          <AsideCalendar />
        </aside>

        {/* main */}
        <main>
          <TableContent />
        </main>
      </div>
    </>
  );
}

export default App;
