import React, { useState, useEffect } from "react";
import "./App.css";
import { NewActivity } from "./components/NewActivity/NewActivity";
import { RecentActivity } from "./components/RecentActivity/RecentActivity";
import { TimeEntry, ActivityEntry, ReferenceEntry } from "./models/Entry";
import firebaseApp, { providers, firebaseAppAuth } from "./backend/firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import { AppStateContext } from "./contexts/AppStateContext";
import { useAuth } from "./hooks/useauth";
import Loader from "react-loader-spinner";
import { Intro } from "./components/Intro/Intro";

type AppState = {
  recent: Array<ActivityEntry>;
  unfinished: Array<TimeEntry>;
  references: Array<ReferenceEntry>;
};

function App({ signOut, signInWithGoogle }: any) {
  const { initializing, user } = useAuth();

  return (
    <div className="container-xl">
      {!initializing && !user ? <Intro signIn={signInWithGoogle}/> : null}
      {!initializing && user ? (
        <AppStateContext.Provider value={{ user }}>
          <div className="row">
            <div className="col-md-12">
              <p>
                Hello, {user.displayName} [
                <span className="link" onClick={signOut}>
                  sign out
                </span>
                ]
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <NewActivity />
            </div>
            <div className="col-md-4">
              <RecentActivity />
            </div>
          </div>
        </AppStateContext.Provider>
      ) : (
        null
      )}
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
