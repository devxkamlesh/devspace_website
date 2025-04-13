'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <Link 
        href="/" 
        className="inline-flex items-center mb-8 text-gray-600 hover:text-primary-600 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to home
      </Link>
      
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 mb-4">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and 
            safeguard your information when you visit our website or use our services.
          </p>
          <p className="text-gray-700">
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
            please do not access the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-700">
            <li>Register for an account</li>
            <li>Sign up for our newsletter</li>
            <li>Request customer support</li>
            <li>Use certain features of our website</li>
          </ul>
          <p className="text-gray-700">
            Additionally, we may collect certain information automatically when you visit our website, 
            including your IP address, browser type, operating system, and information about how you use our site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We may use the information we collect for various purposes, including to:
          </p>
          <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-700">
            <li>Provide, operate, and maintain our website and services</li>
            <li>Improve, personalize, and expand our website and services</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you about updates, security alerts, and support</li>
            <li>Send you marketing and promotional communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
          <p className="text-gray-700 mb-4">
            We may use cookies and similar tracking technologies to collect information about your browsing activities 
            and to better understand how you interact with our website. You can set your browser to refuse all or some 
            browser cookies or to alert you when cookies are being sent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Third-Party Disclosure</h2>
          <p className="text-gray-700 mb-4">
            We may share your information with:
          </p>
          <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-700">
            <li>Service providers who perform services on our behalf</li>
            <li>Business partners with whom we jointly offer products or services</li>
            <li>Affiliated companies within our corporate family</li>
            <li>As required by law or to protect our rights</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-gray-700 mb-4">
            We implement reasonable security measures to protect your personal information. However, no method of 
            transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-gray-700 mb-4">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-700">
            <li>Right to access your personal information</li>
            <li>Right to correct inaccurate information</li>
            <li>Right to request deletion of your information</li>
            <li>Right to restrict processing of your information</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
          </ul>
          <p className="text-gray-700">
            To exercise these rights, please contact us using the information provided in the "Contact Us" section.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
          <p className="text-gray-700 mb-4">
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal 
            information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-700">
            Email: privacy@companyname.com<br />
            Address: 123 Privacy Street, City, State 12345
          </p>
        </section>
      </div>
    </main>
  );
} 