import React, { useState } from "react";
import { InstanceEntry } from "../../models/Entry";
import { DropButton } from "../DropButton";
import EntryManager from "../../managers/EntryManager";

export const InstanceEntryListItem = ({ entry }: { entry: InstanceEntry }) => {
  return (
    <li className="list-group-item list-group-item-action" key={entry.id}>
      <div className="d-flex w-100 justify-content-between">
        <p className="mb-1">{entry.title}</p>
        <small>
          <DropButton dropAction={() => EntryManager.drop(entry.id)} />
        </small>
      </div>
      <div className="d-flex w-100 justify-content-between">
        {entry.data ? (
          <small>
            <em>
              {typeof entry.data === "string"
                ? entry.data
                : entry?.data?.join(", ")}
            </em>
          </small>
        ) : null}
        <small>
          <em>{entry.time.format("MM/DD HH:mm")}</em>
        </small>
      </div>
    </li>
  );
};
