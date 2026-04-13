import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  XCircle,
  HelpCircle,
} from "lucide-react";

const Section = ({ icon: Icon, title, children }) => (
  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 transition-all duration-300 mb-6">
    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 shrink-0">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <div className="text-slate-600 leading-relaxed space-y-2 text-sm sm:text-base">
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
    <div className="min-h-screen bg-[#fafaf8]">
      <div className="pt-6 md:pt-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-20">
        <button
          onClick={() => navigate(-1)}
          className="mb-10 group inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-semibold">Back</span>
        </button>

        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-3">
            Legal Information
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-slate-900 mb-5 tracking-tight leading-tight">
            Terms of Service
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully. By using PGBuddy, you agree to be
            bound by these conditions ensuring a safe community for everyone.
          </p>
          <p className="text-xs font-medium text-slate-400 mt-6 inline-block bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
            Last Updated: January 11, 2026
          </p>
        </div>

        <div className="grid gap-2 mb-16">
          <Section icon={CheckCircle} title="Acceptance of Terms">
            <p>
              By accessing or using PGBuddy, you agree to comply with and be
              bound by these Terms of Service. If you do not agree to these
              terms, you may not use our services. We have the right to modify
              these terms at any time, and your continued use of the platform
              constitutes acceptance of those changes.
            </p>
          </Section>

          <Section icon={AlertTriangle} title="User Responsibilities">
            <p>
              Users are responsible for maintaining the confidentiality of their
              account. You agree to:
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1 marker:text-slate-400">
              <li>Provide accurate, current, and complete information.</li>
              <li>
                Not engage in fraudulent activity, harassment, or impersonation.
              </li>
            </ul>
          </Section>

          <Section icon={CreditCard} title="Bookings & Payments">
            <p>PGBuddy acts as a bridge between PG owners and tenants.</p>
            <ul className="list-disc ml-5 mt-2 space-y-1 marker:text-slate-400">
              <li>
                <strong className="text-slate-800 font-semibold">Fees:</strong>{" "}
                We may charge a service fee for platform usage, which will be
                disclosed before booking.
              </li>
              <li>
                <strong className="text-slate-800 font-semibold">
                  Payments:
                </strong>{" "}
                Online payments are processed securely. "Pay at Property"
                agreements are solely between the user and owner.
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

          <div className="mt-8 text-center text-slate-500 text-sm font-medium">
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
