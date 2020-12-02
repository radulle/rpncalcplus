import * as React from "react"
import { NoteProps } from "../types"

let timeout: ReturnType<typeof setTimeout>

/** Handles notes */
export function useNote() {
  const [note, setNote] = React.useState<NoteProps | undefined>()

  const handleNote = (note?: NoteProps) => () => {
    clearTimeout(timeout)
    setNote(note)
    if (!!note?.expire) {
      timeout = setTimeout(() => setNote(undefined), note.expire)
    }
  }

  return { note, handleNote }
}
