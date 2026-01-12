import { Navigation } from "./components/layout/Navigation";
import { AppRouter } from "./router";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
