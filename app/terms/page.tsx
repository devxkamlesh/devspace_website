'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <main className="pt-32 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using DevSpace, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
          <p>
            DevSpace provides a development environment and tools designed to enhance developer productivity. Our services include code editing, collaborative features, and AI-powered assistance.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
          <p>
            To access certain features of our platform, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </p>
          <p className="mt-2">
            You agree to provide accurate and complete information when creating an account and to update your information to keep it accurate and current.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 my-4">
            <li>Use our services for any illegal purpose or in violation of any laws</li>
            <li>Infringe on the intellectual property rights of others</li>
            <li>Transmit harmful code, malware, or other malicious content</li>
            <li>Interfere with or disrupt our services or servers</li>
            <li>Attempt to gain unauthorized access to any part of our services</li>
            <li>Use our services to transmit spam, phishing attempts, or other unsolicited communications</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
          <p>
            Our platform, including all content, features, and functionality, is owned by DevSpace and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="mt-2">
            You retain ownership of your code and content that you create, upload, or store using our services. By using our services, you grant us a license to host, store, and display your content as necessary to provide our services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Subscription and Billing</h2>
          <p>
            Some features of our platform require a paid subscription. By subscribing to our paid services, you agree to pay the applicable fees as they become due. We may change our fees at any time, but changes will not apply to existing subscription periods.
          </p>
          <p className="mt-2">
            Unless otherwise specified, subscriptions will automatically renew until canceled. You may cancel your subscription at any time, but refunds are only provided as specified in our refund policy.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, DevSpace shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to, loss of profits, data, or use, arising out of or in connection with these Terms or your use of our services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Disclaimer of Warranties</h2>
          <p>
            Our services are provided "as is" without warranties of any kind, either express or implied, including, but not limited to, warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Modifications to Terms</h2>
          <p>
            We may modify these Terms at any time by posting the revised Terms on our website. Your continued use of our services after any such changes constitutes your acceptance of the new Terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and access to our services at our discretion, without notice, for any violation of these Terms or for any other reason.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact Us</h2>
          <p>
            If you have questions or concerns about these Terms, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> legal@devspace.com
          </p>
          
          <div className="mt-12 mb-8">
            <Link href="/" className="text-primary-600 hover:text-primary-700">
              &larr; Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 