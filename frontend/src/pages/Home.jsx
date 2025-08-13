import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import axios from "axios";
import ExchangeInfo from "../components/ExchangeInfo";
import SymbolList from "../components/SymbolList";
import SymbolDetails from "../components/SymbolDetails";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const Home = () => {
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
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Refresh button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={fetchExchangeInfo}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Exchange Info */}
        <div className="lg:col-span-1">
          <ExchangeInfo data={exchangeData} />
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
    </div>
  );
};

export default Home;
