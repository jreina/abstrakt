import React from "react";

interface AppState {
  user: firebase.User | null;
}
export const AppStateContext = React.createContext<AppState>({ user: null});
