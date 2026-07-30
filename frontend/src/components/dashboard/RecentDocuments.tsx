import { motion } from 'framer-motion'
import { FileText, FileSpreadsheet, File, FileImage } from 'lucide-react'
import { Link } from 'react-router-dom'

const docs = [
  { name: 'Q4_Financial_Report.pdf', type: 'PDF', size: '2.4 MB', date: '2 hours ago', icon: FileText },
  { name: 'Research_Paper_2024.pdf', type: 'PDF', size: '4.1 MB', date: 'Yesterday', icon: FileText },
  { name: 'Meeting_Notes.docx', type: 'DOCX', size: '0.8 MB', date: '2 days ago', icon: File },
  { name: 'Product_Roadmap.xlsx', type: 'CSV', size: '1.2 MB', date: '3 days ago', icon: FileSpreadsheet },
  { name: 'Architecture_Diagram.png', type: 'PNG', size: '3.5 MB', date: '5 days ago', icon: FileImage },
]

export default function RecentDocuments() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white">Recent Documents</h2>
        <Link to="/documents" className="text-xs text-white/60 hover:text-white transition-colors">View all</Link>
      </div>

      <div className="space-y-2">
        {docs.map((doc, i) => (
          <motion.div
            key={doc.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all cursor-pointer group"
          >
            <doc.icon className="w-4 h-4 text-white/40 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-sm text-white/80 truncate block group-hover:text-white transition-colors">{doc.name}</span>
            </div>
            <span className="text-[11px] text-white/40 flex-shrink-0">{doc.date}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
