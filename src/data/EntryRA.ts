import { TimeEntry, InstanceEntry, ActivityEntry } from "../models/Entry";
import { formatDates } from "../util/formatDates";
import { map } from "lodash/fp";

class EntryRA {
  start(id: string) {
    return fetch(`/api/entries/start/${id}`, { method: "POST" }).then(x =>
      x.json()
    );
  }
  recent(): Promise<Array<ActivityEntry>> {
    return fetch(`/api/entries/recent`)
      .then<Array<ActivityEntry>>(x => x.json())
      .then(map(formatDates));
  }
}

export default new EntryRA();
