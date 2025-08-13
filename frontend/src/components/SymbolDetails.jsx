import React from 'react';

const SymbolDetails = ({ symbol }) => {
  if (!symbol) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Symbol Details</h2>
        <div className="text-center py-8 text-gray-500">
          Select a symbol to view details
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Symbol Details</h2>
      
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-lg text-gray-900">{symbol.symbol}</h3>
          <p className="text-gray-600">{symbol.fullName}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Base Asset</h4>
            <p className="text-gray-600">{symbol.baseAsset}</p>
            <p className="text-sm text-gray-500">Precision: {symbol.baseAssetPrecision}</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Quote Asset</h4>
            <p className="text-gray-600">{symbol.quoteAsset}</p>
            <p className="text-sm text-gray-500">Precision: {symbol.quoteAssetPrecision}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Trading</h4>
          <div className="flex flex-wrap gap-2">
            <span className={`px-2 py-1 rounded-full text-xs ${
              symbol.isSpotTradingAllowed 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {symbol.isSpotTradingAllowed ? 'Spot Trading' : 'No Spot Trading'}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              symbol.isMarginTradingAllowed 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {symbol.isMarginTradingAllowed ? 'Margin Trading' : 'No Margin Trading'}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Order Types</h4>
          <div className="flex flex-wrap gap-2">
            {symbol.orderTypes.map((type) => (
              <span key={type} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Maker Commission</h4>
            <p className="text-gray-600">{(parseFloat(symbol.makerCommission) * 100).toFixed(4)}%</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Taker Commission</h4>
            <p className="text-gray-600">{(parseFloat(symbol.takerCommission) * 100).toFixed(4)}%</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Max Quote Amount</h4>
          <p className="text-gray-600">{Number(symbol.maxQuoteAmount).toLocaleString()} {symbol.quoteAsset}</p>
        </div>

        {symbol.contractAddress && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Contract Address</h4>
            <p className="text-xs text-gray-600 font-mono break-all bg-gray-50 p-2 rounded">
              {symbol.contractAddress}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Permissions</h4>
          <div className="flex flex-wrap gap-2">
            {symbol.permissions.map((permission) => (
              <span key={permission} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                {permission}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymbolDetails;