import * as React from "react"

function logError(error: Error, info: React.ErrorInfo) {
  console.info(error, info)
}
type ErrorState = { hasError: boolean; error?: Error }

export default class ErrorBoundary extends React.Component {
  state: ErrorState = { hasError: false }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    logError(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorboundary">
          <p>
            Something's a bit off please <a href="/">try again</a>.
          </p>
          <p>
            If the issue persists please report it at{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/radulle/rpncalcplus/issues"
            >
              GitHub
            </a>
            .
          </p>
          <pre>{JSON.stringify(this.state.error?.message)}</pre>
          <pre>{JSON.stringify(this.state.error?.stack)}</pre>
        </div>
      )
    }

    return this.props.children
  }
}
