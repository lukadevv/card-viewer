import "./app.css";
import { CoreProvider } from "./contexts/core.context";
import { Routes } from "./routes/Routes";

export function App() {
  return (
    <CoreProvider>
      <Routes />
    </CoreProvider>
  );
}
