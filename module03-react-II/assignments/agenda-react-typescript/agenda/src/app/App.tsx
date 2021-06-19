import "./modern-reset.css";
import "./App.css";
import React from "react";
import Topnav from "../components/Topnav";
import AsideCalendar from "../components/AsideCalendar";
import TableContent from "../components/TableContent";

// services
import { renderEvents } from "./Backend";

function App() {
  renderEvents().then((events) => {
    for (const event of events) {
      // console.log(event);
    }
  });  

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
