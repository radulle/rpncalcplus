import * as React from "react";
import { KeyInterface } from "./types";

export default function useKeyboard(
  keys: KeyInterface[],
  mod: Set<string>,
  toggleMod: (key: string, set?: boolean) => () => void
) {
  const [key, setKey] = React.useState<string | undefined>(undefined);

  const handleKeyDown = (ev: KeyboardEvent) => {
    ev.preventDefault();
    if (ev.key === key || mod.has(ev.key)) return;
    if (
      ev.key === "F1" ||
      ev.key === "Control" ||
      ev.key === "Alt" ||
      ev.key === "Shift"
    ) {
      toggleMod(ev.key, true)();
      return;
    }
    if (
      mod.has("Control") &&
      keys.some((e) => e.kbd === ev.key.toLowerCase())
    ) {
      setKey(ev.key.toLowerCase());
      return;
    }
    setKey(ev.key);
  };

  const handleKeyUp = (ev: KeyboardEvent) => {
    ev.preventDefault();
    if (
      ev.key === "F1" ||
      ev.key === "Control" ||
      ev.key === "Alt" ||
      ev.key === "Shift"
    ) {
      toggleMod(ev.key, false)();
      return;
    }
    if (
      mod.has("Control") &&
      keys.some((e) => e.kbd === ev.key.toLowerCase())
    ) {
      keys.find((e) => e.kbd === ev.key.toLowerCase())?.onClick?.();
      return;
    } else {
      keys.find((e) => e.kbd === ev.key)?.onClick?.();
    }
    setKey(undefined);
  };

  const handleContextMenu = (ev: MouseEvent) => ev.preventDefault();

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return { key, mod };
}
