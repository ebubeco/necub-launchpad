import { Component, ReactNode } from "react";

interface State { hasError: boolean; message?: string }

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, message: err.message };
  }

  componentDidCatch(error: Error, info: unknown) {
    // eslint-disable-next-line no-console
    console.error("App error:", error, info);
  }

  reset = () => {
    this.setState({ hasError: false, message: undefined });
    window.location.assign("/");
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main className="grid min-h-screen place-items-center bg-background p-6 text-foreground">
        <div className="panel max-w-md p-8 text-center">
          <h1 className="text-xl font-semibold tracking-tight">Something went wrong</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Unable to load this section. Please refresh or return to the homepage.
          </p>
          <button
            onClick={this.reset}
            className="mt-5 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-primary to-primary-glow px-4 py-2 text-sm font-medium text-white"
          >
            Return to homepage
          </button>
        </div>
      </main>
    );
  }
}
