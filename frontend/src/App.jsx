import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import InactiveSymbolsPage from "./pages/InactiveSymbolsPage";
import Analytics from "./pages/Analytics";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inactive" element={<InactiveSymbolsPage />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
