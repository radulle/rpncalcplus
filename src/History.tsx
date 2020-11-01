import * as React from "react"
import SplitNum from "./SplitNum"
import Item from "./Item"
import { useContext } from "./Context"

let used = false

export default function History({
  commands,
  slice,
}: {
  commands: Array<string>
  slice: (i: number) => void
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { toggleMod, handleNote } = useContext()
  const goTo = (i: number) => () => {
    slice(i)
    toggleMod("hist", false)()
  }
  React.useEffect(() => {
    if (ref.current) ref.current.scrollTop = Number.MAX_SAFE_INTEGER
    if (!used) {
      handleNote({
        action: "Press a command to undo...",
        expire: 500,
      })()
      used = true
    }
  })
  return (
    <div className="stack history" ref={ref}>
      {commands.map((el, i) => {
        const num = new SplitNum(el)
        if (!num.isNumber)
          return (
            <button key={i} className="command" onClick={goTo(i)}>
              {el}
            </button>
          )
        return <Item key={i} num={num} onClick={goTo(i)} />
      })}
    </div>
  )
}
