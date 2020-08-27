const separator = (1.1).toLocaleString().substring(1, 2);

export default class SplitNum {
  private string: string;

  constructor(string: string) {
    this.string = string;
  }

  private get split() {
    return this.string.split("e");
  }

  private get length() {
    return this.split.length;
  }

  private getSign(number: string) {
    if (number?.[0] === "-") return "-";
    return "";
  }

  private getNum(number: string) {
    if (number === undefined) return "";
    if (number?.[0] === "-" || number?.[0] === "+") return number.slice(1);
    return number;
  }

  get mantisa() {
    return this.split[0];
  }

  get mantisaSign() {
    return this.getSign(this.mantisa);
  }

  get mantisaNum() {
    return this.getNum(this.mantisa);
  }

  get exponent() {
    return this.split[1];
  }

  get exponentSign() {
    return this.getSign(this.exponent);
  }

  get exponentNum() {
    return this.getNum(this.exponent);
  }

  exponentPush(e: string | number, limit: number = 2) {
    const a = [
      this.mantisa,
      this.exponentSign + (this.exponentNum + e).slice(-limit)
    ].join("e");
    return a;
  }

  get isNumber() {
    return !isNaN(parseFloat(this.string));
  }

  toggleSign() {
    if (this.exponent !== undefined) {
      this.constructor(
        (
          this.mantisa +
          "e" +
          (this.exponentSign === "-" ? "" : "-") +
          this.exponentNum
        ).toString()
      );
      return this.string;
    }
    this.constructor(
      ((this.mantisaSign === "-" ? "" : "-") + this.mantisaNum).toString()
    );
    return this.string;
  }

  /** formats number (mantisa: 13 digits, exponent 2 digits) */
  get formatted() {
    const mantisaSign =
      this.mantisaSign[0] !== undefined ? this.mantisaSign[0] : "";
    const mantisaNum = this.mantisaNum;

    // infinity
    if (
      this.string.indexOf("Infinity") !== -1 ||
      parseFloat(this.exponent) > 99
    ) {
      return { mantisa: mantisaSign + "infinity" };
    }

    // 0
    if (parseFloat(this.exponent) < -99) {
      return { mantisa: 0 };
    }

    // integer larger or eqeual to 1e14
    if (mantisaNum.indexOf(".") === -1 && mantisaNum.length > 13) {
      const mantisa = mantisaNum[0] + separator + mantisaNum.slice(1);
      return {
        mantisa:
          mantisaSign +
          parseFloat(mantisa).toLocaleString(undefined, {
            maximumFractionDigits: 12
          }),
        exponent: mantisaNum.length - 1
      };
    }

    // integer less than 1e14
    if (mantisaNum.indexOf(".") === -1 && mantisaNum.length < 14) {
      return {
        mantisa: parseInt(this.mantisa, 10).toLocaleString(),
        exponent: this.exponentSign + this.exponentNum
      };
    }

    // decimal
    const arr = (Math.round(parseFloat(mantisaNum) * 1e12) / 1e12)
      .toString()
      .split(".");
    const integer = arr[0];
    arr[0] = parseInt(integer, 10).toLocaleString();

    return {
      mantisa:
        mantisaSign +
        arr.join(separator).slice(0, 14 + arr[0].length - integer.length),
      exponent: this.exponentSign + this.exponentNum
    };
  }
}
