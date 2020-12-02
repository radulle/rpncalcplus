import * as React from "react"
import { useCalculator } from "../useCalculator"
import { Context } from "./Context"
import { Display } from "./Display"
import { Frame } from "./Frame"
import { Header } from "./Header"
import { Keyboard } from "./Keyboard"

export function Calculator() {
  const {
    key,
    keys,
    stack,
    commands,
    slice,
    mod,
    toggleMod,
    note,
    handleNote,
  } = useCalculator()

  return (
    <Context.Provider value={{ key, keys, mod, toggleMod, note, handleNote }}>
      <Frame mod={mod}>
        <Header />
        <Display {...{ commands, stack, slice }} />
      </Frame>
      <Keyboard />
    </Context.Provider>
  )
}
