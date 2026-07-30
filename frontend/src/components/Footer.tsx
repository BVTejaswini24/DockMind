import { Brain, Github, Twitter, Linkedin, Mail } from 'lucide-react'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Changelog', 'Documentation'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
  Resources: ['API Reference', 'Guides', 'Status', 'Community'],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 group mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Doc<span className="gradient-text">Mind</span>
              </span>
            </a>
            <p className="text-sm text-dark-400 leading-relaxed max-w-xs">
              AI-powered document intelligence. Upload, ask, understand.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-dark-500 hover:text-dark-300 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-dark-500 hover:text-dark-300 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-dark-500 hover:text-dark-300 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-dark-500 hover:text-dark-300 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-dark-400 hover:text-dark-200 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dark-500">
            &copy; {new Date().getFullYear()} DocMind AI. All rights reserved.
          </p>
          <p className="text-sm text-dark-500">
            Powered by LangChain, ChromaDB &amp; LLMs
          </p>
        </div>
      </div>
    </footer>
  )
}
