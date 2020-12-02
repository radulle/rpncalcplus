import * as React from "react"
import { CalculatorNumber } from "../CalculatorNumber"

export function Item({
  num,
  onClick,
}: {
  num: CalculatorNumber
  onClick?: () => void
}) {
  const { mantissa, exponent } = num.formatted
  const handleClick = () => {
    if (onClick) return onClick()
    navigator?.clipboard?.writeText?.(
      mantissa + (!!exponent ? "e" + exponent : "")
    )
  }
  return (
    <button className="number" onClick={handleClick}>
      <div className="mantissa">{mantissa}</div>
      <div className="exponent">
        {!!exponent && (
          <>
            <div className="sup">{exponent}</div>
            <div className="sub">×10</div>
          </>
        )}
      </div>
    </button>
  )
}
