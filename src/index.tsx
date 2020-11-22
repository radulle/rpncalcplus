import * as React from "react"
import ReactDOM from "react-dom"
import Calculator from "./Calculator"
import ErrorBoundary from "./ErrorBoundary"
import "./scss/index.scss"
import { handleWindowSize } from "./utils"

handleWindowSize()

ReactDOM.render(
  <ErrorBoundary>
    <Calculator />
  </ErrorBoundary>,
  document.getElementById("root")
)
