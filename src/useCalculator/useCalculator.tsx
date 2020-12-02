import * as React from "react"
import { CalculatorNumber } from "../CalculatorNumber"
import { KeyInterface } from "../types"
import { calculator } from "./calculator"
import { useKeyboard } from "./useKeyboard"
import { useModifiers } from "./useModifiers"
import { useNote } from "./useNote"
import { usePWA } from "./usePWA"

export function useCalculator() {
  const [commands, setCommands] = React.useState<string[]>(readCommands)
  const { mod, toggleMod } = useModifiers()
  const { note, handleNote } = useNote()
  usePWA(handleNote)

  React.useEffect(() => writeCommands(commands))

  const slice = (i: number) =>
    setCommands((prev) => prev.slice(undefined, i + 1))

  const handleOperation = (e: string, minStack: number) => () => {
    if (!!minStack && calculator(commands).length < minStack) {
      handleNote({
        action: `This operation requires at least ${minStack} argument${
          minStack > 1 ? "s" : ""
        }`,
        expire: 3000,
      })()
      return
    }
    setCommands((prev) => {
      return [...prev, e]
    })
  }

  const handleNumeral = (e: number | string) => () => {
    setCommands((prev) => {
      const length = prev.length
      if (!length) return [e.toString()]
      const current = new CalculatorNumber(prev[length - 1])
      if (!current.isNumber) return [...prev, e.toString()]
      if (e === 0 && current.mantissa === "0") return prev
      if (current.mantissa === "0") return [...prev.slice(0, -1), e.toString()]
      if (current.exponent !== undefined) {
        return [...prev.slice(0, -1), current.exponentPush(e)]
      }
      if (current.mantissaNum.replace(".", "").length < 13)
        return [...prev.slice(0, -1), current.mantissa + e]
      return prev
    })
  }

  const handleClearLastDigit = () => {
    setCommands((prev) => {
      const length = prev.length
      if (!length) return prev
      const current = prev[length - 1]
      if (isNaN(parseFloat(current))) {
        return [...prev, "drop", "0"]
      }
      if (current.length === 1) return [...prev.slice(0, -1), "0"]
      if (current.slice(-2, -1) === "e")
        return [...prev.slice(0, -1), current.slice(0, -2)]
      return [...prev.slice(0, -1), current.slice(0, -1)]
    })
  }

  const handleComma = () =>
    setCommands((prev) => {
      const length = prev.length
      if (!length) return prev
      const current = prev[length - 1]
      if (isNaN(parseFloat(current))) return [...prev, "0."]
      if (current.indexOf(".") === -1)
        return [...prev.slice(0, -1), current + "."]
      return prev
    })

  const handleExponent = () =>
    setCommands((prev) => {
      console.info()
      const length = prev.length
      if (!length) return prev
      const current = prev[length - 1]
      if (isNaN(parseFloat(current))) return [...prev, "1e0"]
      if (parseFloat(current) === 0) return [...prev.slice(0, -1), "1e0"]
      if (current.indexOf("e") === -1)
        return [...prev.slice(0, -1), current + "e0"]
      return prev
    })

  const handlePlusMinus = () =>
    setCommands((prev) => {
      const length = prev.length
      if (!length) return prev
      const current = new CalculatorNumber(prev[length - 1])
      if (!current.isNumber) return [...prev, "neg"]
      return [...prev.slice(0, -1), current.toggleSign()]
    })

  const handleClearScreen = () => setCommands(["0"])

  const handleSto = () => localStorage.setItem("mem", stack[stack.length - 1])

  const handleRcl = () => {
    const mem = localStorage.getItem("mem")
    if (mem !== null && mem !== undefined && !isNaN(parseFloat(mem)))
      setCommands((prev) => [...prev, mem])
  }

  const keys: KeyInterface[] = [
    // modifiers
    {
      kbd: "Shift",
      title: "shft",
      color: "teal",
      onClick: () => {
        if (mod.has("Shift")) {
          toggleMod("Shift", false)()
          toggleMod("Control", false)()
          return
        }
        toggleMod("Shift", true)()
      },
      main: true,
      secondary: true,
      modifier: true,
    },
    {
      kbd: "Control",
      title: "inv",
      color: "teal",
      onClick: toggleMod("Control"),
      main: false,
      secondary: true,
      modifier: true,
    },
    // main
    {
      kbd: "ArrowLeft",
      title: "over",
      color: "orange",
      onClick: handleOperation("over", 3),
      main: true,
    },
    {
      kbd: "ArrowRight",
      title: "swap",
      color: "orange",
      onClick: handleOperation("swap", 2),
      main: true,
    },
    {
      kbd: "ArrowUp",
      title: "sto",
      color: "orange",
      onClick: handleSto,
      main: true,
    },
    {
      kbd: "Delete",
      title: "drop",
      color: "red",
      onClick: handleOperation("drop", 1),
      main: true,
    },
    { kbd: "7", title: "7", onClick: handleNumeral(7), main: true },
    { kbd: "8", title: "8", onClick: handleNumeral(8), main: true },
    { kbd: "9", title: "9", onClick: handleNumeral(9), main: true },
    {
      kbd: "e",
      title: "exp",
      color: "yellow",
      onClick: handleExponent,
      main: true,
    },
    {
      kbd: "Backspace",
      title: "C",
      color: "red",
      onClick: handleClearLastDigit,
      main: true,
    },
    { kbd: "4", title: "4", onClick: handleNumeral(4), main: true },
    { kbd: "5", title: "5", onClick: handleNumeral(5), main: true },
    { kbd: "6", title: "6", onClick: handleNumeral(6), main: true },
    {
      kbd: "+",
      title: "+",
      color: "navy",
      onClick: handleOperation("+", 2),
      main: true,
    },
    {
      kbd: "-",
      title: "-",
      color: "navy",
      onClick: handleOperation("-", 2),
      main: true,
    },
    { kbd: "1", title: "1", onClick: handleNumeral(1), main: true },
    { kbd: "2", title: "2", onClick: handleNumeral(2), main: true },
    { kbd: "3", title: "3", onClick: handleNumeral(3), main: true },
    {
      kbd: "*",
      title: "×",
      color: "navy",
      onClick: handleOperation("*", 2),
      main: true,
    },
    {
      kbd: "/",
      title: "/",
      color: "navy",
      className: "small",
      onClick: handleOperation("/", 2),
      main: true,
    },
    { kbd: "n", title: "±", onClick: handlePlusMinus, main: true },
    { kbd: "0", title: "0", onClick: handleNumeral(0), main: true },
    { kbd: ".", title: ".", onClick: handleComma, main: true },
    // secondary
    {
      kbd: "M",
      title: "mod",
      color: "navy",
      onClick: handleOperation("mod", 2),
      main: false,
      secondary: true,
    },
    {
      kbd: "ArrowDown",
      title: "rcl",
      color: "orange",
      onClick: handleRcl,
      main: false,
      secondary: true,
    },
    {
      kbd: "~",
      title: "cls",
      color: "red",
      onClick: handleClearScreen,
      secondary: true,
    },
    {
      kbd: "S",
      title: "sin",
      onClick: handleOperation((!!mod.has("deg") ? "d" : "") + "sin", 1),
      main: false,
      secondary: true,
      inverse: false,
    },
    {
      kbd: "s",
      title: "asin",
      onClick: handleOperation((!!mod.has("deg") ? "d" : "") + "asin", 1),
      main: false,
      secondary: true,
      inverse: true,
    },
    {
      kbd: "C",
      title: "cos",
      onClick: handleOperation((!!mod.has("deg") ? "d" : "") + "cos", 1),
      main: false,
      secondary: true,
      inverse: false,
    },
    {
      kbd: "c",
      title: "acos",
      onClick: handleOperation((!!mod.has("deg") ? "d" : "") + "acos", 1),
      main: false,
      secondary: true,
      inverse: true,
    },
    {
      kbd: "T",
      title: "tan",
      onClick: handleOperation((!!mod.has("deg") ? "d" : "") + "tan", 1),
      main: false,
      secondary: true,
      inverse: false,
    },
    {
      kbd: "t",
      title: "atan",
      onClick: handleOperation((!!mod.has("deg") ? "d" : "") + "atan", 1),
      main: false,
      secondary: true,
      inverse: true,
    },
    {
      kbd: "I",
      title: "1/x",
      color: "navy",
      onClick: handleOperation("inv", 1),
      main: false,
      secondary: true,
    },
    {
      kbd: "A",
      title: "|x|",
      color: "navy",
      onClick: handleOperation("abs", 1),
      main: false,
      secondary: true,
    },
    {
      kbd: "X",
      title: "sinh",
      onClick: handleOperation((!!mod.has("deg") ? "d" : "") + "sinh", 1),
      main: false,
      secondary: true,
      inverse: false,
    },
    {
      kbd: "x",
      title: "asnh",
      onClick: handleOperation((!!mod.has("deg") ? "d" : "") + "asinh", 1),
      main: false,
      secondary: true,
      inverse: true,
    },
    {
      kbd: "D",
      title: "cosh",
      onClick: handleOperation((!!mod.has("deg") ? "d" : "") + "cosh", 1),
      main: false,
      secondary: true,
      inverse: false,
    },
    {
      kbd: "d",
      title: "acsh",
      onClick: handleOperation((!!mod.has("deg") ? "d" : "") + "acosh", 1),
      main: false,
      secondary: true,
      inverse: true,
    },
    {
      kbd: "G",
      title: "tanh",
      onClick: handleOperation((!!mod.has("deg") ? "d" : "") + "tanh", 1),
      main: false,
      secondary: true,
      inverse: false,
    },
    {
      kbd: "g",
      title: "atnh",
      onClick: handleOperation((!!mod.has("deg") ? "d" : "") + "atnh", 1),
      main: false,
      secondary: true,
      inverse: true,
    },
    {
      kbd: "P",
      title: "π",
      color: "navy",
      onClick: handleOperation("pi", 0),
      main: false,
      secondary: true,
    },
    {
      kbd: "E",
      title: "e",
      color: "navy",
      onClick: handleOperation("e", 0),
      main: false,
      secondary: true,
    },

    {
      kbd: "F2",
      title: (
        <>
          x<sup>2</sup>
        </>
      ),
      onClick: handleOperation("x^2", 1),
      main: false,
      secondary: true,
      inverse: false,
    },
    {
      kbd: "f2",
      title: (
        <>
          <sup>2</sup>√x
        </>
      ),
      onClick: handleOperation("sqrt", 1),
      main: false,
      secondary: true,
      inverse: true,
    },
    {
      kbd: "F3",
      title: (
        <>
          x<sup>3</sup>
        </>
      ),
      onClick: handleOperation("x^3", 1),
      main: false,
      secondary: true,
      inverse: false,
    },
    {
      kbd: "f3",
      title: (
        <>
          <sup>3</sup>√x
        </>
      ),
      onClick: handleOperation("cbrt", 1),
      main: false,
      secondary: true,
      inverse: true,
    },
    {
      kbd: "F4",
      title: (
        <>
          y<sup>x</sup>
        </>
      ),
      onClick: handleOperation("y^x", 2),
      main: false,
      secondary: true,
      inverse: false,
    },
    {
      kbd: "f4",
      title: (
        <>
          <sup>x</sup>√y
        </>
      ),
      onClick: handleOperation("xrt", 2),
      main: false,
      secondary: true,
      inverse: true,
    },
    {
      kbd: "!",
      title: "n!",
      color: "navy",
      onClick: handleOperation("n!", 1),
      main: false,
      secondary: true,
    },
    {
      kbd: ">",
      title: ">deg",
      color: "navy",
      onClick: handleOperation(">deg", 1),
      main: false,
      secondary: true,
      inverse: false,
    },
    {
      kbd: "<",
      title: ">rad",
      color: "navy",
      onClick: handleOperation(">rad", 1),
      main: false,
      secondary: true,
      inverse: true,
    },
    {
      kbd: "f5",
      title: (
        <>
          e<sup>x</sup>
        </>
      ),
      onClick: handleOperation("e^x", 1),
      main: false,
      secondary: true,
      inverse: true,
    },
    {
      kbd: "F5",
      title: "ln",
      onClick: handleOperation("ln", 1),
      main: false,
      secondary: true,
      inverse: false,
    },
    {
      kbd: "f6",
      title: (
        <>
          10<sup>x</sup>
        </>
      ),
      onClick: handleOperation("ten^x", 1),
      main: false,
      secondary: true,
      inverse: true,
    },
    {
      kbd: "F6",
      title: "log",
      onClick: handleOperation("log", 1),
      main: false,
      secondary: true,
      inverse: false,
    },
    {
      kbd: "F7",
      title: (
        <>
          lg<sub>x</sub>y
        </>
      ),
      onClick: handleOperation("logxy", 1),
      main: false,
      secondary: true,
    },
    // enter
    {
      kbd: "Enter",
      title: "ENTER",
      color: "green",
      className: "enter",
      onClick: handleOperation("enter", 1),
      main: true,
      secondary: true,
    },
  ]

  const stack = calculator(commands)

  const key = useKeyboard(keys, mod, toggleMod)

  return {
    key,
    keys,
    stack,
    commands,
    slice,
    mod,
    toggleMod,
    note,
    handleNote,
  }
}

function readCommands() {
  const storage = localStorage.getItem("commands")
  if (storage !== null) {
    return JSON.parse(storage)
  }
  return ["0"]
}

function writeCommands(commands: string[]) {
  localStorage.setItem("commands", JSON.stringify(commands))
}
