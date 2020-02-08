import React, { Fragment } from "react";
import { ActivityEntry } from "../../models/Entry";
import { ActivityList } from "../ActivityList/ActivityList";

export const InProgressActivity = ({
  entries
}: {
  entries: Array<ActivityEntry>;
}) => {
  return (
    <Fragment>
      <h5>Unfinished</h5>
      <ActivityList entries={entries} />
    </Fragment>
  );
};
