import * as React from "react"
import { NoteProps } from "./types"
import * as serviceWorker from "./serviceWorker"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

let deferredPrompt: BeforeInstallPromptEvent | undefined

/** registers service worker and handles install and update events */
export default function usePWA(
  handleNote: (note?: NoteProps | undefined) => () => void
) {
  React.useEffect(() => {
    // install action
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

    // install prompt
    function prompt(evt: Event) {
      evt.preventDefault()
      deferredPrompt = evt as BeforeInstallPromptEvent
      handleNote({
        onAction,
        action: `Install RPNcalc+ for easier access.`,
      })()
    }

    // install success
    function onSuccess() {
      handleNote({
        action: "You can now access the app directly from homescreen.",
        expire: 3000,
      })()
    }

    // update prompt
    function onUpdate(registration: ServiceWorkerRegistration) {
      handleNote({
        action: "New version of RPNcalc+ is available. Press to update.",
        expire: 30000,
        onAction: () => {
          registration.waiting?.postMessage({ type: "SKIP_WAITING" })
          window.location.reload()
          handleNote({
            action: "Update successful.",
            expire: 3000,
          })
        },
      })()
    }

    serviceWorker.register({ onSuccess, onUpdate })
    window.addEventListener("beforeinstallprompt", prompt)
    return () => {
      document.removeEventListener("beforeinstallprompt", prompt)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
