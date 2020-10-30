export function classNames(arr: Array<string | undefined | boolean>) {
  return arr.filter((e) => !!e).join(" ")
}

export function factorial(n: number): number {
  return n ? n * factorial(n - 1) : 1
}

const rad2deg = (rad: number) => (rad * 180) / Math.PI
const deg2rad = (deg: number) => (deg * Math.PI) / 180

export function operator(stack: Array<string>, o: string) {
  const length = stack.length
  const last = (i: number) => parseFloat(stack[length - i])
  const toStr = (num: number) => num.toString()
  switch (o) {
    case "drop":
      return stack.slice(0, -1)
    case "swap":
      return [...stack.slice(0, -2), stack[length - 1], stack[length - 2]]
    case "over":
      return [
        ...stack.slice(0, -3),
        stack[length - 2],
        stack[length - 1],
        stack[length - 3],
      ]
    case "+":
      return [...stack.slice(0, -2), toStr(last(2) + last(1))]
    case "-":
      return [...stack.slice(0, -2), toStr(last(2) - last(1))]
    case "*":
      return [...stack.slice(0, -2), toStr(last(2) * last(1))]
    case "/":
      return [...stack.slice(0, -2), toStr(last(2) / last(1))]
    case "mod":
      return [...stack.slice(0, -2), toStr(last(2) % last(1))]
    case "inv":
      return [...stack.slice(0, -1), toStr(1 / last(1))]
    case "neg":
      return [...stack.slice(0, -1), toStr(-last(1))]
    case "pi":
      return [...stack, Math.PI.toString()]
    case "sin":
      return [...stack.slice(0, -1), toStr(Math.sin(last(1)))]
    case "asin":
      return [...stack.slice(0, -1), toStr(Math.asin(last(1)))]
    case "cos":
      return [...stack.slice(0, -1), toStr(Math.cos(last(1)))]
    case "acos":
      return [...stack.slice(0, -1), toStr(Math.acos(last(1)))]
    case "tan":
      return [...stack.slice(0, -1), toStr(Math.tan(last(1)))]
    case "atan":
      return [...stack.slice(0, -1), toStr(Math.atan(last(1)))]
    case "sinh":
      return [...stack.slice(0, -1), toStr(Math.sinh(last(1)))]
    case "asinh":
      return [...stack.slice(0, -1), toStr(Math.asinh(last(1)))]
    case "cosh":
      return [...stack.slice(0, -1), toStr(Math.cosh(last(1)))]
    case "acosh":
      return [...stack.slice(0, -1), toStr(Math.acosh(last(1)))]
    case "tanh":
      return [...stack.slice(0, -1), toStr(Math.tanh(last(1)))]
    case "atanh":
      return [...stack.slice(0, -1), toStr(Math.atanh(last(1)))]
    case "dsin":
      return [...stack.slice(0, -1), toStr(Math.sin(deg2rad(last(1))))]
    case "dasin":
      return [...stack.slice(0, -1), toStr(rad2deg(Math.asin(last(1))))]
    case "dcos":
      return [...stack.slice(0, -1), toStr(Math.cos(deg2rad(last(1))))]
    case "dacos":
      return [...stack.slice(0, -1), toStr(rad2deg(Math.acos(last(1))))]
    case "dtan":
      return [...stack.slice(0, -1), toStr(Math.tan(deg2rad(last(1))))]
    case "datan":
      return [...stack.slice(0, -1), toStr(rad2deg(Math.atan(last(1))))]
    case "dsinh":
      return [...stack.slice(0, -1), toStr(Math.sinh(deg2rad(last(1))))]
    case "dasinh":
      return [...stack.slice(0, -1), toStr(rad2deg(Math.asinh(last(1))))]
    case "dcosh":
      return [...stack.slice(0, -1), toStr(Math.cosh(deg2rad(last(1))))]
    case "dacosh":
      return [...stack.slice(0, -1), toStr(rad2deg(Math.acosh(last(1))))]
    case "dtanh":
      return [...stack.slice(0, -1), toStr(Math.tanh(deg2rad(last(1))))]
    case "datanh":
      return [...stack.slice(0, -1), toStr(rad2deg(Math.atanh(last(1))))]
    case "e":
      return [...stack, Math.E.toString()]
    case "x^2":
      return [...stack.slice(0, -1), toStr(Math.pow(last(1), 2))]
    case "x^3":
      return [...stack.slice(0, -1), toStr(Math.pow(last(1), 3))]
    case "y^x":
      return [...stack.slice(0, -2), toStr(Math.pow(last(2), last(1)))]
    case "sqrt":
      return [...stack.slice(0, -1), toStr(Math.sqrt(last(1)))]
    case "cbrt":
      return [...stack.slice(0, -1), toStr(Math.cbrt(last(1)))]
    case "xrt":
      return [...stack.slice(0, -2), toStr(Math.pow(last(2), 1 / last(1)))]
    case "ln":
      return [...stack.slice(0, -1), toStr(Math.log(last(1)))]
    case "e^x":
      return [...stack.slice(0, -1), toStr(Math.pow(Math.E, last(1)))]
    case "log":
      return [...stack.slice(0, -1), toStr(Math.log10(last(1)))]
    case "10^x":
      return [...stack.slice(0, -1), toStr(Math.pow(10, last(1)))]
    case "logxy":
      return [
        ...stack.slice(0, -2),
        toStr(Math.log10(last(2)) / Math.log10(last(1))),
      ]
    case "abs":
      return [...stack.slice(0, -1), toStr(Math.abs(last(1)))]
    case "n!":
      return [
        ...stack.slice(0, -1),
        last(1) % 1 === 0 && last(1) >= 0 ? toStr(factorial(last(1))) : "NaN",
      ]
    case ">rad":
      return [...stack.slice(0, -1), toStr(deg2rad(last(1)))]
    case ">deg":
      return [...stack.slice(0, -1), toStr(rad2deg(last(1)))]
    case "enter":
      return [...stack, stack[length - 1]]
    default:
      return []
  }
}

export function calc(stack: Array<any>): Array<string> {
  return stack.reduce((acc, cur, i, arr) => {
    if (!isNaN(parseFloat(cur)) || cur === ".") {
      if (arr[i - 1] === "enter") return [...acc.slice(0, -1), cur]
      return [...acc, cur]
    }
    return operator(acc, cur)
  }, [])
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
