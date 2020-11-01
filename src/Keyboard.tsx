import * as React from "react"
import { useContext } from "./Context"
import Key from "./Key"
import { classNames } from "./utils"

export default function Keyboard() {
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
