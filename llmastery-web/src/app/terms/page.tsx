"use client";

import InfoPageLayout from "@/components/shared/InfoPageLayout";
import Link from "next/link";

export default function TermsPage() {
  return (
    <InfoPageLayout
      title="Terms of Service"
      description="Please read these terms carefully before using our platform"
    >
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Terms of Service
        </h2>

        <p className="mb-6">
          Welcome to LLMastery. These Terms of Service (&quot;Terms&quot;)
          govern your use of the LLMastery platform and services, including our
          website, content, and related services (collectively, the
          &quot;Service&quot;).
        </p>

        <p className="mb-10">
          By accessing or using the Service, you agree to be bound by these
          Terms. If you disagree with any part of the Terms, you may not access
          the Service. These Terms were last updated on April 3, 2025.
        </p>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          1. Accounts and Registration
        </h3>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <p className="mb-4">
            When you create an account with us, you must provide accurate,
            complete, and up-to-date information. You are responsible for
            maintaining the confidentiality of your account and password, and
            for all activities that occur under your account.
          </p>

          <p>
            You agree to notify us immediately of any unauthorized access to or
            use of your account. We reserve the right to suspend or terminate
            your account if you provide false information or violate these
            Terms.
          </p>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          2. Subscription and Payments
        </h3>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            2.1 Subscription Terms
          </h4>
          <p className="mb-4">
            Certain features of the Service require a subscription or credit
            purchase. By subscribing, you agree to pay the subscription fees as
            outlined in our Pricing Page Subscriptions automatically renew at
            the end of each billing period unless canceled.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            2.2 Cancellation and Refunds
          </h4>
          <p className="mb-4">
            You may cancel your subscription at any time through your account
            settings. Cancellation will be effective at the end of your current
            billing period.
            {/* For more information on refunds, please see our */}
            {/* <Link
              href="/refund-policy"
              className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1"
            >
              Refund Policy
            </Link> */}
          </p>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            2.3 Price Changes
          </h4>
          <p>
            We reserve the right to adjust pricing for our Service or any
            components thereof in any manner and at any time as we may determine
            in our sole discretion. If we do change prices, we will provide
            notice of such changes on our website and/or by email at least 30
            days prior to the change taking effect.
          </p>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          3. Content and Intellectual Property
        </h3>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            3.1 Our Content
          </h4>
          <p className="mb-4">
            All content provided through the Service, including but not limited
            to text, graphics, logos, icons, images, audio clips, digital
            downloads, data compilations, and software, is the property of
            LLMastery or its content suppliers and is protected by international
            copyright laws.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            3.2 License to Use
          </h4>
          <p className="mb-4">
            We grant you a limited, non-exclusive, non-transferable, and
            revocable license to access and use the Service for your personal,
            non-commercial use. This license does not include the right to:
          </p>

          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              Redistribute, sell, or license any part of the Service
            </li>
            <li className="mb-2">
              Copy or modify the Service or any content therein
            </li>
            <li className="mb-2">
              Use the Service for any commercial purpose without our explicit
              consent
            </li>
            <li>
              Access or attempt to access any systems or servers on which the
              Service is hosted
            </li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            3.3 User-Generated Content
          </h4>
          <p>
            You may have the opportunity to submit content to the Service, such
            as forum posts, project submissions, or feedback. By submitting such
            content, you grant LLMastery a worldwide, non-exclusive,
            royalty-free license to use, reproduce, modify, adapt, publish,
            translate, and distribute your content in any existing or future
            media. You represent and warrant that you own or have the necessary
            rights to submit such content.
          </p>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          4. User Conduct
        </h3>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <p className="mb-4">You agree not to use the Service to:</p>

          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Violate any applicable laws or regulations</li>
            <li className="mb-2">Infringe upon the rights of others</li>
            <li className="mb-2">Submit false or misleading information</li>
            <li className="mb-2">
              Upload or transmit viruses or malicious code
            </li>
            <li className="mb-2">
              Interfere with or disrupt the Service or servers
            </li>
            <li className="mb-2">
              Attempt to gain unauthorized access to any parts of the Service
            </li>
            <li className="mb-2">Harass, abuse, or harm another person</li>
            <li>
              Use the Service in any way that could damage or overburden it
            </li>
          </ul>

          <p>
            We reserve the right to terminate or suspend your access to the
            Service immediately, without prior notice or liability, for any
            violations of these Terms or for any other reason at our sole
            discretion.
          </p>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          5. Limitation of Liability
        </h3>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <p className="mb-4">
            To the maximum extent permitted by law, LLMastery and its
            affiliates, officers, employees, agents, partners, and licensors
            shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, including but not limited to
            loss of profits, data, use, or goodwill, arising out of or in
            connection with your access to or use of the Service.
          </p>

          <p>
            In no event shall our total liability to you for all claims exceed
            the amount paid by you to LLMastery during the twelve (12) months
            preceding the event giving rise to the liability.
          </p>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          6. Disclaimers
        </h3>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <p className="mb-4">
            The Service is provided &quot;as is&quot; and &quot;as
            available&quot; without warranties of any kind, either express or
            implied, including, but not limited to, implied warranties of
            merchantability, fitness for a particular purpose, or
            non-infringement.
          </p>

          <p className="mb-4">
            We do not warrant that the Service will be uninterrupted or
            error-free, that defects will be corrected, or that the Service or
            the servers that make it available are free of viruses or other
            harmful components.
          </p>

          <p>
            Educational content provided through the Service is for
            informational purposes only and does not guarantee specific results
            or outcomes.
          </p>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          7. Governing Law
        </h3>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the State of Delaware, United States, without regard to
            its conflict of law provisions. Any dispute arising from these Terms
            shall be resolved exclusively in the state or federal courts located
            in Delaware.
          </p>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          8. Changes to Terms
        </h3>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <p>
            We reserve the right to modify or replace these Terms at any time at
            our sole discretion. If we make material changes to these Terms, we
            will provide notice through our website or by other means. Your
            continued use of the Service after any such changes constitutes your
            acceptance of the new Terms.
          </p>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          9. Contact Information
        </h3>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <p>
            If you have any questions about these Terms, please contact us{" "}
            through our{" "}
            <Link
              href="/contact"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Contact Form
            </Link>
            .
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-300 italic">
            By using the LLMastery platform, you acknowledge that you have read,
            understood, and agree to be bound by these Terms of Service. If you
            do not agree to these Terms, please do not use our Service.
          </p>
        </div>
      </div>
    </InfoPageLayout>
  );
}
