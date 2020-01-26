import React, { useState, useEffect, Fragment } from "react";
import { ActivityEntry } from "../../models/Entry";
import EntryManager from "../../managers/EntryManager";
import { ActivityList } from "../ActivityList/ActivityList";

export const RecentActivity = ({
  entries
}: {
  entries: Array<ActivityEntry>;
}) => {
  return (
    <Fragment>
      <h5>Recent</h5>
      <ActivityList entries={entries} />
    </Fragment>
  );
};
