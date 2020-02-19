import React, { useState } from "react";
import { TimeEntry } from "../../models/Entry";
import moment from "moment";
import { DropButton } from "../DropButton";
import firebaseApp from "../../backend/firebase";
import { useAppState } from "../../hooks/useAppState";
import { User } from "firebase";
import Timeago from "react-timeago";
import DateTimePicker from "react-datetime-picker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const finishEntry = (user: User, id: string) => () => {
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

const dropForUser = (user: any, id: any) => () => {
  return firebaseApp
    .firestore()
    .collection(`users/${user.uid}/timeEntries`)
    .doc(id)
    .delete();
};

export const TimeEntryListItem = ({ entry }: { entry: TimeEntry }) => {
  const { user } = useAppState();
  const [isEditing, setIsEditing] = useState(false);
  return (
    <li className="list-group-item list-group-item-action" key={entry.id}>
      <div className="d-flex w-100 justify-content-between">
        <p className="mb-1">{entry.title}</p>
        <p>
          <DropButton dropAction={dropForUser(user, entry.id)} />
          <button className="btn btn-outline-dark btn-sm"><FontAwesomeIcon icon={faTrashAlt} /></button>
          <button className="btn btn-outline-dark btn-sm"><FontAwesomeIcon icon={faPencilAlt} /></button>
        </p>
      </div>
      <div className="d-flex w-100 justify-content-between">
        {entry.tags ? (
          <small>
            <em>{entry.tags.join(", ")}</em>
          </small>
        ) : null}
        <small>
          <span>
            {isEditing ? (
              <DateTimePicker
                value={moment(entry.start).toDate()}
                disableClock="true"
              />
            ) : (
              <em>{moment(entry.start).format("MM/DD HH:mm")}</em>
            )}
          </span>
          {"end" in entry ? (
            <span>
              <em>
                {" "}
                - {moment(entry?.end).format("HH:mm")} (
                {moment(entry.end).diff(moment(entry.start), "minutes")}{" "}
                minutes)
              </em>
            </span>
          ) : (
            <span>
              <em>
                {" "}
                (<Timeago date={entry.start.toString()} />){" "}
                <span
                  className="link pointer"
                  onClick={finishEntry(user as User, entry.id)}
                >
                  finish
                </span>
              </em>
            </span>
          )}
        </small>
      </div>
    </li>
  );
};
