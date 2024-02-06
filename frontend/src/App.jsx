import { CriproContextProvider } from "./context/crypto-context";
import AppLayout from "./components/layout/AppLayout";
import "./App.css";

function App() {
  return (
    <CriproContextProvider>
      <AppLayout />
    </CriproContextProvider>
  );
}

export default App;
