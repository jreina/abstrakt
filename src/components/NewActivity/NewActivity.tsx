import React, { useState } from "react";
import { ReferenceEntry } from "../../models/Entry";
import { RefSearch } from "../RefSearch/RefSearch";
import firebaseApp from "../../backend/firebase";
import moment from "moment";

const TagList = (tags?: Array<string>) =>
  tags
    ? tags.map((tag, idx) => (
        <span key={idx} className="badge badge-dark">
          {tag}
        </span>
      ))
    : null;

export const NewActivity = ({
  entries, user
}: {
  entries: Array<ReferenceEntry>;
  user: any;
}) => {
  const [selectedRef, setSelectedRef] = useState<ReferenceEntry>();
  const handleStartClick = () => {
    if(!selectedRef) return;
    firebaseApp.firestore().collection(`users/${user.uid}/timeEntries`).add({
      start: moment().utc().toISOString(),
      title: selectedRef.title,
      tags: selectedRef.tags
    });
  };
  return (
    <div className="card">
      <div className="card-body">
        {entries ? (
          // @ts-ignore
          <RefSearch refs={entries} onSelect={setSelectedRef} />
        ) : null}
        <hr />
        {selectedRef ? (
          <div>
            <h5 className="card-title">
              {selectedRef.title} {TagList(selectedRef.tags)}
            </h5>
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
  );
};
