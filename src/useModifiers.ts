import * as React from "react";

export default function useKeyboard() {
  const [mod, setMod] = React.useState<Set<string>>(new Set());

  const toggleMod = (key: string, set?: boolean) => () => {
    if (set === true) return setMod((prev) => new Set(prev).add(key));
    if (mod.has(key)) {
      return setMod((prev) => {
        const mods = new Set(prev);
        mods.delete(key);
        return mods;
      });
    }
    return setMod((prev) => new Set(prev).add(key));
  };

  return { mod, toggleMod };
}
