import React from 'react';
import PaymentHistoryTable from '../../components/SpendingComponents/PaymentHistoryTable';

const Earnings = () => {
  return (
    <div className="p-6 space-y-6 overflow-hidden">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Spendings</h1>
      </div>
      {/* Payment History */}
      <PaymentHistoryTable />
    </div>
  );
};

export default Earnings;