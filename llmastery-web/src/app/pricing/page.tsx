'use client';

import { useState } from 'react';
import InfoPageLayout from "@/components/shared/InfoPageLayout";
import Link from 'next/link';
import PaymentMethodSelector from '@/components/shared/PaymentMethodSelector';
import PaymentForm from '@/components/shared/PaymentForm';
import PaymentSummary from '@/components/shared/PaymentSummary';
import { PaymentMethod, PaymentSummary as PaymentSummaryType } from '@/components/shared/types';

// Types for our pricing data
interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: string;
  features: string[];
  is_active: boolean;
}

interface CreditPackage {
  id: string;
  name: string;
  description: string;
  credits: number;
  price: number;
  currency: string;
  is_active: boolean;
}

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Placeholder data from our database seed
  const pricingPlans: PricingPlan[] = [
    {
      id: '00000000-0000-0000-0000-000000000101',
      name: 'Free Plan',
      description: 'Access to foundational content to start your LLM learning journey.',
      price: 0,
      currency: 'USD',
      interval: 'month',
      features: [
        'Access to beginner-level lessons',
        '5 quizzes per month',
        'Community forum access',
        'Progress tracking'
      ],
      is_active: true,
    },
    {
      id: '00000000-0000-0000-0000-000000000102',
      name: 'Premium Monthly',
      description: 'Full access to all content with monthly billing.',
      price: 14.99,
      currency: 'USD',
      interval: 'month',
      features: [
        'All lessons and learning paths',
        'Unlimited quizzes and challenges',
        'Priority community support',
        'Progress certification',
        'Ad-free experience',
        'Download resources'
      ],
      is_active: true,
    },
    {
      id: '00000000-0000-0000-0000-000000000103',
      name: 'Premium Annual',
      description: 'Full access to all content with annual billing at a discounted rate.',
      price: 149.99,
      currency: 'USD',
      interval: 'year',
      features: [
        'All lessons and learning paths',
        'Unlimited quizzes and challenges',
        'Priority community support',
        'Progress certification',
        'Ad-free experience',
        'Download resources',
        '2 months free compared to monthly'
      ],
      is_active: true,
    },
    {
      id: '00000000-0000-0000-0000-000000000104',
      name: 'Enterprise',
      description: 'Team access with advanced analytics and custom content.',
      price: 499.99,
      currency: 'USD',
      interval: 'month',
      features: [
        'All Premium features',
        'Team management dashboard',
        'Custom learning paths',
        'Progress analytics',
        'Private community groups',
        'Priority support',
        'Custom API access'
      ],
      is_active: true,
    }
  ];

  const creditPackages: CreditPackage[] = [
    {
      id: '00000000-0000-0000-0000-000000000201',
      name: 'Starter Pack',
      description: '50 credits to access premium lessons individually',
      credits: 50,
      price: 4.99,
      currency: 'USD',
      is_active: true,
    },
    {
      id: '00000000-0000-0000-0000-000000000202',
      name: 'Standard Pack',
      description: '125 credits to access premium lessons individually',
      credits: 125,
      price: 9.99,
      currency: 'USD',
      is_active: true,
    },
    {
      id: '00000000-0000-0000-0000-000000000203',
      name: 'Value Pack',
      description: '300 credits to access premium lessons individually',
      credits: 300,
      price: 19.99,
      currency: 'USD',
      is_active: true,
    },
    {
      id: '00000000-0000-0000-0000-000000000204',
      name: 'Ultimate Pack',
      description: '700 credits to access premium lessons individually',
      credits: 700,
      price: 39.99,
      currency: 'USD',
      is_active: true,
    }
  ];

  // Filter plans based on billing cycle
  const filteredPlans = billingCycle === 'monthly'
    ? pricingPlans.filter(plan => plan.interval === 'month' || plan.name === 'Free Plan')
    : pricingPlans.filter(plan => plan.interval === 'year' || plan.name === 'Free Plan' || plan.name === 'Enterprise');
  
  // Function to format price with currency
  const formatPrice = (price: number, currency: string, interval: string): string => {
    if (price === 0) return 'Free';
    return `${currency === 'USD' ? '$' : ''}${price.toFixed(2)}${interval ? `/${interval === 'month' ? 'mo' : 'yr'}` : ''}`;
  };

  // Handle plan selection
  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
    setSelectedPackageId(null);
    setShowCheckout(true);
  };

  // Handle package selection
  const handlePackageSelect = (packageId: string) => {
    setSelectedPackageId(packageId);
    setSelectedPlanId(null);
    setShowCheckout(true);
  };

  // Handle checkout
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // In a real app, you'd handle the payment through an API call
      alert('Payment successful! Redirecting to dashboard...');
      setIsProcessing(false);
      setShowCheckout(false);
      // Navigate to dashboard or confirmation page
      window.location.href = '/dashboard';
    }, 2000);
  };

  // Get the selected plan or package details for the payment summary
  const getPaymentSummary = (): PaymentSummaryType => {
    let selectedItem;
    
    if (selectedPlanId) {
      selectedItem = pricingPlans.find(plan => plan.id === selectedPlanId);
      if (selectedItem) {
        return {
          items: [{
            id: selectedItem.id,
            name: selectedItem.name,
            price: selectedItem.price,
            quantity: 1
          }],
          subtotal: selectedItem.price,
          total: selectedItem.price
        };
      }
    } else if (selectedPackageId) {
      selectedItem = creditPackages.find(pack => pack.id === selectedPackageId);
      if (selectedItem) {
        return {
          items: [{
            id: selectedItem.id,
            name: selectedItem.name,
            description: `${selectedItem.credits} Credits`,
            price: selectedItem.price,
            quantity: 1
          }],
          subtotal: selectedItem.price,
          total: selectedItem.price
        };
      }
    }
    
    // Default empty summary
    return {
      items: [],
      subtotal: 0,
      total: 0
    };
  };

  return (
    <InfoPageLayout 
      title="Pricing Plans" 
      description="Choose the plan that&apos;s right for you"
    >
      {!showCheckout ? (
        <div className="space-y-12">
          <div>
            <div className="flex justify-center mb-8">
              <div className="flex items-center p-1 rounded-lg bg-gray-100 dark:bg-gray-700/50">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    billingCycle === 'monthly'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    billingCycle === 'annual'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Annual (Save up to 16%)
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border rounded-lg overflow-hidden ${
                    plan.name === 'Premium Monthly' || plan.name === 'Premium Annual'
                      ? 'border-indigo-500 dark:border-indigo-400 shadow-md'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {(plan.name === 'Premium Monthly' || plan.name === 'Premium Annual') && (
                    <div className="bg-indigo-500 text-white text-center py-1.5 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
                    
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {formatPrice(plan.price, plan.currency, plan.interval)}
                      </span>
                    </div>
                    
                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8">
                      {plan.name === 'Free Plan' ? (
                        <Link href="/signup" 
                          className="w-full block text-center px-4 py-2 rounded-md font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                        >
                          Sign Up Free
                        </Link>
                      ) : (
                        <button
                          onClick={() => handlePlanSelect(plan.id)} 
                          className={`w-full block text-center px-4 py-2 rounded-md font-medium ${
                            plan.name === 'Premium Monthly' || plan.name === 'Premium Annual'
                              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                          }`}
                        >
                          Subscribe Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Credit Packages</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Don&apos;t want to commit to a subscription? Purchase credits to access individual premium lessons and features.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {creditPackages.map((pack) => (
                <div
                  key={pack.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{pack.name}</h3>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {pack.currency === 'USD' ? '$' : ''}{pack.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {pack.description}
                  </p>
                  <div className="mt-4 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-md">
                    <span className="font-medium text-indigo-700 dark:text-indigo-300">
                      {pack.credits} Credits
                    </span>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => handlePackageSelect(pack.id)}
                      className="w-full block text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-md font-medium"
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
                Frequently Asked Questions
              </h2>
              
              <div className="mt-8 max-w-3xl mx-auto space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Can I switch plans later?
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Yes, you can easily upgrade, downgrade or cancel your subscription at any time from your account settings.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Do credits expire?
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Credits are valid for 12 months from the date of purchase.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Is there a refund policy?
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Yes, we offer a 14-day money back guarantee for all subscription plans. For more information, please check our <Link href="/refund-policy" className="text-indigo-600 dark:text-indigo-400 hover:underline">Refund Policy</Link>.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    How many team members can I add to the Enterprise plan?
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    The base Enterprise plan includes up to 10 team members. Additional seats can be purchased separately. For custom enterprise solutions, please <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">contact us</Link>.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Have more questions? We&apos;re here to help.
              </p>
              <Link href="/contact"
                className="mt-4 inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Checkout Section */
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h2>
            <button
              onClick={() => setShowCheckout(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ← Back to Plans
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <form onSubmit={handleCheckout}>
                <div className="space-y-6">
                  <PaymentMethodSelector onMethodChange={setPaymentMethod} />
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">Payment Details</h3>
                    <PaymentForm 
                      paymentMethod={paymentMethod}
                      isProcessing={isProcessing} 
                    />
                  </div>
                  
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : 'Complete Purchase'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="md:col-span-1">
              <PaymentSummary summary={getPaymentSummary()} />
              
              <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                <p>By completing this purchase, you agree to our <Link href="/terms" className="text-indigo-600 dark:text-indigo-400 hover:underline">Terms of Service</Link> and acknowledge our <Link href="/privacy" className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</Link>.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </InfoPageLayout>
  );
}