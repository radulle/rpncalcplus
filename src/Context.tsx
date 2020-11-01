import * as React from "react"
import { KeyInterface } from "./types"
import useModifiers from "./useModifiers"
import useNote from "./useNote"

type Context = {
  key?: string
  keys: KeyInterface[]
} & ReturnType<typeof useModifiers> &
  ReturnType<typeof useNote>

export const Context = React.createContext<Context | null>(null)

export const useContext = () => {
  const context = React.useContext(Context)
  if (!context) throw new Error("useCalcContext must be used within provider")
  return context
}
