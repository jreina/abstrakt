import React, { useState } from "react";
import { ReferenceEntry } from "../../models/Entry";
import { RefSearch } from "../RefSearch/RefSearch";
import firebaseApp from "../../backend/firebase";
import moment from "moment";
import * as R from "ramda";

const tagLens = R.lensProp("tags");

const TagList = (
  tags: Array<string> | undefined,
  removeFn: (tag: string) => void
) =>
  tags
    ? tags.map((tag, idx) => (
        <span key={idx} className="badge badge-dark badge-pill">
          {tag}{" "}
          <span className="link" onClick={() => removeFn(tag)}>
            x
          </span>
        </span>
      ))
    : null;

export const NewActivity = ({
  entries,
  user
}: {
  entries: Array<ReferenceEntry>;
  user: any;
}) => {
  const [selectedRef, setSelectedRef] = useState<ReferenceEntry>();
  const handleStartClick = () => {
    if (!selectedRef) return;
    firebaseApp
      .firestore()
      .collection(`users/${user.uid}/timeEntries`)
      .add({
        start: moment()
          .utc()
          .toISOString(),
        title: selectedRef.title,
        tags: selectedRef.tags
      });

      // Add reference if no ID exists on the ref
    if (!selectedRef.id) {
      firebaseApp
        .firestore()
        .collection(`users/${user.uid}/references`)
        .add(selectedRef);
    }
  };
  const handleInputChange = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      //@ts-ignore
      const term = event.target.value;
      setSelectedRef(R.over(tagLens, R.concat([term])));
    }
  };

  const dropTag = (tag: string) =>
    setSelectedRef(R.over(tagLens, R.filter(R.pipe(R.equals(tag), R.not))));

  return <>
    <h5>Start something new</h5>
    <div className="card">
      <div className="card-body">
        {entries ? (
          // @ts-ignore
          <RefSearch refs={entries} onSelect={setSelectedRef} user={user} />
        ) : null}
        <hr />
        {selectedRef ? (
          <div>
            <h5 className="card-title">{selectedRef.title}</h5>
            <div>{TagList(selectedRef.tags, dropTag)}</div>
            <div className="form-group">
              <label htmlFor="add-tag" className="sr-only">
                add a tag
              </label>
              <input
                type="search"
                className="form-control"
                id="add-tag"
                placeholder="add a tag..."
                autoComplete="off"
                onKeyUp={handleInputChange}
              />
            </div>
            <button
              className="btn btn-outline-success btn-block btn-sm"
              onClick={handleStartClick}
            >
              Start
            </button>
            <button className="btn btn-outline-success btn-block btn-sm">
              Instance
            </button>
          </div>
        ) : null}
      </div>
    </div>
  </>
};
