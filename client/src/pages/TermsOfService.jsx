import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  XCircle,
  HelpCircle,
} from "lucide-react";

const Section = ({ icon: Icon, title, children }) => (
  <div className="group bg-white/50 hover:bg-white backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 mb-6">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300 shrink-0">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="text-gray-600 leading-relaxed space-y-2 text-sm md:text-base">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const TermsOfService = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative font-[Poppins] overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-400/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 animate-pulse delay-700" />
      </div>

      <div className="pt-24 md:pt-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 group flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-white/50 rounded-full shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-emerald-600"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-2xl mb-6 shadow-inner">
            <FileText className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Terms of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Service
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully. By using PGBuddy, you agree to be
            bound by these conditions ensuring a safe community for everyone.
          </p>
          <p className="text-sm font-semibold text-emerald-600 mt-4 uppercase tracking-wider bg-emerald-50 inline-block px-3 py-1 rounded-full">
            Last Updated: January 11, 2026
          </p>
        </div>

        <div className="grid gap-2 mb-20">
          <Section icon={CheckCircle} title="Acceptance of Terms">
            <p>
              By accessing or using PGBuddy, you agree to comply with and be
              bound by these Terms of Service. If you do not agree to these
              terms, you may not use our services. we have the right to modify
              these terms at any time, and your continued use of the platform
              constitutes acceptance of those changes.
            </p>
          </Section>

          <Section icon={AlertTriangle} title="User Responsibilities">
            <p>
              Users are responsible for maintaining the confidentiality of their
              account. You agree to:
            </p>
            <ul className="list-disc ml-5 marker:text-emerald-500">
              <li>Provide accurate, current, and complete information.</li>
              <li>
                Not engage in fraudulent activity, harassment, or impersonation.
              </li>
            </ul>
          </Section>

          <Section icon={CreditCard} title="Bookings & Payments">
            <p>PGBuddy acts as a bridge between PG owners and tenants.</p>
            <ul className="list-disc ml-5 marker:text-emerald-500">
              <li>
                <strong>Fees:</strong> We may charge a service fee for platform
                usage, which will be disclosed before booking.
              </li>
              <li>
                <strong>Payments:</strong> Online payments are processed
                securely. "Pay at Property" agreements are solely between the
                user and owner.
              </li>
            </ul>
          </Section>

          <Section icon={XCircle} title="Cancellations & Refunds">
            <p>
              Cancellation policies are determined by the individual property
              owners. PGBuddy is not responsible for refunds regarding
              off-platform transactions. For online bookings, refunds are
              processed according to the specific cancellation tier chosen at
              booking.
            </p>
          </Section>

          <Section icon={HelpCircle} title="Limitation of Liability">
            <p>
              PGBuddy is not an owner or operator of properties. We do not
              guarantee the quality, safety, or suitability of any
              accommodation. We are not liable for any damages arising from the
              use of our service or the conduct of other users.
            </p>
          </Section>

          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>
              By continuing to use our services, you acknowledge that you have
              read and understood these terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
