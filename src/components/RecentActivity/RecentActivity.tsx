import React, { useState, useEffect, Fragment } from "react";
import { ActivityEntry } from "../../models/Entry";
import EntryManager from "../../managers/EntryManager";
import * as _ from "lodash";
import { ActivityList } from "../ActivityList/ActivityList";

export const RecentActivity = () => {
  const [entries, setEntries] = useState<Array<ActivityEntry>>();
  const fetchEntries = () => {
    EntryManager.recent().then(setEntries);
  };

  useEffect(fetchEntries, []);
  return (
    <Fragment>
      <h5>Recent</h5>
      <ActivityList entries={entries} />
    </Fragment>
  );
};
