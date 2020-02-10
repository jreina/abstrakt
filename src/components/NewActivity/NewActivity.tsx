import React, { useState } from "react";
import { ReferenceEntry } from "../../models/Entry";
import { RefSearch } from "../RefSearch/RefSearch";
import firebaseApp from "../../backend/firebase";
import moment from "moment";
import * as R from "ramda";
import { useAppState } from "../../hooks/useAppState";

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

export const NewActivity = () => {
  const [currentTag, setCurrentTag] = useState<string>("");
  const [selectedRef, setSelectedRef] = useState<ReferenceEntry>();
  const { user } = useAppState();
  const handleStartClick = async () => {
    if (!selectedRef || !user) return;
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
    setSelectedRef(undefined);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentTag(event.target.value);
  };

  const dropTag = (tag: string) =>
    setSelectedRef(R.over(tagLens, R.filter(R.pipe(R.equals(tag), R.not))));

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && currentTag !== "") {
      setSelectedRef(R.over(tagLens, R.concat([currentTag])));
      setCurrentTag('');
    }
  };

  return (
    <>
      <h5>Start something new</h5>
      <div className="card">
        <div className="card-body">
          <RefSearch onSelect={setSelectedRef} />

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
                  onChange={handleChange}
                  value={currentTag}
                  onKeyDown={handleKeyDown}
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
  );
};
