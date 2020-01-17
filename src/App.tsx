import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { RefList } from "./components/NewActivity/RefList";
import { NewActivity } from "./components/NewActivity/NewActivity";
import { RecentActivity } from "./components/RecentActivity/RecentActivity";

function App() {
  return (
    <div className="container-xl">
      <div className="row">
        <div className="col-md-12">Chart</div>
      </div>
      <div className="row">
        <div className="col-md-4">In Progress</div>
        <div className="col-md-4"><RecentActivity /></div>
        <div className="col-md-4">
          <NewActivity />
        </div>
      </div>
    </div>
  );
}

export default App;
