import React from "react";
import dynamic from "next/dynamic";

const GridLoader = dynamic(
  () => import("react-spinners").then((lib) => lib.GridLoader),
  {
    ssr: false,
  },
);

type Props = {
  color?: string;
};

const GridSpinner = ({ color = "red" }: Props) => {
  return <GridLoader color={color} />;
};

export default GridSpinner;
