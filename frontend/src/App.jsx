import { useState, useEffect } from "react";
import axios from "axios";
import ExchangeInfo from "./components/ExchangeInfo";
import SymbolList from "./components/SymbolList";
import SymbolDetails from "./components/SymbolDetails";
import InactiveSymbols from "./components/InactiveSymbols";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [exchangeData, setExchangeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchExchangeInfo();
  }, []);

  const fetchExchangeInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/exchangeInfo"
      );
      setExchangeData(response.data);

      console.log(response);
    } catch (err) {
      setError(err.response?.data?.message || err.message); // Handle Axios error format
    } finally {
      setLoading(false);
    }
  };

  // Filter only active symbols for the main symbol list
  const activeSymbols =
    exchangeData?.symbols?.filter((symbol) => symbol.status === "1") || [];

  const filteredSymbols = activeSymbols.filter(
    (symbol) =>
      symbol.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      symbol.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error)
    return <ErrorMessage message={error} onRetry={fetchExchangeInfo} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              MEXC Exchange Info
            </h1>
            <button
              onClick={fetchExchangeInfo}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Exchange Info & Inactive Symbols */}
          <div className="lg:col-span-1 space-y-8">
            <ExchangeInfo data={exchangeData} />
            <InactiveSymbols symbols={exchangeData?.symbols} />
          </div>

          {/* Middle Column - Symbol List (Active Only) */}
          <div className="lg:col-span-1">
            <SymbolList
              symbols={filteredSymbols}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSymbolSelect={setSelectedSymbol}
              selectedSymbol={selectedSymbol}
            />
          </div>

          {/* Right Column - Symbol Details */}
          <div className="lg:col-span-1">
            <SymbolDetails symbol={selectedSymbol} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
