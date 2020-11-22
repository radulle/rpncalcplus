import * as React from "react"

export default function Help() {
  return (
    <div className="help">
      <p>
        RPNcalc is a small PWA inspired by{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.hpmuseum.org"
        >
          HP engineering calculators
        </a>{" "}
        and{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="http://www.simplemachine.co/game/calculator-the-game"
        >
          Calculator The Game
        </a>{" "}
        by Simple Machine.
      </p>
      <p>
        RPN stands for Reverse Polish Notation which means that you first enter
        operands which are followed by operator (e.g. 6x7 would be 6 7 x). It
        does not need any parentheses which makes it supper efficient and fun to
        use :D
      </p>
      <p>
        It is Free and Open Source. Code is available on{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/radulle/rpncalcplus"
        >
          GitHub
        </a>{" "}
        where you are free to report issues, request features and contribute.
      </p>
      <p>Tips:</p>
      <p>Try keyboard shortcuts by holding ALT, CTRL, SHIFT or F1.</p>
      <p>Tap number on display to copy value to clipboard.</p>
    </div>
  )
}
