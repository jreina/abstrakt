import ReferenceRA from "../data/ReferenceRA";
import { ReferenceEntry } from "../models/Entry";

class ReferenceManager {
  list(): Promise<Array<ReferenceEntry>> {
    return ReferenceRA.list();
  }
}

export default new ReferenceManager();
