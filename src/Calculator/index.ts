export function classNames(arr: Array<string | undefined | boolean>) {
  return arr.filter((e) => !!e).join(" ")
}

export function handleWindowSize() {
  window.resizeTo(333, 555)
  function resize() {
    let vh = window.innerHeight
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  }
  resize()
  window.addEventListener("resize", resize)
}

export { Calculator } from "./Calculator"
export { ErrorBoundary } from "./ErrorBoundary"
