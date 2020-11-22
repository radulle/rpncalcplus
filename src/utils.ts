export function classNames(arr: Array<string | undefined | boolean>) {
  return arr.filter((e) => !!e).join(" ")
}

export function readCommands() {
  const storage = localStorage.getItem("commands")
  if (storage !== null) {
    return JSON.parse(storage)
  }
  return ["0"]
}

export function writeComands(commands: string[]) {
  localStorage.setItem("commands", JSON.stringify(commands))
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
