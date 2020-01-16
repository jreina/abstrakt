import EntryRA from "../data/EntryRA";

class EntryManager {
  start(id: string) {
    return EntryRA.start(id);
  }
}

export default new EntryManager();
