import { motion } from 'framer-motion'

interface UserMessageProps {
  content: string
}

export function UserMessage({ content }: UserMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex justify-end"
    >
      <div className="inline-block px-4 py-2.5 rounded-2xl bg-[#3054ff] text-white text-sm leading-relaxed max-w-[75%]">
        {content}
      </div>
    </motion.div>
  )
}
