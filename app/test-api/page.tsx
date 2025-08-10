import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SearchModal from "@/components/SearchModal"
import StrapiDataDemo from "@/components/StrapiDataDemo"
import SearchTest from "@/components/SearchTest"

export default function TestApiPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <SearchModal />
      
      {/* Test API Hero Section */}
      <section className="bg-brown-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Strapi Data Integration Test
            </h1>
            <p className="text-lg md:text-xl text-brown-light">
              Test all the data fetching capabilities and forms
            </p>
          </div>
        </div>
      </section>

      {/* Search Test Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-brown-dark mb-8 text-center">Search Functionality Test</h2>
            <SearchTest />
          </div>
        </div>
      </section>

      {/* Strapi Data Demo */}
      <StrapiDataDemo />

      <Footer />
    </div>
  )
}
