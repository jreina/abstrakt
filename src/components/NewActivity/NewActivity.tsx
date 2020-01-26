import React, { useState, useEffect } from "react";
import { ReferenceEntry } from "../../models/Entry";
import ReferenceManager from "../../managers/ReferenceManager";
import EntryManager from "../../managers/EntryManager";
import { RefSearch } from "../RefSearch/RefSearch";

const TagList = (tags?: Array<string>) =>
  tags
    ? tags.map((tag, idx) => (
        <span key={idx} className="badge badge-dark">
          {tag}
        </span>
      ))
    : null;

export const NewActivity = ({
  entries
}: {
  entries: Array<ReferenceEntry>;
  update: () => void;
}) => {

  const handleStartClick = () => {
    if (!selectedRef) return;

    EntryManager.start(selectedRef.id).then(fetchRefs);
  };

  return (
    <div className="card">
      <div className="card-body">
        {refs ? <RefSearch refs={refs} onSelect={setSelectedRef} /> : null}
        <hr />
        {selectedRef ? (
          <div>
            <h5 className="card-title">
              {selectedRef.title} {TagList(selectedRef.tags)}
            </h5>
            <div className="form-group">
              <label htmlFor="data">Data</label>
              <input
                type="text"
                id="data"
                className="form-control form-control-sm"
              />
            </div>
            <button className="btn btn-outline-success btn-block btn-sm">
              Add Tag
            </button>
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
