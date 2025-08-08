import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import ServicesSection from "@/components/ServicesSection"
import TeamSection from "@/components/TeamSection"
import ClientsSection from "@/components/ClientsSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import Footer from "@/components/Footer"
import SearchModal from "@/components/SearchModal"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <SearchModal />
      <HeroSection />
      <ServicesSection />
      <TeamSection />
      <ClientsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}
