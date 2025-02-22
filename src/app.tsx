import "./app.css";
import { CloudflareAnalytics } from "./components/atoms/CloudflareAnalytics";
import { CoreProvider } from "./contexts/core.context";
import { Routes } from "./routes/Routes";

export function App() {
  return (
    <>
      <CoreProvider>
        <Routes />
      </CoreProvider>
      <CloudflareAnalytics />
    </>
  );
}
