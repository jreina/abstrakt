import React from "react";
import { TimeEntry } from "../../models/Entry";
import moment from "moment";
import { DropButton } from "../DropButton";
import { EntryConsumer } from "../../contexts/EntryContext";
import firebaseApp from "../../backend/firebase";

const finishEntry = (user: any, id: string) => () => {
  firebaseApp
    .firestore()
    .collection(`users/${user.uid}/timeEntries`)
    .doc(id)
    .update(
      "end",
      moment()
        .utc()
        .toISOString()
    );
};

const time = (entry: TimeEntry, user: any) => {
  const badges = [
    <span key="1">
      <em>{moment(entry.start).format("MM/DD HH:mm")}</em>
    </span>
  ];

  if ("end" in entry) {
    const duration = moment(entry.end).diff(moment(entry.start), "minutes");
    badges.push(
      <span key="2">
        <em>
          {" "}
          - {moment(entry?.end).format("HH:mm")} ({duration} minutes)
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
          <span className="link" onClick={finishEntry(user, entry.id)}>
            finish
          </span>
        </em>
      </span>
    );
  }

  return badges;
};

const dropForUser = (user: any, id: any) => () => {
  return firebaseApp
    .firestore()
    .collection(`users/${user.uid}/timeEntries`)
    .doc(id)
    .delete();
};

export const TimeEntryListItem = ({ entry }: { entry: TimeEntry }) => {
  return (
    <li className="list-group-item list-group-item-action" key={entry.id}>
      <div className="d-flex w-100 justify-content-between">
        <p className="mb-1">{entry.title}</p>
        <small>
          <EntryConsumer>
            {s => <DropButton dropAction={dropForUser(s.user, entry.id)} />}
          </EntryConsumer>
        </small>
      </div>
      <div className="d-flex w-100 justify-content-between">
        {entry.tags ? (
          <small>
            <em>{entry.tags.join(", ")}</em>
          </small>
        ) : null}
        <EntryConsumer>
        {s => <small>{time(entry, s.user)}</small>}
        </EntryConsumer>
      </div>
    </li>
  );
};
