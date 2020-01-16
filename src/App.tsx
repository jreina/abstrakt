import React from "react";import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { RefList } from "./components/RefList";

function App() {
  return (
    <Router>
      <div className="App">
        <RefList />
        <Switch>
          <Route path="/about">
            <div>
              About
            </div>
          </Route>
          <Route path="/">
            <div>
              Home
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
