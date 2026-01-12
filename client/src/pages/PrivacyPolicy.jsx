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
  <div className="group bg-white/50 hover:bg-white backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 mb-6">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform duration-300 shrink-0">
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

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative font-[Poppins] overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 animate-pulse delay-700" />
      </div>

      <div className="pt-24 md:pt-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 group flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-white/50 rounded-full shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-sky-600"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-sky-50 rounded-2xl mb-6 shadow-inner">
            <Shield className="w-8 h-8 text-sky-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
              Policy
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Your trust is our priority. We are committed to protecting your
            personal data and ensuring transparency in how we handle it.
          </p>
          <p className="text-sm font-semibold text-sky-600 mt-4 uppercase tracking-wider bg-sky-50 inline-block px-3 py-1 rounded-full">
            Last Updated: January 11, 2026
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-2 mb-20">
          <Section icon={Eye} title="Information We Collect">
            <p>
              We collect information you provide directly to us when you create
              an account, list a property, book a room, or communicate with us.
              This includes:
            </p>
            <ul className="list-disc ml-5 marker:text-sky-500">
              <li>
                <strong>Identity Data:</strong> Name, username, or similar
                identifier.
              </li>
              <li>
                <strong>Contact Data:</strong> Billing address, email address,
                and telephone numbers.
              </li>
              <li>
                <strong>Transaction Data:</strong> Details about payments to and
                from you.
              </li>
            </ul>
          </Section>

          <Section icon={Server} title="How We Use Your Data">
            <p>
              We use your data to provide a seamless booking experience and
              ensure platform safety:
            </p>
            <ul className="list-disc ml-5 marker:text-sky-500">
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

          <div className="mt-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-8 md:p-10 text-white shadow-xl shadow-sky-200 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Mail className="w-6 h-6" /> Have Questions?
                </h3>
                <p className="text-sky-100 max-w-md">
                  If you have any concerns about your privacy or this policy,
                  our legal team is here to help.
                </p>
              </div>
              <a
                href="mailto:calvinatakasi@outlook.com"
                className="bg-white text-sky-700 px-6 py-3 rounded-xl font-bold hover:bg-sky-50 transition-colors shadow-lg"
              >
                Contact Legal Team
              </a>
            </div>

            {/* Decor */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
