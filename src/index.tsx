import * as React from "react"
import ReactDOM from "react-dom"
import { Calculator, ErrorBoundary, handleWindowSize } from "./Calculator"
import "./scss/index.scss"

handleWindowSize()

ReactDOM.render(
  <ErrorBoundary>
    <Calculator />
  </ErrorBoundary>,
  document.getElementById("root")
)
