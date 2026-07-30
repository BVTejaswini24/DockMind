import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import HowItWorks from '../components/landing/HowItWorks'
import AIDemo from '../components/landing/Pricing'
import PricingSection from '../components/landing/PricingSection'
import Testimonials from '../components/landing/Testimonials'
import FAQ from '../components/landing/FAQ'
import Footer from '../components/landing/Footer'

export default function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AIDemo />
        <PricingSection />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
