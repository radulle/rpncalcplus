import * as React from "react"
import EventsContext from "./EventsContext"
import { KeyInterface } from "./types"
import { classNames } from "./utils"

const map = (kbd: string) => {
  switch (kbd) {
    case "Enter":
      return "⏎"
    case "ArrowLeft":
      return "←"
    case "ArrowRight":
      return "→"
    case "ArrowUp":
      return "↑"
    case "ArrowDown":
      return "↓"
    case "Backspace":
      return "⌫"
    case "Delete":
      return "⌦"
    case "Shift":
      return "⇧"
    case "Control":
      return "⌃"
    default:
      return kbd
  }
}

export default function Key({
  color,
  title,
  kbd,
  className,
  onClick,
  modifier,
}: KeyInterface) {
  const { key, mod } = React.useContext(EventsContext)

  const handleClick = () => {
    navigator.vibrate?.(25)
    onClick()
  }

  return (
    <button
      onClick={handleClick}
      className={classNames([
        'key',
        color,
        !modifier && key === kbd && "active",
        modifier && mod.has(kbd) && "active",
        className,
      ])}
    >
      <div className="btn">{title}</div>
      {(mod.has("Alt") || mod.has("F1")) && (
        <div className="badge">{map(kbd)}</div>
      )}
    </button>
  )
}
