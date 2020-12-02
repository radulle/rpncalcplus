import * as React from "react"
import { classNames } from "."

export function Frame({
  mod,
  children,
}: {
  mod: Set<string>
  children: React.ReactNode
}) {
  return (
    <div
      className={classNames([
        "frame",
        (mod.has("help") || mod.has("hist")) && "fullscreen",
      ])}
    >
      {children}
    </div>
  )
}
