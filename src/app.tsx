import "./app.css";
import { HomePage } from "./components/pages/home.page";
import { CoreProvider } from "./contexts/core.context";

export function App() {
  return (
    <CoreProvider>
      <HomePage />
    </CoreProvider>
  );
}
