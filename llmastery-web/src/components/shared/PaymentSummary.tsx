'use client';

import { PaymentSummary as PaymentSummaryType } from './types';

interface PaymentSummaryProps {
  summary: PaymentSummaryType;
  className?: string;
}

const PaymentSummary = ({ summary, className = '' }: PaymentSummaryProps) => {
  const { items, subtotal, tax = 0, discount = 0, total } = summary;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  return (
    <div className={`border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 ${className}`}>
      <h3 className="font-medium text-gray-900 dark:text-white mb-4">Order Summary</h3>
      
      {/* Items list */}
      <div className="space-y-2 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {item.name} {item.quantity > 1 && `(${item.quantity})`}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
      
      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
      
      {/* Subtotal */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
        <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
      </div>
      
      {/* Tax if applicable */}
      {tax > 0 && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">Tax</span>
          <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(tax)}</span>
        </div>
      )}
      
      {/* Discount if applicable */}
      {discount > 0 && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">Discount</span>
          <span className="font-medium text-green-600 dark:text-green-400">-{formatCurrency(discount)}</span>
        </div>
      )}
      
      {/* Total */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
      <div className="flex justify-between">
        <span className="font-medium text-gray-800 dark:text-gray-200">Total</span>
        <span className="font-bold text-gray-900 dark:text-white text-lg">{formatCurrency(total)}</span>
      </div>
    </div>
  );
};

export default PaymentSummary;