import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SearchModal from "@/components/SearchModal"

export default function BlogsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <SearchModal />
      
      {/* Blogs Hero Section */}
      <section className="bg-brown-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Blog
            </h1>
            <p className="text-lg md:text-xl text-brown-light">
              Latest insights and legal updates
            </p>
          </div>
        </div>
      </section>

      {/* Blogs Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Blog Post 1 */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                  alt="Blog Post"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brown-dark mb-2">
                    Understanding Corporate Law
                  </h3>
                  <p className="text-brown-secondary mb-4">
                    A comprehensive guide to corporate law and its implications for businesses.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-brown-light">March 15, 2024</span>
                    <button className="text-brown-primary hover:text-brown-secondary font-medium">
                      Read More
                    </button>
                  </div>
                </div>
              </article>

              {/* Blog Post 2 */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b792?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                  alt="Blog Post"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brown-dark mb-2">
                    Intellectual Property Rights
                  </h3>
                  <p className="text-brown-secondary mb-4">
                    Protecting your intellectual property in the digital age.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-brown-light">March 10, 2024</span>
                    <button className="text-brown-primary hover:text-brown-secondary font-medium">
                      Read More
                    </button>
                  </div>
                </div>
              </article>

              {/* Blog Post 3 */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                  alt="Blog Post"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brown-dark mb-2">
                    Legal Consultation Guide
                  </h3>
                  <p className="text-brown-secondary mb-4">
                    How to prepare for your first legal consultation.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-brown-light">March 5, 2024</span>
                    <button className="text-brown-primary hover:text-brown-secondary font-medium">
                      Read More
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
