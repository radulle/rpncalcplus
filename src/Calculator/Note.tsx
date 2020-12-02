import { classNames } from "."
import { NoteProps } from "../types"

export function Note({
  handleNote,
  note,
}: {
  note?: NoteProps
  handleNote: (note?: NoteProps) => () => void
}) {
  return !!note ? (
    <div className="info">
      <div>
        <button
          className={classNames(["action", note.onAction && "link"])}
          onClick={note.onAction}
        >
          {note.action}
        </button>
        <button className="close" onClick={handleNote()}>
          x
        </button>
      </div>
    </div>
  ) : null
}
