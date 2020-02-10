import React, { useState, Fragment } from "react";
import { ReferenceEntry } from "../../models/Entry";

export const RefList = () => {
  const [refs, setRefs] = useState<Array<ReferenceEntry>>();


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
