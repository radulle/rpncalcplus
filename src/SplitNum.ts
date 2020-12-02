const separator = (1.1).toLocaleString().substring(1, 2)

export default class SplitNum {
  private string: string

  constructor(string: string) {
    this.string = string
  }

  private get split() {
    return this.string.split("e")
  }

  private get length() {
    return this.split.length
  }

  private getSign(number: string) {
    if (number?.[0] === "-") return "-"
    return ""
  }

  private getNum(number: string) {
    if (number === undefined) return ""
    if (number?.[0] === "-" || number?.[0] === "+") return number.slice(1)
    return number
  }

  get mantissa() {
    return this.split[0]
  }

  get mantissaSign() {
    return this.getSign(this.mantissa)
  }

  get mantissaNum() {
    return this.getNum(this.mantissa)
  }

  get exponent() {
    return this.split[1]
  }

  get exponentSign() {
    return this.getSign(this.exponent)
  }

  get exponentNum() {
    return this.getNum(this.exponent)
  }

  exponentPush(e: string | number, limit: number = 2) {
    const a = [
      this.mantissa,
      this.exponentSign + (this.exponentNum + e).slice(-limit),
    ].join("e")
    return a
  }

  get isNumber() {
    return !isNaN(parseFloat(this.string))
  }

  private revSign = (sign: string) => (sign === "-" ? "" : "-")

  toggleSign() {
    if (this.exponent !== undefined) {
      this.string =
        this.mantissa + "e" + this.revSign(this.exponentSign) + this.exponentNum
      return this.string
    }
    this.string = this.revSign(this.mantissaSign) + this.mantissaNum
    return this.string
  }

  /** formats number (mantissa: 13 digits, exponent 2 digits) */
  get formatted() {
    const mantissaSign =
      this.mantissaSign[0] !== undefined ? this.mantissaSign[0] : ""
    const mantissaNum = this.mantissaNum

    // infinity
    if (
      this.string.indexOf("Infinity") !== -1 ||
      parseFloat(this.exponent) > 99
    ) {
      return { mantissa: mantissaSign + "infinity" }
    }

    // 0
    if (parseFloat(this.exponent) < -99) {
      return { mantissa: 0 }
    }

    // integer larger or equal to 1e14
    if (mantissaNum.indexOf(".") === -1 && mantissaNum.length > 13) {
      const num = mantissaNum[0] + separator + mantissaNum.slice(1)
      return {
        mantissa:
          mantissaSign +
          parseFloat(num).toLocaleString(undefined, {
            maximumFractionDigits: 12,
          }),
        exponent: mantissaNum.length - 1,
      }
    }

    // integer less than 1e14
    if (mantissaNum.indexOf(".") === -1 && mantissaNum.length < 14) {
      return {
        mantissa: parseInt(this.mantissa, 10).toLocaleString(),
        exponent: this.exponentSign + this.exponentNum,
      }
    }

    // decimal
    const [int, dec] = mantissaNum.split(".")

    const mantissa =
      mantissaSign +
      parseFloat(mantissaNum).toLocaleString(undefined, {
        maximumFractionDigits: int.length < 15 ? 15 - int.length : 0,
      }) +
      (!dec || parseInt(dec, 10) === 0
        ? separator + dec
        : dec.match(/[0]+$/)?.[0] || "")

    return {
      mantissa,
      exponent: this.exponentSign + this.exponentNum,
    }
  }
}
