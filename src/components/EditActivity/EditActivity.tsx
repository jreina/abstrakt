import React, { useState, useEffect } from "react";
import { RouteChildrenProps } from "react-router-dom";
import firebaseApp from "../../backend/firebase";
import { useAppState } from "../../hooks/useAppState";
import { User } from "firebase";
import { ActivityEntry } from "../../models/Entry";
import * as R from "ramda";

const TagList = (
  tags: Array<string> | undefined,
  removeFn: (tag: string) => void
) =>
  tags
    ? tags.map((tag, idx) => (
        <span
          key={idx}
          className="badge badge-dark pointer mr-1"
          onClick={() => removeFn(tag)}
        >
          <span>{tag}</span>
        </span>
      ))
    : null;

const tagLens = R.lensProp("tags");
export const EditActivity = ({
  match
}: RouteChildrenProps<{ activityId: string }>) => {
  const { user } = useAppState();
  const [entry, setEntry] = useState<ActivityEntry>();
  const [currentTag, setCurrentTag] = useState<string>("");
  const doc = firebaseApp
    .firestore()
    .doc(
      `/users/${(user as User).uid}/timeEntries/${match?.params.activityId}`
    );

  useEffect(() => {
    console.log("effect");
    doc
      .get()
      // @ts-ignore
      .then(document => setEntry({ ...document.data(), id: document.id }));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentTag(event.target.value);
  };

  const dropTag = (tag: string) =>
    setEntry(R.over(tagLens, R.filter(R.pipe(R.equals(tag), R.not))));

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && currentTag !== "") {
      setEntry(R.over(tagLens, R.concat([currentTag])));
      setCurrentTag("");
    }
  };

  return entry ? (
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="activity-title">Title</label>
          <input
            value={entry.title}
            onChange={e => setEntry(R.assoc("title", e.target.value))}
            className="form-control"
            id="activity-title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="add-tag">Tags</label>
          <div className="mb-1">{TagList(entry.tags, dropTag)}</div>
          <input
            type="search"
            className="form-control"
            id="add-tag"
            placeholder="press enter to add..."
            autoComplete="off"
            onChange={handleChange}
            value={currentTag}
            onKeyDown={handleKeyDown}
          />
          <em>click or tap a tag to remove it</em>
        </div>
      </div>
      <div className="col-md-4"></div>
    </div>
  ) : (
    <h1>No activity selected</h1>
  );
};
