import React, { Fragment, useState } from "react";
import { ReferenceEntry } from "../../models/Entry";
import firebaseApp from "../../backend/firebase";
import { useFirestoreDoc } from "../../hooks/useFirestoreDoc";
import { useAppState } from "../../hooks/useAppState";
import { User } from "firebase";

type RefSearchProps = {
  onSelect: (ref: ReferenceEntry) => void;
};
export const RefSearch = ({ onSelect }: RefSearchProps) => {
  const { user } = useAppState();
  const ref = firebaseApp
    .firestore()
    .collection(`users/${(user as User).uid}/references`);

  // @ts-ignore
  const { data: refs } = useFirestoreDoc<ReferenceEntry>(ref);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const clearInput = () => setSearchTerm("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    //@ts-ignore
    const term = event.target.value;
    setSearchTerm(term);
  };

  const handleClick = (entry: ReferenceEntry) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onSelect(entry);
    clearInput();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSelect({
        title: searchTerm,
        tags: []
      });
      setSearchTerm("");
    }
  };

  const handleDropRefClick = (id?: string) => () => {
    if (!id) return;
    return firebaseApp
      .firestore()
      .collection(`users/${(user as User).uid}/references`)
      .doc(id)
      .delete();
  };

  const filtered =
    searchTerm === ""
      ? []
      : refs?.filter((x: ReferenceEntry) => x.title.includes(searchTerm));
  return (
    <Fragment>
      <div className="form-group">
        <label htmlFor="search" className="sr-only">
          search for an activity
        </label>
        <input
          type="search"
          className="form-control"
          id="search"
          placeholder="search for a ref"
          onChange={handleInputChange}
          value={searchTerm}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        <em>press enter to create a new activity</em>
      </div>
      {filtered ? (
        <ul className="list-group list-group-flush">
          {filtered.map((entry: ReferenceEntry) => (
            <li className="list-group-item" key={entry.id}>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{entry.title}</h5>
                <span>
                  <button className="btn btn-outline-primary btn-sm" onClick={handleClick(entry)}>
                    Use this
                  </button>{" "}
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleDropRefClick(entry.id)}
                  >
                    Delete activity
                  </button>
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </Fragment>
  );
};
