"use client";

import React from "react";
import { SWRConfig } from "swr";

type Props = {
  children: React.ReactNode;
};

const SwrConfigContext = ({ children }: Props) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SwrConfigContext;
