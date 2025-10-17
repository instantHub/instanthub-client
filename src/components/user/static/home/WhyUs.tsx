import React, { memo } from "react";
import { LightbulbIcon, Truck, Tag, ShieldCheck } from "lucide-react";

const reasons = [
  {
    key: "instant",
    Icon: LightbulbIcon,
    title: "Instant Cash Payments",
    desc: "Say goodbye to waiting — get secure on-the-spot cash payments for your devices.",
    accent: "from-purple-600 to-blue-500",
  },
  {
    key: "convenience",
    Icon: Truck,
    title: "Pickup Convenience",
    desc: "We come to you — schedule a pickup and skip the travel and queues. Fast, simple and contact-free.",
    accent: "from-emerald-500 to-teal-400",
  },
  {
    key: "price",
    Icon: Tag,
    title: "Competitive Prices",
    desc: "We evaluate fairly and offer great prices — maximizing value when you sell your gadgets.",
    accent: "from-orange-400 to-rose-500",
  },
  {
    key: "secure",
    Icon: ShieldCheck,
    title: "Secure Transactions",
    desc: "Privacy-first process with encrypted communications and verified pickup agents for peace of mind.",
    accent: "from-sky-500 to-indigo-500",
  },
];

const WhyUs: React.FC = () => {
  return (
    <section
      aria-labelledby="why-us-title"
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-12"
    >
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2
          id="why-us-title"
          className="text-xl lg:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900"
        >
          Why choose InstantHub?
        </h2>
        <p className="text-sm lg:text-lg mt-3 text-gray-600">
          Fast payouts, convenient pickup, competitive offers and secure
          transactions — built to make selling your electronics effortless.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r, idx) => {
          const Icon = r.Icon;
          return (
            <article
              key={r.key}
              className="relative bg-white dark:bg-slate-800 rounded-2xl border border-transparent hover:border-gray-100 hover:shadow-lg transition-transform transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none overflow-hidden"
              style={{ willChange: "transform, box-shadow, opacity" }}
              aria-labelledby={`why-${r.key}-title`}
            >
              {/* Accent stripe */}
              <div
                className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${r.accent}`}
                aria-hidden="true"
              />

              <div className="p-6 md:p-7 lg:p-8">
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-lg shadow-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2))",
                    }}
                  >
                    <div
                      className={`rounded-lg p-2 bg-gradient-to-br ${r.accent} text-white shadow-inner`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3
                      id={`why-${r.key}-title`}
                      className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                    >
                      {r.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {r.desc}
                    </p>
                  </div>
                </div>

                {/* subtle decorative footer */}
                <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                  <span className="inline-block w-8 h-1 rounded bg-gray-200" />
                  <span>Trusted process • Quick verification</span>
                </div>
              </div>

              {/* subtle fade-in stagger using inline delay */}
              <style>{`
                @media (prefers-reduced-motion: no-preference) {
                  .why-card-${idx} {
                    animation: fadeUp 500ms ease forwards;
                    animation-delay: ${idx * 80}ms;
                    opacity: 0;
                    transform: translateY(6px);
                  }
                }
                @keyframes fadeUp {
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>

              {/* attach class for animation */}
              <div
                className={`absolute inset-0 pointer-events-none why-card-${idx}`}
              />
            </article>
          );
        })}
      </div>

      {/* CTA row */}
      <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-transparent hover:border-purple-100 transition-colors">
        <div>
          <h4 className="text-lg md:text-xl font-semibold text-gray-900">
            Ready to sell? Get an instant quote now.
          </h4>
          <p className="mt-1 text-sm text-gray-600">
            Enter your device details and get an assured price in minutes.
          </p>
        </div>

        <div className="flex gap-3">
          <a
            role="button"
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow hover:scale-[1.02] transition-transform"
          >
            Sell Now
          </a>

          <a className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 text-gray-800 border border-gray-100 hover:bg-white transition">
            How it works
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(WhyUs);
