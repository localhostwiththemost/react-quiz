import React from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";

const override = css`
  display: "block",
  margin: "0 auto",
  borderColor: "red",
`;

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#0052c4");

  return (
    <DotLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default Loader;
