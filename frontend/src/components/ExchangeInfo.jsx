import React from 'react';

const ExchangeInfo = ({ data }) => {
  if (!data) return null;

  const formatServerTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Exchange Information</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Timezone</span>
          <span className="font-medium">{data.timezone}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Server Time</span>
          <span className="font-medium text-sm">{formatServerTime(data.serverTime)}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Total Symbols</span>
          <span className="font-medium text-blue-600">{data.symbols?.length || 0}</span>
        </div>
        
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Rate Limits</span>
          <span className="font-medium">{data.rateLimits?.length || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default ExchangeInfo;