import { createContext, useContext as useReactContext } from "react"
import { KeyInterface } from "../types"
import { useModifiers, useNote } from "../useCalculator"

type ContextType = {
  key?: string
  keys: KeyInterface[]
} & ReturnType<typeof useModifiers> &
  ReturnType<typeof useNote>

export const Context = createContext<ContextType | null>(null)

export const useContext = () => {
  const context = useReactContext(Context)
  if (!context) throw new Error("useCalcContext must be used within provider")
  return context
}
