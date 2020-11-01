import * as React from "react"
import { Context } from "./Context"
import Display from "./Display"
import Header from "./Header"
import Keyboard from "./Keyboard"
import useCalculator from "./useCalculator"
import useKeyboard from "./useKeyboard"
import useModifiers from "./useModifiers"
import useNote from "./useNote"
import usePWA from "./usePWA"
import { classNames } from "./utils"

export default function Calculator() {
  const { mod, toggleMod } = useModifiers()
  const { note, handleNote } = useNote()
  usePWA(handleNote)
  const { keys, stack, commands, slice } = useCalculator(
    mod,
    toggleMod,
    handleNote
  )
  const key = useKeyboard(keys, mod, toggleMod)

  return (
    <Context.Provider value={{ key, keys, mod, toggleMod, note, handleNote }}>
      <div
        className={classNames([
          "frame",
          (mod.has("help") || mod.has("hist")) && "fullscreen",
        ])}
      >
        <Header />
        <Display {...{ commands, stack, slice }} />
      </div>
      <Keyboard />
    </Context.Provider>
  )
}
