'use client';

import InfoPageLayout from "@/components/shared/InfoPageLayout";
import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <InfoPageLayout 
      title="Refund Policy" 
      description="Our commitment to your satisfaction"
    >
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Refund Policy</h2>
        
        <p className="mb-6">
          At LLMastery, we want you to be completely satisfied with your learning experience. 
          We&apos;ve designed this refund policy to be fair and transparent, ensuring you feel confident in your investment.
        </p>
        
        <p className="mb-10">
          This policy was last updated on April 3, 2025.
        </p>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Subscription Plans</h3>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">14-Day Money Back Guarantee</h4>
          <p className="mb-4">
            All new premium subscriptions (Monthly, Annual, and Enterprise) come with a 14-day money-back guarantee.
            If you&apos;re not satisfied with your subscription for any reason, you can request a full refund within 14 days
            of your initial purchase.
          </p>
          
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">How to Request a Refund for Subscriptions</h4>
          <ol className="list-decimal pl-6 mb-4">
            <li className="mb-2">Log into your LLMastery account</li>
            <li className="mb-2">Navigate to Account Settings → Billing</li>
            <li className="mb-2">Click on &quot;Request Refund&quot; and select your reason</li>
            <li>Our support team will process your refund within 5-7 business days</li>
          </ol>
          
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Subscription Cancellations After 14 Days</h4>
          <p>
            After the 14-day period, you can cancel your subscription at any time, but refunds will not be provided for
            partial or unused subscription periods. Your access will remain active until the end of your current billing cycle.
          </p>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Credit Packages</h3>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Credit Package Refunds</h4>
          <p className="mb-4">
            We offer refunds on unused credit packages under the following conditions:
          </p>
          
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              <span className="font-medium">Full Refund:</span> Available if no credits have been used within 14 days of purchase
            </li>
            <li className="mb-2">
              <span className="font-medium">Partial Refund:</span> Available for the remaining unused credits if the request
              is made within 30 days of purchase (unused credits will be refunded at the original per-credit purchase price)
            </li>
            <li>
              <span className="font-medium">No Refund:</span> Credit packages cannot be refunded after 30 days from purchase
              or if you&apos;ve used more than 50% of the credits
            </li>
          </ul>
          
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">How to Request a Refund for Credits</h4>
          <ol className="list-decimal pl-6">
            <li className="mb-2">Log into your LLMastery account</li>
            <li className="mb-2">Navigate to Account Settings → Credits</li>
            <li className="mb-2">Click on &quot;Request Credit Refund&quot;</li>
            <li>Our support team will review your request within 3 business days</li>
          </ol>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Exclusions</h3>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <p className="mb-4">Refunds will not be issued in the following circumstances:</p>
          
          <ul className="list-disc pl-6">
            <li className="mb-2">Account termination due to violations of our <Link href="/terms" className="text-indigo-600 dark:text-indigo-400 hover:underline">Terms of Service</Link></li>
            <li className="mb-2">Unauthorized or fraudulent payment disputes</li>
            <li className="mb-2">Claims made after the specified refund period</li>
            <li>Educational content that has already been accessed or downloaded</li>
          </ul>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Processing Time and Method</h3>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <p className="mb-4">
            All approved refunds will be processed using the original payment method, with the following timeframes:
          </p>
          
          <ul className="list-disc pl-6">
            <li className="mb-2">Credit/debit card payments: 5-7 business days</li>
            <li className="mb-2">PayPal payments: 3-5 business days</li>
            <li>Other payment methods: Up to 10 business days</li>
          </ul>
          
          <p className="mt-4">
            Please note that your bank or payment provider may have additional processing times after we issue the refund.
          </p>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Special Circumstances</h3>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-10">
          <p className="mb-4">
            We understand that exceptional situations may arise. For cases not covered by this policy, please contact
            our support team, and we&apos;ll review your situation on a case-by-case basis.
          </p>
          
          <p>
            If you&apos;ve experienced technical difficulties or quality issues that have significantly impacted your
            learning experience, please submit details through our <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">Contact Form</Link>.
            We&apos;re committed to addressing these concerns promptly.
          </p>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h3>
          
          <p>
            If you have any questions about our refund policy, please contact our customer support team at{" "}
            <a href="mailto:support@llmastery.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              support@llmastery.com
            </a>{" "}
            or through our <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">Contact Form</Link>.
          </p>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-300 italic">
            This refund policy is provided as general information and does not constitute legal advice.
            LLMastery reserves the right to modify this policy at any time. Users will be notified of
            significant changes.
          </p>
        </div>
      </div>
    </InfoPageLayout>
  );
}