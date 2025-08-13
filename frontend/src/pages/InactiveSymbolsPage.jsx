import { useState, useEffect } from "react";
import { RefreshCw, AlertCircle } from "lucide-react";
import axios from "axios";
import InactiveSymbols from "../components/InactiveSymbols";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const InactiveSymbolsPage=()=> {
  const [exchangeData, setExchangeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return <ErrorMessage message={error} onRetry={fetchExchangeInfo} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-red-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Inactive Trading Pairs</h2>
        </div>
        <button
          onClick={fetchExchangeInfo}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>
      
      <InactiveSymbols symbols={exchangeData?.symbols} />
    </div>
  );
}

export default InactiveSymbolsPage;