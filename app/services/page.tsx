import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SearchModal from "@/components/SearchModal"
import ServicesSection from "@/components/ServicesSection"

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <SearchModal />
      
      {/* Services Hero Section */}
      <section className="bg-brown-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-brown-light">
              Comprehensive legal solutions for all your needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      <Footer />
    </div>
  )
}
