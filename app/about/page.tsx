import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SearchModal from "@/components/SearchModal"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <SearchModal />
      
      {/* About Hero Section */}
      <section className="bg-brown-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Us
            </h1>
            <p className="text-lg md:text-xl text-brown-light">
              Professional legal services with decades of experience
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-brown-dark mb-6">
                  Our Story
                </h2>
                <p className="text-brown-secondary mb-6">
                  Founded with a commitment to excellence and client satisfaction, our law firm has been serving clients for over two decades. We specialize in providing comprehensive legal solutions across various practice areas.
                </p>
                <p className="text-brown-secondary mb-6">
                  Our team of experienced attorneys is dedicated to understanding your unique legal needs and providing personalized solutions that protect your interests and achieve your goals.
                </p>
                <p className="text-brown-secondary">
                  We believe in building long-term relationships with our clients based on trust, transparency, and results.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                  alt="About Us"
                  className="rounded-lg shadow-lg w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
