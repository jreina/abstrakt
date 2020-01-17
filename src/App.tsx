import React from "react";
import "./App.css";
import { NewActivity } from "./components/NewActivity/NewActivity";
import { RecentActivity } from "./components/RecentActivity/RecentActivity";
import { InProgressActivity } from "./components/InProgressActivity/InProgressActivity";

function App() {
  return (
    <div className="container-xl">
      <div className="row">
        <div className="col-md-12">Chart</div>
      </div>
      <div className="row">
        <div className="col-md-4"><InProgressActivity /></div>
        <div className="col-md-4"><RecentActivity /></div>
        <div className="col-md-4">
          <NewActivity />
        </div>
      </div>
    </div>
  );
}

export default App;
