import * as React from "react"

/** Handles modifiers like shift, ctrl, alt, help, history, deg, etc. */
export function useModifiers() {
  const [mod, setMod] = React.useState<Set<string>>(new Set())

  const toggleMod = (key: string, state?: boolean) => () => {
    return setMod((prev) => {
      const curr = new Set(prev)
      if ((curr.has(key) && state !== true) || state === false) {
        curr.delete(key)
        return curr
      }
      curr.add(key)
      return curr
    })
  }

  return { mod, toggleMod }
}
