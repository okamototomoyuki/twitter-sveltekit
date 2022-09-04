declare global {
    interface Window {
        OnActive(): void;
        chrome: Chrome;
    }
    interface Chrome {
        webview: WebView;
    }
    interface WebView {
        postMessage(message: string): void;
    }
    declare var window: Window;
}