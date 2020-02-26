import React from "react";
import { ActivityEntry } from "../../models/Entry";
import { ActivityList } from "../ActivityList/ActivityList";
import firebaseApp from "../../backend/firebase";
import { useFirestoreDoc } from "../../hooks/useFirestoreDoc";
import { useAppState } from "../../hooks/useAppState";

export const RecentActivity = () => {
  const { user } = useAppState();
  const ref = firebaseApp
    .firestore()
    .collection(`users/${(user as firebase.User).uid}/timeEntries`)
    .orderBy("start", "desc")
    .limit(10);

  // @ts-ignore
  const { data: entries } = useFirestoreDoc<ActivityEntry>(ref);

  return <ActivityList entries={entries} />;
};
