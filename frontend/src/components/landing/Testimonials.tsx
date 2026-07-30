import { motion } from 'motion/react'

const companies = [
  'Microsoft', 'Google', 'Notion', 'Stripe', 'OpenAI', 'Vercel',
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Senior Data Analyst',
    company: 'FinTech Labs',
    industry: 'Finance',
    text: 'DocMind AI reduced our document review time by more than 80%. The inline citations make every answer trustworthy.',
    rating: 5,
    initials: 'SC',
  },
  {
    name: 'Dr. Emily Park',
    role: 'Research Director',
    company: 'BioMed Institute',
    industry: 'Healthcare',
    text: 'We analyze hundreds of clinical papers monthly. DocMind surfaces relevant findings with page-level accuracy that our team can verify instantly.',
    rating: 5,
    initials: 'EP',
  },
  {
    name: 'Marcus Johnson',
    role: 'Legal Counsel',
    company: 'Pierce & Associates',
    industry: 'Legal',
    text: "Contract review used to take days. Now I ask questions in plain English and get cited answers from thousands of pages in seconds.",
    rating: 5,
    initials: 'MJ',
  },
  {
    name: 'Alex Rivera',
    role: 'Head of Research',
    company: 'Nova Education',
    industry: 'Education',
    text: 'Our research team uses DocMind daily for literature reviews. The confidence scores help us prioritize which sources to read first.',
    rating: 5,
    initials: 'AR',
  },
  {
    name: 'Priya Sharma',
    role: 'Enterprise Architect',
    company: 'CloudScale',
    industry: 'Enterprise',
    text: 'We deployed DocMind across our entire knowledge management stack. The API-first design made integration seamless.',
    rating: 5,
    initials: 'PS',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 * i }}
          className={`text-sm ${i < rating ? 'text-[#FFD700]' : 'text-white/[0.06]'}`}
          style={{
            filter: i < rating ? 'drop-shadow(0 0 4px rgba(255,215,0,0.3))' : 'none',
          }}
        >
          ★
        </motion.span>
      ))}
    </div>
  )
}

function Avatar({ initials }: { initials: string }) {
  const hash = initials.charCodeAt(0) + initials.charCodeAt(1)
  const hue = hash % 360
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0"
      style={{
        background: `hsla(${hue}, 40%, 50%, 0.15)`,
        border: `1px solid hsla(${hue}, 40%, 60%, 0.2)`,
        color: `hsla(${hue}, 50%, 70%, 0.9)`,
      }}
    >
      {initials}
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function Testimonials() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-black via-[#030712] to-[#060b18] py-28 sm:py-36">
      <div className="absolute top-[15%] right-[10%] w-[400px] h-[400px] bg-[#3054ff]/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] bg-indigo-600/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.08]">
            Trusted by Teams Building with AI
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            See how teams use DocMind AI to analyze documents faster and make better decisions.
          </p>
        </motion.div>

        {/* Company wordmarks */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-16 sm:mb-20"
        >
          {companies.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="text-sm sm:text-base font-semibold tracking-tight text-white/[0.08] hover:text-white/[0.15] transition-colors duration-300 cursor-default"
              style={{ fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, sans-serif" }}
            >
              {name}
            </motion.span>
          ))}
        </motion.div>

        {/* Testimonial grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* ——— Top left: Finance ——— */}
          <motion.div
            variants={cardVariants}
            className="group relative rounded-[24px] p-7 sm:p-8 flex flex-col transition-all duration-500"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 8px 32px -12px rgba(0,0,0,0.5)',
            }}
            whileHover={{
              y: -4,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            }}
          >
            <div
              className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(48,84,255,0.06) 0%, transparent 70%)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
              }}
            />
            <div className="relative z-10 flex flex-col flex-1">
              <StarRating rating={testimonials[0].rating} />
              <p className="mt-4 text-sm text-white/65 leading-relaxed flex-1">
                &ldquo;{testimonials[0].text}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar initials={testimonials[0].initials} />
                <div>
                  <p className="text-sm font-medium text-white/80">{testimonials[0].name}</p>
                  <p className="text-[12px] text-white/40">
                    {testimonials[0].role} &middot; {testimonials[0].company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ——— Top right: Healthcare ——— */}
          <motion.div
            variants={cardVariants}
            className="group relative rounded-[24px] p-7 sm:p-8 flex flex-col transition-all duration-500"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 8px 32px -12px rgba(0,0,0,0.5)',
            }}
            whileHover={{
              y: -4,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            }}
          >
            <div
              className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(48,84,255,0.06) 0%, transparent 70%)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
              }}
            />
            <div className="relative z-10 flex flex-col flex-1">
              <StarRating rating={testimonials[1].rating} />
              <p className="mt-4 text-sm text-white/65 leading-relaxed flex-1">
                &ldquo;{testimonials[1].text}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar initials={testimonials[1].initials} />
                <div>
                  <p className="text-sm font-medium text-white/80">{testimonials[1].name}</p>
                  <p className="text-[12px] text-white/40">
                    {testimonials[1].role} &middot; {testimonials[1].company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom row: 3 smaller cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
        >
          {testimonials.slice(2).map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="group relative rounded-[24px] p-6 sm:p-7 flex flex-col transition-all duration-500"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 8px 32px -12px rgba(0,0,0,0.5)',
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              <div
                className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(48,84,255,0.06) 0%, transparent 70%)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
                }}
              />
              <div className="relative z-10 flex flex-col flex-1">
                <StarRating rating={t.rating} />
                <p className="mt-3.5 text-sm text-white/65 leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-2.5">
                  <Avatar initials={t.initials} />
                  <div>
                    <p className="text-sm font-medium text-white/80">{t.name}</p>
                    <p className="text-[11px] text-white/40">
                      {t.role} &middot; {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
