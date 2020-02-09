import React, { Fragment, useState } from "react";
import { ReferenceEntry } from "../../models/Entry";
import firebaseApp from "../../backend/firebase";
import { useFirestoreDoc } from "../../hooks/useFirestoreDoc";

type RefSearchProps = {
  onSelect: (ref: ReferenceEntry) => void;
  user: any;
};
export const RefSearch = ({ onSelect, user }: RefSearchProps) => {
  const ref = firebaseApp
    .firestore()
    .collection(`users/${user.uid}/references`);

  // @ts-ignore
  const { data: refs } = useFirestoreDoc<ReferenceEntry>(ref);
  const [filtered, setFiltered] = useState<Array<ReferenceEntry>>([]);
  
  const clearInput = () => setFiltered([]);

  const handleInputChange = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    //@ts-ignore
    const term = event.target.value;
    const results =
      term === ""
        ? []
        : refs.docs.filter(
            (x: firebase.firestore.QueryDocumentSnapshot<ReferenceEntry>) =>
              x.get("title").includes(term)
          );
    setFiltered(results.map((x: firebase.firestore.QueryDocumentSnapshot<ReferenceEntry>) => x.data()));
    if (event.key === "Enter") {
      onSelect({
        title: term,
        tags: []
      });
      clearInput();
    }
  };

  const handleClick = (entry: ReferenceEntry) => (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setFiltered([]);
    onSelect(entry);
    clearInput();
  };

  return (
    <Fragment>
      <div className="form-group">
        <label htmlFor="search" className="sr-only">
          search for a ref
        </label>
        <input
          type="search"
          className="form-control"
          id="search"
          placeholder="search for a ref"
          onKeyUp={handleInputChange}
          autoComplete="off"
        />
      </div>
      {filtered ? (
        <ul className="list-group list-group-flush">
          {filtered.map(entry => (
            <li
              className="list-group-item link"
              key={entry.id}
              onClick={handleClick(entry)}
            >
              {entry.title}
            </li>
          ))}
        </ul>
      ) : null}
    </Fragment>
  );
};
