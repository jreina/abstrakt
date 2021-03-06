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

type AppState = {
  recent: Array<ActivityEntry>;
  unfinished: Array<TimeEntry>;
  references: Array<ReferenceEntry>;
};

function App({ signOut, signInWithGoogle }: any) {
  const { initializing, user } = useAuth();

  return <>
    <Navigation signOut={signOut} />
    <div className="container-xl">
      {!initializing && !user ? <Intro signIn={signInWithGoogle}/> : null}
      {!initializing && user ? (
        <AppStateContext.Provider value={{ user }}>
          <div className="row">
            <div className="col-md-3">
            </div>
            <div className="col-md-6">
              <NewActivity />
              <RecentActivity />
            </div>
          </div>
        </AppStateContext.Provider>
      ) : (
        null
      )}
    </div>
  </>
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
