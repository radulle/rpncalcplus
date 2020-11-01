import * as React from "react"
import Item from "./Item"
import SplitNum from "./SplitNum"

const marks = [9, 8, 7, 6, 5, 4, "z", "y", "x"]

export default function Stack({
  commands,
  stack,
}: {
  commands: Array<string>
  stack: Array<string>
}) {
  return (
    <>
      <div className="marks">
        {marks.map((e) => (
          <button key={e}>{e}</button>
        ))}
      </div>
      {!!commands.length && (
        <div className="stack">
          {stack.map((el, i) => (
            <Item key={i} num={new SplitNum(el)} />
          ))}
        </div>
      )}
    </>
  )
}
