import React, { useState, useEffect, Fragment } from "react";
import ReferenceManager from "../managers/ReferenceManager";
import { Entry } from "../models/Entry";

export const RefList = () => {
  const [refs, setRefs] = useState<Array<Entry>>();
  useEffect(() => {
    ReferenceManager.list().then(setRefs);
  }, []);

  return refs ? (
    <ul>
      {refs.map(({ title }) => (
        <li>{title}</li>
      ))}
    </ul>
  ) : (
    <Fragment />
  );
};
