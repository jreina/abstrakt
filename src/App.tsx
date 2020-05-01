import React from "react";
import "./App.css";
import { NewActivity } from "./components/NewActivity/NewActivity";
import { RecentActivity } from "./components/RecentActivity/RecentActivity";
import { TimeEntry, ActivityEntry, ReferenceEntry } from "./models/Entry";
import { providers, firebaseAppAuth } from "./backend/firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import { AppStateContext } from "./contexts/AppStateContext";
import { useAuth } from "./hooks/useauth";
import { Intro } from "./components/Intro/Intro";
import { Navigation } from "./components/Navigation/Navigation";
import { HashRouter, Route } from "react-router-dom";
import { EditActivity } from "./components/EditActivity/EditActivity";

type AppState = {
  recent: Array<ActivityEntry>;
  unfinished: Array<TimeEntry>;
  references: Array<ReferenceEntry>;
};

function App({ signOut, signInWithGoogle }: any) {
  const { initializing, user } = useAuth();

  return (
    <HashRouter>
      <Navigation signOut={signOut} />
      <div className="container-xl">
        {!initializing && !user ? <Intro signIn={signInWithGoogle} /> : null}
        {!initializing && user ? (
          <AppStateContext.Provider value={{ user }}>
            <Route path="/" exact>
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <NewActivity />
                  <RecentActivity />
                </div>
              </div>
            </Route>
            <Route path="/edit/:activityId" component={EditActivity} />
          </AppStateContext.Provider>
        ) : null}
      </div>
    </HashRouter>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
