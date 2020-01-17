import EntryRA from "../data/EntryRA";
import { TimeEntry, InstanceEntry } from "../models/Entry";

class EntryManager {
  /**
   * Create a new start entry
   * @param id
   */
  start(id: string): Promise<Array<TimeEntry>> {
    return EntryRA.start(id);
  }

  /**
   *
   */
  recent(): Promise<Array<TimeEntry | InstanceEntry>> {
    return EntryRA.recent();
  }
  
  /**
   *
   */
  unfinished(): Promise<Array<TimeEntry | InstanceEntry>> {
    return EntryRA.unfinished();
  }
}

export default new EntryManager();
