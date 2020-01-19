import React from "react";
import { TimeEntry } from "../../models/Entry";
import moment from "moment";
import EntryManager from "../../managers/EntryManager";
import { DropButton } from "../DropButton";

const finishEntry = (id: string) => () => EntryManager.end(id);

const time = (entry: TimeEntry) => {
  const badges = [
    <span key="1">
      <em>{entry.start.format("HH:mm")}</em>
    </span>
  ];

  if ("end" in entry) {
    const duration = moment(entry.end).diff(moment(entry.start), "minutes");
    badges.push(
      <span key="2">
        <em>
          {" "}
          - {entry?.end?.format("HH:mm")} ({duration} minutes)
        </em>
      </span>
    );
  } else {
    const duration = moment().diff(moment(entry.start), "minutes");
    badges.push(
      <span key="3">
        <em>
          {" "}
          - now ({duration} minutes){" "}
          <span className="link" onClick={finishEntry(entry.id)}>
            finish
          </span>
        </em>
      </span>
    );
  }

  return badges;
};

export const TimeEntryListItem = ({ entry }: { entry: TimeEntry }) => {
  return (
    <li className="list-group-item list-group-item-action" key={entry.id}>
      <div className="d-flex w-100 justify-content-between">
        <p className="mb-1">{entry.title}</p>
        <small>
          <DropButton dropAction={() => EntryManager.drop(entry.id)} />
        </small>
      </div>
      <div className="d-flex w-100 justify-content-between">
        {entry.tags ? (
          <small>
            <em>{entry.tags.join(", ")}</em>
          </small>
        ) : null}

        <small>{time(entry)}</small>
      </div>
    </li>
  );
};
