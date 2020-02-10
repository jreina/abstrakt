import { useState, useEffect } from "react";

type FirestoreDocState<T> = {
  isLoading: boolean;
  data: Array<T> | null;
};

type Indexed = { id?: string; }

export const useFirestoreDoc = <T extends Indexed>(
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
        data: doc.docs.map((x: firebase.firestore.QueryDocumentSnapshot<T>) => ({ ...x.data(), id: x.id }))
      });
    });
  }, []);

  return docState;
};
