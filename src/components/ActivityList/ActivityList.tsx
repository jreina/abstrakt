import React from "react";
import { ActivityEntry, InstanceEntry } from "../../models/Entry";
import * as _ from "lodash";
import Loader from "react-loader-spinner";

const time = (entry: ActivityEntry) => {
  const badges = [];

  if ("start" in entry)
    badges.push(<span key="1">{entry.start.format("MM/DD HH:mm")}</span>);
  if ("end" in entry)
    badges.push(" ", <span key="2"> - {entry?.end?.format("MM/DD HH:mm")}</span>);
  if ("time" in entry)
    badges.push(<span key="3">Time: {entry.time.format("MM/DD HH:mm")}</span>);

  return badges;
};

export const ActivityList = ({
  entries
}: {
  entries?: Array<ActivityEntry>;
}) => {
  return (
      <ul className="list-group">
        {entries === undefined ? (
          <span className="d-flex justify-content-center">
            <Loader type="MutatingDots" />
          </span>
        ) : (
          entries.map(entry => (
            <li
              className="list-group-item list-group-item-action"
              key={entry.id}
            >
              <div className="d-flex w-100 justify-content-between">
                <p className="mb-1">{entry.title}</p>
                <small>{time(entry)}</small>
              </div>
              {entry.tags ? (
                <small>
                  <em>{entry.tags.join(", ")}</em>
                </small>
              ) : null}
            </li>
          ))
        )}
      </ul>
  );
};
