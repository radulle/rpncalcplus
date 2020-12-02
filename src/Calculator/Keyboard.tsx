import * as React from "react"
import { classNames } from "."
import { useContext } from "./Context"
import { Key } from "./Key"

export function Keyboard() {
  const { mod, keys } = useContext()
  return (
    <div
      className={classNames([
        "keyboard",
        (mod.has("help") || mod.has("hist")) && "fullscreen",
      ])}
    >
      {keys
        .filter((e) =>
          mod.has("Shift")
            ? mod.has("Control")
              ? e.secondary && e.inverse !== false
              : e.secondary && e.inverse !== true
            : e.main
        )
        .map((e) => (
          <Key {...e} key={e.kbd} />
        ))}
    </div>
  )
}
