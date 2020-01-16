import ReferenceRA from "../data/ReferenceRA";
import { Entry } from "../models/Entry";

class ReferenceManager {
  list(): Promise<Array<Entry>> {
    return ReferenceRA.list();
  }
}

export default new ReferenceManager();
