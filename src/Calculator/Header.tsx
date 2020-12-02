import { classNames } from "."
import { useContext } from "./Context"
import { Key } from "./Key"

export function Header() {
  const { mod, toggleMod } = useContext()
  const handleHist = () => {
    toggleMod("hist")()
    toggleMod("help", false)()
  }
  const handleHelp = () => {
    toggleMod("help")()
    toggleMod("hist", false)()
  }
  return (
    <div className="header">
      <div className="title">RPNcalc+</div>
      <Key
        color="red"
        kbd="F10"
        onClick={toggleMod("deg")}
        className={classNames([!!mod.has("deg") && "active"])}
        title={mod.has("deg") ? "deg" : "rad"}
      />
      <Key
        color="green"
        kbd="F11"
        onClick={handleHist}
        className={classNames([!!mod.has("hist") && "active"])}
        title="hist"
      />
      <Key
        color="blue"
        kbd="F12"
        onClick={handleHelp}
        className={classNames([!!mod.has("help") && "active"])}
        title="help"
      />
    </div>
  )
}
