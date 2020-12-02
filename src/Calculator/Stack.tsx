import * as React from "react"
import { CalculatorNumber } from "../CalculatorNumber"
import { Item } from "./Item"

const marks = [9, 8, 7, 6, 5, 4, "z", "y", "x"]

export function Stack({
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
            <Item key={i} num={new CalculatorNumber(el)} />
          ))}
        </div>
      )}
    </>
  )
}
