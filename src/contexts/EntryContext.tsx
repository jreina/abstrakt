import React from "react";

interface AppState {
  user: any;
}
const EntryContext = React.createContext<AppState>({ user: undefined});

export const EntryProvider = EntryContext.Provider;
export const EntryConsumer = EntryContext.Consumer;
