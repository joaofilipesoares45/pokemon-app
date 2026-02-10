import { DataProvider } from "./context/DataContext.tsx";
import RouterApp from "./Routes.tsx";

function App() {
  return (
    <DataProvider>
      <RouterApp />
    </DataProvider>
  );
}

export default App;
