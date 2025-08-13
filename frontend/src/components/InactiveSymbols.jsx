import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const InactiveSymbols = ({ symbols }) => {
  const inactiveSymbols = symbols?.filter(symbol => symbol.status !== '1') || [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-4">
        <ExclamationTriangleIcon className="h-6 w-6 text-orange-500" />
        <h2 className="text-xl font-semibold text-gray-900">Inactive Symbols</h2>
        <span className="bg-orange-100 text-orange-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {inactiveSymbols.length}
        </span>
      </div>
      
      {inactiveSymbols.length === 0 ? (
        <div className="text-center py-6">
          <div className="text-green-600 mb-2">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">All symbols are active!</p>
          <p className="text-sm text-gray-500">No inactive trading pairs found.</p>
        </div>
      ) : (
        <>
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-700">
              <strong>Note:</strong> These symbols are currently inactive and unavailable for trading.
            </p>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            <div className="space-y-2">
              {inactiveSymbols.map((symbol) => (
                <div
                  key={symbol.symbol}
                  className="p-3 rounded-lg border border-red-200 bg-red-50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">{symbol.symbol}</h3>
                      <p className="text-sm text-gray-600">{symbol.fullName}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {symbol.baseAsset}/{symbol.quoteAsset}
                        </span>
                        {symbol.contractAddress && (
                          <span className="text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">
                            Contract
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                        Inactive
                      </span>
                      <span className="text-xs text-gray-500">
                        Status: {symbol.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="mt-2 pt-2 border-t border-red-200">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Spot: {symbol.isSpotTradingAllowed ? '?' : '?'}</span>
                      <span>Margin: {symbol.isMarginTradingAllowed ? '?' : '?'}</span>
                      <span>Orders: {symbol.orderTypes?.length || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <p className="font-medium text-gray-900">{inactiveSymbols.length}</p>
                <p className="text-gray-500">Inactive Symbols</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-900">
                  {inactiveSymbols.filter(s => s.contractAddress).length}
                </p>
                <p className="text-gray-500">With Contracts</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InactiveSymbols;