import React, { Fragment, ChangeEvent, useState } from "react";
import { ReferenceEntry } from "../../models/Entry";
import EntryManager from "../../managers/EntryManager";

type RefSearchProps = {
  refs: Array<ReferenceEntry>;
  onSelect: (ref: ReferenceEntry) => void;
};
export const RefSearch = ({ refs, onSelect }: RefSearchProps) => {
  const [filtered, setFiltered] = useState<Array<ReferenceEntry>>([]);

  const handleInputChange = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    //@ts-ignore
    const term = event.target.value;
    const results = term === "" ? [] : refs.filter(x => x.title.includes(term));
    setFiltered(results);
  };
  return (
    <Fragment>
      <div className="form-group">
        <label htmlFor="search" className="sr-only">
          search for a ref
        </label>
        <input
          type="search"
          className="form-control"
          id="search"
          placeholder="search for a ref"
          onKeyUp={handleInputChange}
        />
      </div>
      {filtered ? (
        <ul className="list-group">
          {filtered.map(({ title, id, tags }) => (
            <li className="list-group-item list-group-item-action" key={id}>
              <h5 className="mb-1">{title}</h5>
              <div className="mb-1">
                <small>
                  <span className="link" onClick={() => EntryManager.start(id)}>start</span> |{" "}
                  <span>instance</span> | <span>edit</span>
                </small>
              </div>
              <small className="text-muted">
                {tags ? <em>{tags.join(", ")}</em> : null}
              </small>
            </li>
          ))}
        </ul>
      ) : null}
    </Fragment>
  );
};
