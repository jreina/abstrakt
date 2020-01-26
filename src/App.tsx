import React, { useState, useEffect } from "react";
import "./App.css";
import { NewActivity } from "./components/NewActivity/NewActivity";
import { RecentActivity } from "./components/RecentActivity/RecentActivity";
import { InProgressActivity } from "./components/InProgressActivity/InProgressActivity";
import {
  Entry,
  TimeEntry,
  ActivityEntry,
  ReferenceEntry
} from "./models/Entry";
import EntryManager from "./managers/EntryManager";
import ReferenceManager from "./managers/ReferenceManager";

type AppState = {
  recent: Array<ActivityEntry>;
  unfinished: Array<TimeEntry>;
  references: Array<ReferenceEntry>;
};

type Updateable = {
  update: () => void;
}

const EntryContext = React.createContext<AppState & Updateable>({
  recent: [],
  references: [],
  unfinished: []
});

export const EntryProvider = EntryContext.Provider;
export const EntryConsumer = EntryContext.Consumer;

function App() {
  const [state, setState] = useState<AppState>({
    recent: [],
    references: [],
    unfinished: []
  });

  const fetchEntries = () => {
    EntryManager.unfinished().then((unfinished: Array<TimeEntry>) =>
      setState(state => ({ ...state, unfinished }))
    );
    EntryManager.recent().then(recent =>
      setState(state => ({ ...state, recent }))
    );
    ReferenceManager.list().then(references =>
      setState(state => ({ ...state, references }))
    );
  };

  useEffect(fetchEntries, []);

  return (
    <div className="container-xl">
      <div className="row">
        <div className="col-md-4">
          <InProgressActivity entries={state.unfinished} />
        </div>
        <div className="col-md-4">
          <RecentActivity entries={state.recent} />
        </div>
        <div className="col-md-4">
          <EntryConsumer></EntryConsumer>
          <NewActivity />
        </div>
      </div>
    </div>
  );
}

export default App;
