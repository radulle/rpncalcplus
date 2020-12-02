import { useContext } from "./Context"
import { Help } from "./Help"
import { History } from "./History"
import { Note } from "./Note"
import { Stack } from "./Stack"

export function Display({
  commands,
  stack,
  slice,
}: {
  commands: string[]
  stack: string[]
  slice: (i: number) => void
}) {
  const { mod, handleNote, note } = useContext()
  return (
    <div className="display">
      <Note {...{ note, handleNote }} />
      {mod.has("help") ? (
        <Help />
      ) : mod.has("hist") ? (
        <History commands={commands} slice={slice} />
      ) : (
        <Stack {...{ commands, stack }} />
      )}
    </div>
  )
}
