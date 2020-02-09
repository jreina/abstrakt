import React, { Fragment } from "react";
import { ActivityEntry } from "../../models/Entry";
import { ActivityList } from "../ActivityList/ActivityList";
import firebaseApp from "../../backend/firebase";
import { useFirestoreDoc } from "../../hooks/useFirestoreDoc";

export const RecentActivity = ({ user }: any) => {
  const ref = firebaseApp
    .firestore()
    .collection(`users/${user.uid}/timeEntries`)
    .orderBy("start", "desc")
    .limit(10);

  // @ts-ignore
  const { data: entries } = useFirestoreDoc<ActivityEntry>(ref);

  return (
    <Fragment>
      <h5>Recent</h5>
      <ActivityList
        entries={entries?.docs.map(
          (x: firebase.firestore.QueryDocumentSnapshot<ActivityEntry>) => ({
            id: x.id,
            ...x.data()
          })
        )}
      />
    </Fragment>
  );
};
