import React, { useState, useEffect, Fragment, ChangeEvent } from "react";
import { ReferenceEntry } from "../../models/Entry";
import ReferenceManager from "../../managers/ReferenceManager";
import EntryManager from "../../managers/EntryManager";

const TagList = (tags?: Array<string>) =>
  tags
    ? tags.map((tag, idx) => (
        <span key={idx} className="badge badge-dark">
          {tag}
        </span>
      ))
    : null;

export const NewActivity = () => {
  const [refs, setRefs] = useState<Array<ReferenceEntry>>();
  const [selectedRef, setSelectedRef] = useState<ReferenceEntry>();
  const fetchRefs = () => {
    ReferenceManager.list().then(setRefs);
  };

  useEffect(fetchRefs, []);

  const handleRefChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (!refs) return;
    const item = refs.find(ref => ref.id === e.target.value);
    setSelectedRef(item);
  };

  const handleStartClick = () => {
    if (!selectedRef) return;

    EntryManager.start(selectedRef.id).then(fetchRefs);
  };

  return (
    <div className="card">
      <div className="card-body">
        {refs ? (
          <select
            className="custom-select"
            size={5}
            defaultValue="-1"
            onChange={handleRefChange}
          >
            <option value="-1">Select a ref</option>
            {refs.map(({ title, id }) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </select>
        ) : null}
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
