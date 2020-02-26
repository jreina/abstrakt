import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

type DropButtonProps = { dropAction: () => Promise<void> };

export const DropButton = ({ dropAction }: DropButtonProps) => {
  const [dropClicked, setDropClicked] = useState(false);
  return dropClicked ? (
    <span>
      delete?{" "}
      <span className="btn btn-outline-danger btn-sm mr-1" onClick={dropAction}>
        yup
      </span>{" "}
      <span className="btn btn-outline-dark btn-sm mr-1" onClick={() => setDropClicked(false)}>
        nah
      </span>
    </span>
  ) : (
    <button
      className="btn btn-outline-dark btn-sm mr-1"
      onClick={() => setDropClicked(true)}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );
};
