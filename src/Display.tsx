import * as React from "react"
import Help from "./Help"
import Note from "./Note"
import Stack from "./Stack"
import { NoteProps } from "./types"

export default function Display({
  commands,
  stack,
  help,
  handleNote,
  note,
}: {
  commands: string[]
  stack: string[]
  help: boolean
  note?: NoteProps
  handleNote: (note?: NoteProps) => () => void
}) {
  return (
    <div className="display">
      {!help ? (
        <>
          <Note {...{ note, handleNote }} />
          <Stack {...{ commands, stack }} />
        </>
      ) : (
        <Help />
      )}
    </div>
  )
}
