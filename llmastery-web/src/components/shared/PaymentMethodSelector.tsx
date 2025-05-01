'use client';

import { useState } from 'react';

type PaymentMethod = 'card' | 'paypal' | 'apple' | 'google';

interface PaymentMethodSelectorProps {
  onMethodChange: (method: PaymentMethod) => void;
}

const PaymentMethodSelector = ({ onMethodChange }: PaymentMethodSelectorProps) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');

  const handleSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    onMethodChange(method);
  };

  return (
    <div className="mb-6">
      <h3 className="font-medium text-gray-900 dark:text-white mb-3">Payment Method</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          type="button"
          className={`flex items-center justify-center p-4 border rounded-lg ${
            selectedMethod === 'card'
              ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900/30 dark:border-indigo-400'
              : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          onClick={() => handleSelect('card')}
        >
          <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 5.25H3C2.59 5.25 2.25 5.59 2.25 6V18C2.25 18.41 2.59 18.75 3 18.75H21C21.41 18.75 21.75 18.41 21.75 18V6C21.75 5.59 21.41 5.25 21 5.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.25 9.75H21.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm">Credit Card</span>
        </button>
        
        <button
          type="button"
          className={`flex items-center justify-center p-4 border rounded-lg ${
            selectedMethod === 'paypal'
              ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900/30 dark:border-indigo-400'
              : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          onClick={() => handleSelect('paypal')}
        >
          <svg className="h-6 w-6 mr-2 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 7.5H16.5C14.84 7.5 13.5 8.84 13.5 10.5C13.5 12.16 14.84 13.5 16.5 13.5H19.5C21.16 13.5 22.5 12.16 22.5 10.5C22.5 8.84 21.16 7.5 19.5 7.5Z" stroke="#0070BA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.5 13.5H10.5C12.16 13.5 13.5 12.16 13.5 10.5C13.5 8.84 12.16 7.5 10.5 7.5H7.5C5.84 7.5 4.5 8.84 4.5 10.5C4.5 12.16 5.84 13.5 7.5 13.5Z" stroke="#0070BA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.5 13.5H10.5" stroke="#0070BA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm">PayPal</span>
        </button>

        <button
          type="button"
          className={`flex items-center justify-center p-4 border rounded-lg ${
            selectedMethod === 'apple'
              ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900/30 dark:border-indigo-400'
              : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          onClick={() => handleSelect('apple')}
        >
          <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.41 12.7101C15.35 9.86008 17.7 8.53008 17.81 8.47008C16.48 6.56008 14.39 6.25008 13.67 6.22008C11.96 6.05008 10.32 7.26008 9.45 7.26008C8.56 7.26008 7.27 6.24008 5.82 6.27008C3.95 6.30008 2.25 7.41008 1.29 9.09008C-0.694996 12.5101 0.795004 17.5901 2.66 20.4001C3.58 21.7701 4.69 23.3101 6.12 23.2501C7.5 23.1901 8.06 22.3001 9.73 22.3001C11.39 22.3001 11.91 23.2501 13.38 23.2201C14.88 23.1901 15.83 21.8201 16.73 20.4301C17.84 18.8301 18.27 17.2601 18.29 17.1801C18.25 17.1701 15.47 16.1101 15.41 12.7101Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.08 4.20999C13.82 3.31999 14.31 2.09999 14.16 0.869995C13.12 0.929995 11.86 1.57999 11.09 2.43999C10.39 3.21999 9.81 4.46999 9.98 5.66999C11.14 5.78999 12.31 5.08999 13.08 4.20999Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm">Apple Pay</span>
        </button>

        <button
          type="button"
          className={`flex items-center justify-center p-4 border rounded-lg ${
            selectedMethod === 'google'
              ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900/30 dark:border-indigo-400'
              : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          onClick={() => handleSelect('google')}
        >
          <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.56 10.41L20.45 10.03C20.39 9.82996 20.16 9.65996 19.94 9.65996H12C11.7 9.65996 11.45 9.90996 11.45 10.21V13.8C11.45 14.1 11.7 14.35 12 14.35H15.09C14.5 15.1 13.56 15.59 12.45 15.59C10.79 15.59 9.45 14.24 9.45 12.59C9.45 10.94 10.79 9.58996 12.45 9.58996C13.16 9.58996 13.82 9.82996 14.32 10.24C14.55 10.42 14.85 10.42 15.06 10.24L17.45 7.97996C17.68 7.76996 17.7 7.41996 17.47 7.17996C16.24 5.99996 14.46 5.25 12.46 5.25C8.35 5.25 5 8.59996 5 12.72C5 16.84 8.35 20.19 12.46 20.19C16.31 20.19 19.46 17.18 19.46 13.32C19.46 12.3 19.18 11.3 18.75 10.42C18.68 10.21 18.61 10.3 18.61 10.21" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm">Google Pay</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;