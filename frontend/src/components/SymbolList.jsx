import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SymbolList = ({ symbols, searchTerm, onSearchChange, onSymbolSelect, selectedSymbol }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Trading Symbols</h2>
      
      {/* Search Input */}
      <div className="relative mb-4">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search symbols..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Symbols List */}
      <div className="max-h-96 overflow-y-auto">
        <div className="space-y-2">
          {symbols.map((symbol) => (
            <div
              key={symbol.symbol}
              onClick={() => onSymbolSelect(symbol)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedSymbol?.symbol === symbol.symbol
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900">{symbol.symbol}</h3>
                  <p className="text-sm text-gray-500">{symbol.fullName}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    symbol.status === '1'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {symbol.status === '1' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {symbols.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No symbols found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default SymbolList;