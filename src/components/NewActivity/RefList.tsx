import React, { useState, useEffect, Fragment } from "react";
import ReferenceManager from "../../managers/ReferenceManager";
import { ReferenceEntry } from "../../models/Entry";

export const RefList = () => {
  const [refs, setRefs] = useState<Array<ReferenceEntry>>();
  useEffect(() => {
    ReferenceManager.list().then(setRefs);
  }, []);

  return refs ? (
    <select>
      {refs.map(({ title, id }) => (
        <option key={id}>{title}</option>
      ))}
    </select>
  ) : (
    <Fragment />
  );
};
