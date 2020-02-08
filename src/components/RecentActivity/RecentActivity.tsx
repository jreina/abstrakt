import React, { useState, useEffect, Fragment } from "react";
import { ActivityEntry } from "../../models/Entry";
import { ActivityList } from "../ActivityList/ActivityList";
import firebaseApp from "../../backend/firebase";

type FirestoreDocState = {
  isLoading: boolean;
  data: firebase.firestore.QuerySnapshot<ActivityEntry> | null;
};

const useFirestoreDoc = (
  ref: firebase.firestore.CollectionReference<ActivityEntry>
) => {
  const [docState, setDocState] = useState<FirestoreDocState>({
    isLoading: true,
    data: null
  });

  useEffect(() => {
    ref.onSnapshot(doc => {
        setDocState({
          isLoading: false,
          data: doc
        });
    });
  }, []);

  return docState;
};

export const RecentActivity = ({ user }: any) => {
  const ref = firebaseApp
    .firestore()
    .collection(`users/${user.uid}/timeEntries`)
    .orderBy("start", "desc")
    .limit(10);
  // @ts-ignore
  const { data: entries } = useFirestoreDoc(ref);

  return (
    <Fragment>
      <h5>Recent</h5>
      <ActivityList
        entries={entries?.docs.map(x => ({ id: x.id, ...x.data() }))}
      />
    </Fragment>
  );
};
