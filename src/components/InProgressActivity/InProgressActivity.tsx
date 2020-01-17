import React, { useState, useEffect, Fragment } from "react";
import { ActivityEntry } from "../../models/Entry";
import EntryManager from "../../managers/EntryManager";
import * as _ from "lodash";
import { ActivityList } from "../ActivityList/ActivityList";

export const InProgressActivity = () => {
  const [entries, setEntries] = useState<Array<ActivityEntry>>();
  const fetchEntries = () => {
    EntryManager.unfinished().then(setEntries);
  };

  useEffect(fetchEntries, []);
  return <Fragment>
    <h5>Unfinished</h5>
    <ActivityList entries={entries} />
    </Fragment>
  ;
};
