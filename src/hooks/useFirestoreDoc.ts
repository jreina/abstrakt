import { useState, useEffect } from "react";

type FirestoreDocState<T> = {
  isLoading: boolean;
  data: firebase.firestore.QuerySnapshot<T> | null;
};

export const useFirestoreDoc = <T>(
  ref: firebase.firestore.CollectionReference<T>
) => {
  const [docState, setDocState] = useState<FirestoreDocState<T>>({
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
