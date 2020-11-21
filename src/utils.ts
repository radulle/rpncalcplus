import { Decimal } from "decimal.js"

const PI = Decimal.acos(-1)
const E = new Decimal(1).exp()
const ZERO = new Decimal(0)
const ONE = new Decimal(1)

export function classNames(arr: Array<string | undefined | boolean>) {
  return arr.filter((e) => !!e).join(" ")
}

export function factorial(n: Decimal): Decimal {
  return n.equals(ZERO) ? ONE : n.mul(factorial(n.sub(1)))
}

const rad2deg = (rad: Decimal) => rad.mul(180).div(PI)
const deg2rad = (deg: Decimal) => deg.mul(PI).div(180)

export function operator(stack: Array<string>, o: string) {
  const length = stack.length
  const last = (i: number) => new Decimal(stack[length - i])
  const toStr = (num: Decimal) => num.toString()
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
      return [...stack.slice(0, -2), toStr(last(2).add(last(1)))]
    case "-":
      return [...stack.slice(0, -2), toStr(last(2).sub(last(1)))]
    case "*":
      return [...stack.slice(0, -2), toStr(last(2).mul(last(1)))]
    case "/":
      return [...stack.slice(0, -2), toStr(last(2).div(last(1)))]
    case "mod":
      return [...stack.slice(0, -2), toStr(last(2).mod(last(1)))]
    case "inv":
      return [...stack.slice(0, -1), toStr(ONE.div(last(1)))]
    case "neg":
      return [...stack.slice(0, -1), toStr(last(1).neg())]
    case "pi":
      return [...stack, toStr(PI)]
    case "sin":
      return [...stack.slice(0, -1), toStr(Decimal.sin(last(1)))]
    case "asin":
      return [...stack.slice(0, -1), toStr(Decimal.asin(last(1)))]
    case "cos":
      return [...stack.slice(0, -1), toStr(Decimal.cos(last(1)))]
    case "acos":
      return [...stack.slice(0, -1), toStr(Decimal.acos(last(1)))]
    case "tan":
      return [...stack.slice(0, -1), toStr(Decimal.tan(last(1)))]
    case "atan":
      return [...stack.slice(0, -1), toStr(Decimal.atan(last(1)))]
    case "sinh":
      return [...stack.slice(0, -1), toStr(Decimal.sinh(last(1)))]
    case "asinh":
      return [...stack.slice(0, -1), toStr(Decimal.asinh(last(1)))]
    case "cosh":
      return [...stack.slice(0, -1), toStr(Decimal.cosh(last(1)))]
    case "acosh":
      return [...stack.slice(0, -1), toStr(Decimal.acosh(last(1)))]
    case "tanh":
      return [...stack.slice(0, -1), toStr(Decimal.tanh(last(1)))]
    case "atanh":
      return [...stack.slice(0, -1), toStr(Decimal.atanh(last(1)))]
    case "dsin":
      return [...stack.slice(0, -1), toStr(Decimal.sin(deg2rad(last(1))))]
    case "dasin":
      return [...stack.slice(0, -1), toStr(rad2deg(Decimal.asin(last(1))))]
    case "dcos":
      return [...stack.slice(0, -1), toStr(Decimal.cos(deg2rad(last(1))))]
    case "dacos":
      return [...stack.slice(0, -1), toStr(rad2deg(Decimal.acos(last(1))))]
    case "dtan":
      return [...stack.slice(0, -1), toStr(Decimal.tan(deg2rad(last(1))))]
    case "datan":
      return [...stack.slice(0, -1), toStr(rad2deg(Decimal.atan(last(1))))]
    case "dsinh":
      return [...stack.slice(0, -1), toStr(Decimal.sinh(deg2rad(last(1))))]
    case "dasinh":
      return [...stack.slice(0, -1), toStr(rad2deg(Decimal.asinh(last(1))))]
    case "dcosh":
      return [...stack.slice(0, -1), toStr(Decimal.cosh(deg2rad(last(1))))]
    case "dacosh":
      return [...stack.slice(0, -1), toStr(rad2deg(Decimal.acosh(last(1))))]
    case "dtanh":
      return [...stack.slice(0, -1), toStr(Decimal.tanh(deg2rad(last(1))))]
    case "datanh":
      return [...stack.slice(0, -1), toStr(rad2deg(Decimal.atanh(last(1))))]
    case "e":
      return [...stack, toStr(E)]
    case "x^2":
      return [...stack.slice(0, -1), toStr(Decimal.pow(last(1), 2))]
    case "x^3":
      return [...stack.slice(0, -1), toStr(Decimal.pow(last(1), 3))]
    case "y^x":
      return [...stack.slice(0, -2), toStr(Decimal.pow(last(2), last(1)))]
    case "sqrt":
      return [...stack.slice(0, -1), toStr(Decimal.sqrt(last(1)))]
    case "cbrt":
      return [...stack.slice(0, -1), toStr(Decimal.cbrt(last(1)))]
    case "xrt":
      return [...stack.slice(0, -2), toStr(Decimal.pow(last(2), ONE.div(last(1))))]
    case "ln":
      return [...stack.slice(0, -1), toStr(Decimal.log(last(1)))]
    case "e^x":
      return [...stack.slice(0, -1), toStr(Decimal.pow(E, last(1)))]
    case "log":
      return [...stack.slice(0, -1), toStr(Decimal.log10(last(1)))]
    case "10^x":
      return [...stack.slice(0, -1), toStr(Decimal.pow(10, last(1)))]
    case "logxy":
      return [
        ...stack.slice(0, -2),
        toStr(Decimal.log10(last(2)).div(Decimal.log10(last(1)))),
      ]
    case "abs":
      return [...stack.slice(0, -1), toStr(Decimal.abs(last(1)))]
    case "n!":
      return [
        ...stack.slice(0, -1),
        last(1).mod(1).equals(ZERO) && last(1).greaterThanOrEqualTo(ZERO) ? toStr(factorial(last(1))) : "NaN",
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

export function calc(commands: string[]): string[] {
  return commands.reduce((acc: string[], cur, i, arr) => {
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
