import React, { useState, ReactNode } from "react";
import { Entry } from "../models/Entry";

interface AppState {
  entries: Array<Entry>;
}
const EntryContext = React.createContext<Array<Entry>>([]);

export const EntryProvider = EntryContext.Provider;
export const EntryConsumer = EntryContext.Consumer;
