import * as React from "react"
import Key from "./Key"
import { KeyInterface } from "./types"
import { classNames } from "./utils"

export default function Keyboard({
  mod,
  keys,
  kbd,
}: {
  mod: Set<string>
  keys: KeyInterface[]
  kbd: {
    key: string | undefined
    mod: Set<string>
  }
}) {
  return (
    <div className={classNames(["keyboard", !!mod.has("help") && "help"])}>
      {keys
        .filter((e) =>
          kbd.mod.has("Shift")
            ? kbd.mod.has("Control")
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
