import * as React from "react";
import { forceReloadUtil } from "../lib";
import Image from "next/image";
import Box from "@mui/material/Box";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    // return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // forceReloadUtil();
  }
  render() {
    // Check if the error is thrown
    if (this.state.errorInfo) {
      // You can render any custom fallback UI
      return (
        <Box
          sx={{
            marginTop: { xs: 10, md: 20 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            layout="fixed"
            src="/images/janus_logo_login.png"
            height={58}
            width={300}
            priority
          />
          {/* <div>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: "pre-wrap" }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div> */}
          {/* <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button> */}
        </Box>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
