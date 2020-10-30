import * as React from "react"
import Help from "./Help"
import History from "./History"
import Note from "./Note"
import Stack from "./Stack"
import { NoteProps } from "./types"

export default function Display({
  commands,
  stack,
  mod,
  handleNote,
  note,
}: {
  commands: string[]
  stack: string[]
  mod: Set<string>
  note?: NoteProps
  handleNote: (note?: NoteProps) => () => void
}) {
  return (
    <div className="display">
      {mod.has("help") ? (
        <Help />
      ) : mod.has("hist") ? (
        <History />
      ) : (
        <>
          <Note {...{ note, handleNote }} />
          <Stack {...{ commands, stack }} />
        </>
      )}
    </div>
  )
}
