import React, { Fragment, useState } from "react";
import { ReferenceEntry } from "../../models/Entry";

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
    if (event.key === "Enter")
      onSelect({
        title: term,
        tags: []
      });
  };

  const handleClick = (entry: ReferenceEntry) => (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setFiltered([]);
    onSelect(entry);
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
          autoComplete="off"
        />
      </div>
      {filtered ? (
        <ul className="list-group list-group-flush">
          {filtered.map(entry => (
            <li
              className="list-group-item link"
              key={entry.id}
              onClick={handleClick(entry)}
            >
              {entry.title}
            </li>
          ))}
        </ul>
      ) : null}
    </Fragment>
  );
};
