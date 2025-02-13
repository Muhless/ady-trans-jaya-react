import { HelmetProvider } from "react-helmet-async";
import AppRoutes from "./routes";
import Layout from "./layouts";

function App() {
  return (
    <HelmetProvider>
      <AppRoutes />
    </HelmetProvider>
  );
}

export default App;
