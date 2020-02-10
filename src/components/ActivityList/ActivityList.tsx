import React from "react";
import { ActivityEntry } from "../../models/Entry";
import Loader from "react-loader-spinner";
import { TimeEntryListItem } from "../TimeEntryListItem/TimeEntryListItem";
import { InstanceEntryListItem } from "../InstanceEntryListItem/InstanceEntryListItem";

export const ActivityList = ({
  entries
}: {
  entries: Array<ActivityEntry> | null;
}) => {
  return (
    <ul className="list-group">
      {entries === null ? (
        <span className="d-flex justify-content-center">
          <Loader type="MutatingDots" />
        </span>
      ) : (
        entries.map((entry, k) => {
          if ("start" in entry) {
            return <TimeEntryListItem entry={entry} key={k} />;
          }
          else if ("time" in entry) {
            return <InstanceEntryListItem entry={entry} key={k} />;
          } 
          return null;
        })
      )}
    </ul>
  );
};
