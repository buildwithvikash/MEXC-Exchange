import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Activity } from "lucide-react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const Analytics=() =>{
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

  const activeSymbols = exchangeData?.symbols?.filter((symbol) => symbol.status === "1") || [];
  const inactiveSymbols = exchangeData?.symbols?.filter((symbol) => symbol.status !== "1") || [];
  const totalSymbols = exchangeData?.symbols?.length || 0;

  // Group by quote asset
  const quoteAssets = activeSymbols.reduce((acc, symbol) => {
    const quote = symbol.quoteAsset;
    acc[quote] = (acc[quote] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center gap-3">
        <BarChart3 className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-900">Exchange Analytics</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Trading Pairs</p>
              <p className="text-3xl font-bold text-gray-900">{totalSymbols}</p>
            </div>
            <Activity className="text-blue-600" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Pairs</p>
              <p className="text-3xl font-bold text-green-600">{activeSymbols.length}</p>
            </div>
            <TrendingUp className="text-green-600" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inactive Pairs</p>
              <p className="text-3xl font-bold text-red-600">{inactiveSymbols.length}</p>
            </div>
            <Activity className="text-red-600" size={24} />
          </div>
        </div>
      </div>

      {/* Quote Assets Distribution */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quote Assets Distribution</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.entries(quoteAssets)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 12)
            .map(([asset, count]) => (
              <div key={asset} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-900">{asset}</p>
                <p className="text-sm text-gray-600">{count} pairs</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;