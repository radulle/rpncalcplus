import * as React from "react";

export default React.createContext<{
  key: string | undefined;
  mod: Set<string>;
}>({ key: undefined, mod: new Set() });
