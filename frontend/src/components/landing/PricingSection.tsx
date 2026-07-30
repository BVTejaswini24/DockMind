import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: '/month',
    desc: 'Perfect for students and personal projects.',
    features: [
      'Upload up to 10 documents',
      'AI Chat',
      'Basic citations',
      'Community support',
    ],
    cta: 'Get Started',
    to: '/signup',
    popular: false,
  },
  {
    name: 'Pro',
    price: '₹999',
    period: '/month',
    desc: 'Best for professionals and growing teams.',
    features: [
      'Unlimited documents',
      'Faster retrieval',
      'Multi-document chat',
      'Advanced citations',
      'Confidence scores',
      'Priority support',
    ],
    cta: 'Start Pro',
    to: '/signup',
    popular: true,
    badge: 'MOST POPULAR',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For organizations with advanced needs.',
    features: [
      'Unlimited workspace',
      'Team collaboration',
      'API Access',
      'SSO',
      'Analytics',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    to: '/contact',
    popular: false,
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function PricingSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#060b18] via-[#030712] to-black py-28 sm:py-36">
      <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] bg-[#3054ff]/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[15%] w-[350px] h-[350px] bg-indigo-600/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
            Simple Pricing
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            Start free. Upgrade when your AI workspace grows.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`group relative w-full lg:w-[340px] rounded-[24px] p-8 sm:p-9 flex flex-col transition-all duration-500 ${
                plan.popular ? 'lg:-mt-4 lg:pb-10' : ''
              }`}
              style={{
                background: plan.popular
                  ? 'linear-gradient(135deg, rgba(48,84,255,0.06) 0%, rgba(255,255,255,0.04) 100%)'
                  : 'rgba(255,255,255,0.04)',
                border: plan.popular
                  ? '1px solid rgba(48,84,255,0.2)'
                  : '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                boxShadow: plan.popular
                  ? '0 0 0 1px rgba(48,84,255,0.06), 0 0 60px -16px rgba(48,84,255,0.15), 0 8px 32px -12px rgba(0,0,0,0.5)'
                  : '0 0 0 1px rgba(255,255,255,0.02), 0 8px 32px -12px rgba(0,0,0,0.5)',
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: plan.popular
                    ? 'radial-gradient(ellipse at 50% 0%, rgba(48,84,255,0.12) 0%, transparent 70%)'
                    : 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)',
                  boxShadow: plan.popular
                    ? '0 0 40px -8px rgba(48,84,255,0.2), inset 0 0 0 1px rgba(48,84,255,0.1)'
                    : 'inset 0 0 0 1px rgba(255,255,255,0.04)',
                }}
              />

              <div className="relative z-10 flex flex-col flex-1">
                {/* Badge */}
                {plan.badge && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="mb-5"
                  >
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.06em]"
                      style={{
                        background: 'rgba(48,84,255,0.12)',
                        border: '1px solid rgba(48,84,255,0.2)',
                        color: 'rgba(48,84,255,0.9)',
                      }}
                    >
                      {plan.badge}
                    </span>
                  </motion.div>
                )}

                {/* Name & Price */}
                <h3 className="text-xl font-semibold text-white mb-1 tracking-tight">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-white/30">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-white/45 mb-8 leading-relaxed">
                  {plan.desc}
                </p>

                {/* Features */}
                <ul className="space-y-3.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-sm text-white/60"
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          plan.popular
                            ? 'bg-[#3054ff]/12 border border-[#3054ff]/20'
                            : 'bg-white/[0.04] border border-white/[0.06]'
                        }`}
                      >
                        <Check
                          className={`w-2.5 h-2.5 ${
                            plan.popular ? 'text-[#3054ff]' : 'text-white/30'
                          }`}
                        />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to={plan.to}
                  className={`group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                    plan.popular
                      ? 'bg-[#3054ff] text-white hover:shadow-[0_0_24px_-4px_rgba(48,84,255,0.4)]'
                      : 'border border-white/[0.08] text-white/60 hover:border-white/[0.15] hover:text-white/80'
                  }`}
                >
                  <span className="relative z-10">{plan.cta}</span>
                  {!plan.popular && (
                    <span className="relative z-10 group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  )}
                  {plan.popular && (
                    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(48,84,255,0.2) 0%, transparent 100%)',
                      }}
                    />
                  )}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
