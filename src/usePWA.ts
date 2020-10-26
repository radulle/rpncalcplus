import * as React from "react"
import { NoteProps } from "./types"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

let deferredPrompt: BeforeInstallPromptEvent | undefined

export default function usePWA(
  handleNote: (note?: NoteProps | undefined) => () => void
) {
  React.useEffect(() => {
    function onAction() {
      deferredPrompt?.prompt()
      deferredPrompt?.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          handleNote({
            action: "You can now access the app directly from homescreen.",
            expire: 3000,
          })()
        }
      })
    }

    function beforeinstallprompt(evt: Event) {
      evt.preventDefault()
      deferredPrompt = evt as BeforeInstallPromptEvent
      handleNote({
        onAction,
        action: `Install RPNcalc+ for easier access.`,
      })()
    }

    function appinstalled() {
      handleNote({
        action: "You can now access the app directly from homescreen.",
        expire: 3000,
      })()
    }
    window.addEventListener("beforeinstallprompt", beforeinstallprompt)
    window.addEventListener("appinstalled", appinstalled)
    return () => {
      document.removeEventListener("beforeinstallprompt", beforeinstallprompt)
      document.removeEventListener("appinstalled", appinstalled)
    }
  })
}
