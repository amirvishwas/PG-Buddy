import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Server,
  Cookie,
  Mail,
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

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Your trust is our priority. We are committed to protecting your
            personal data and ensuring transparency in how we handle it.
          </p>
          <p className="text-xs font-medium text-slate-400 mt-6 inline-block bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
            Last Updated: January 11, 2026
          </p>
        </div>

        <div className="grid gap-2 mb-16">
          <Section icon={Eye} title="Information We Collect">
            <p>
              We collect information you provide directly to us when you create
              an account, list a property, book a room, or communicate with us.
              This includes:
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1 marker:text-slate-400">
              <li>
                <strong className="text-slate-800 font-semibold">
                  Identity Data:
                </strong>{" "}
                Name, username, or similar identifier.
              </li>
              <li>
                <strong className="text-slate-800 font-semibold">
                  Contact Data:
                </strong>{" "}
                Billing address, email address, and telephone numbers.
              </li>
              <li>
                <strong className="text-slate-800 font-semibold">
                  Transaction Data:
                </strong>{" "}
                Details about payments to and from you.
              </li>
            </ul>
          </Section>

          <Section icon={Server} title="How We Use Your Data">
            <p>
              We use your data to provide a seamless booking experience and
              ensure platform safety:
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1 marker:text-slate-400">
              <li>To register you as a new customer.</li>
              <li>
                To process and deliver your bookings including managing
                payments.
              </li>
              <li>
                To verify the legitimacy of PG listings and prevent fraud.
              </li>
            </ul>
          </Section>

          <Section icon={Lock} title="Data Security">
            <p>
              We have put in place appropriate security measures to prevent your
              personal data from being accidentally lost, used, or accessed in
              an unauthorized way. We limit access to your personal data to
              those employees and partners who have a business need to know.
            </p>
          </Section>

          <Section icon={Cookie} title="Cookies & Tracking">
            <p>
              We use cookies to distinguish you from other users of our website.
              This helps us to provide you with a good experience when you
              browse our website and also allows us to improve our site. You can
              set your browser to refuse all or some browser cookies.
            </p>
          </Section>
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 sm:p-10 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-white mb-4 mx-auto md:mx-0">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Have Questions?
              </h3>
              <p className="text-sm sm:text-base text-slate-400 max-w-md">
                If you have any concerns about your privacy or this policy, our
                legal team is here to help.
              </p>
            </div>
            <a
              href="mailto:calvinatakasi@outlook.com"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors active:scale-95 shrink-0"
            >
              <Mail className="w-4 h-4" />
              Contact Legal Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
