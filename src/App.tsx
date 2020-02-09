import React, { useState, useEffect } from "react";
import "./App.css";
import { NewActivity } from "./components/NewActivity/NewActivity";
import { RecentActivity } from "./components/RecentActivity/RecentActivity";
import { InProgressActivity } from "./components/InProgressActivity/InProgressActivity";
import { TimeEntry, ActivityEntry, ReferenceEntry } from "./models/Entry";
import firebaseApp, { providers, firebaseAppAuth } from "./backend/firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import { EntryProvider } from "./contexts/EntryContext";

type AppState = {
  recent: Array<ActivityEntry>;
  unfinished: Array<TimeEntry>;
  references: Array<ReferenceEntry>;
};

function App({ user, signOut, signInWithGoogle }: any) {
  const [state, setState] = useState<AppState>({
    recent: [],
    references: [],
    unfinished: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const db = firebaseApp.firestore();
      const data = await db.collection("references").get();
      // @ts-ignore
      const refs = data.docs.map(x => x.data());

      // @ts-ignore
      setState(x => ({ ...x, references: refs }));
    };
    fetchData();
  }, [user]);

  return (
    <div className="container-xl">
      {user ? (
        <EntryProvider value={{ user }}>
          <div className="row">
            <div className="col-md-12">
              <p>Hello, {user.displayName}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <NewActivity entries={state.references} user={user} />
            </div>
            <div className="col-md-4">
              <RecentActivity user={user} />
            </div>
          </div>
        </EntryProvider>
      ) : (
        <p>Please sign in.</p>
      )}
      {user ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
