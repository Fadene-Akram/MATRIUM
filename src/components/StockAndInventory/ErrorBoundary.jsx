import React from "react";

/**
 * ErrorBoundary is a React component that catches JavaScript errors anywhere
 * in its child component tree and logs them, displaying a fallback UI instead
 * of the crashing component.
 *
 * @component
 * @example
 * // Example usage
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  /**
   * Initializes the state for error handling.
   *
   * @param {Object} props - The properties passed to the component.
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * React lifecycle method that is called when an error is thrown.
   * It updates the state to trigger the fallback UI.
   *
   * @param {Error} error - The error that was thrown.
   * @returns {Object} - The updated state object with `hasError: true`.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * This lifecycle method is called after the error is caught and logs the error
   * and additional information about the error.
   *
   * @param {Error} error - The error that was thrown.
   * @param {Object} errorInfo - An object with additional information about the error.
   */
  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  /**
   * Renders the component. If an error has occurred, it shows a fallback UI.
   * Otherwise, it renders the children components.
   *
   * @returns {JSX.Element} - Either a fallback UI or the children components.
   */
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
