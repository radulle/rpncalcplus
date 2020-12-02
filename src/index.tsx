import { StrictMode } from "react"
import ReactDOM from "react-dom"
import { Calculator, ErrorBoundary, handleWindowSize } from "./Calculator"
import "./scss/index.scss"

handleWindowSize()

ReactDOM.render(
  <StrictMode>
    <ErrorBoundary>
      <Calculator />
    </ErrorBoundary>
  </StrictMode>,
  document.getElementById("root")
)
