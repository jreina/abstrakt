import { ActivityEntry, TimeEntry } from "../models/Entry";
import { formatDates, formatTimeEntry } from "../util/formatDates";
import { map } from "lodash/fp";

class EntryRA {
  start(id: string) {
    return fetch(`/api/entries/start/${id}`, { method: "POST" }).then(x =>
      x.json()
    );
  }

  end(id: string) {
    return fetch(`/api/entries/end/${id}`, { method: "POST" }).then(x =>
      x.json()
    );
  }

  drop(id: string) {
    return fetch(`/api/entries/drop/${id}`, { method: "POST" }).then(x =>
      x.json()
    );
  }

  recent(): Promise<Array<ActivityEntry>> {
    return fetch(`/api/entries/recent`)
      .then<Array<ActivityEntry>>(x => x.json())
      .then(map(formatDates));
  }

  unfinished(): Promise<Array<TimeEntry>> {
    return fetch(`/api/entries/unfinished`)
      .then<Array<TimeEntry>>(x => x.json())
      .then(map(formatTimeEntry));
  }
}

export default new EntryRA();
