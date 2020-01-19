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
   * End an entry
   * @param id
   */
  end(id: string): Promise<void> {
    return EntryRA.end(id);
  }

  /**
   * Drop an entry
   * @param id
   */
  drop(id: string): Promise<void> {
    return EntryRA.drop(id);
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
