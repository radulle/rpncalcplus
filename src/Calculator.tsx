import * as React from "react"
import Display from "./Display"
import EventsContext from "./EventsContext"
import Header from "./Header"
import Keyboard from "./Keyboard"
import useKeyboard from "./useKeyboard"
import useModifiers from "./useModifiers"
import useNote from "./useNote"
import usePWA from "./usePWA"
import useStack from "./useStack"
import { classNames, writeComands } from "./utils"

export default function Calculator() {
  const { mod, toggleMod } = useModifiers()
  const { note, handleNote } = useNote()
  usePWA(handleNote)
  const { keys, stack, commands } = useStack(mod, toggleMod, handleNote)
  const kbd = useKeyboard(keys, mod, toggleMod)

  React.useEffect(() => writeComands(commands))
  const help = mod.has("help")

  return (
    <EventsContext.Provider value={kbd}>
      <div className={classNames(["frame", !!help && "help"])}>
        <Header {...{ mod, toggleMod, handleNote }} />
        <Display {...{ commands, stack, help, note, handleNote }} />
      </div>
      <Keyboard {...{ mod, keys, kbd }} />
    </EventsContext.Provider>
  )
}
