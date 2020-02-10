import React, { useState } from "react";

type DropButtonProps = { dropAction: () => Promise<void> };

export const DropButton = ({ dropAction }: DropButtonProps) => {
  const [dropClicked, setDropClicked] = useState(false);
  return dropClicked ? (
    <span>
      sure?{" "}
      <span className="link pointer text-danger" onClick={dropAction}>
        yup
      </span>{" "}
      <span className="link pointer" onClick={() => setDropClicked(false)}>
        nah
      </span>
    </span>
  ) : (
    <span className="link pointer" onClick={() => setDropClicked(true)}>
      drop
    </span>
  );
};
