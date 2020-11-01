import * as React from "react"
import SplitNum from "./SplitNum"

export default function Item({ num, onClick }: { num: SplitNum, onClick?: () => void }) {
  const { mantisa, exponent } = num.formatted
  const handleClick = () => {
    if (onClick) return onClick()
    navigator?.clipboard?.writeText?.(
      mantisa + (!!exponent ? "e" + exponent : "")
    )
  }
  return (
    <button className="number" onClick={handleClick}>
      <div className="mantisa">{mantisa}</div>
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
