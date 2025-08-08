import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SearchModal from "@/components/SearchModal"

interface ServicePageProps {
  params: {
    'service-id': string
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const serviceId = params['service-id']

  // Mock service data - in real app this would come from Strapi CMS
  const serviceData = {
    id: serviceId,
    title: "Legal Consultation Services",
    description: "Comprehensive legal consultation services tailored to your specific needs. Our experienced team provides expert guidance across all areas of law.",
    content: `
      <p>Our legal consultation services are designed to provide you with expert guidance and strategic advice for all your legal matters. We understand that every case is unique, and we take the time to thoroughly analyze your situation before providing recommendations.</p>
      
      <h3>What We Offer</h3>
      <ul>
        <li>Initial case evaluation and strategy development</li>
        <li>Comprehensive legal analysis and risk assessment</li>
        <li>Document review and preparation</li>
        <li>Negotiation support and representation</li>
        <li>Ongoing legal counsel and support</li>
      </ul>
      
      <h3>Our Process</h3>
      <p>We follow a systematic approach to ensure you receive the best possible legal advice:</p>
      <ol>
        <li>Initial consultation to understand your needs</li>
        <li>Thorough case analysis and research</li>
        <li>Strategy development and planning</li>
        <li>Implementation and ongoing support</li>
      </ol>
    `,
    features: [
      "Expert legal analysis",
      "Strategic planning",
      "Risk assessment",
      "Document preparation",
      "Ongoing support"
    ]
  }

  return (
    <div className="min-h-screen">
      <Header />
      <SearchModal />
      
      {/* Service Hero Section */}
      <section className="bg-brown-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {serviceData.title}
            </h1>
            <p className="text-lg md:text-xl text-brown-light leading-relaxed">
              {serviceData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: serviceData.content }}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Features */}
              <div className="bg-brown-light rounded-lg p-6">
                <h3 className="text-xl font-bold text-brown-dark mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {serviceData.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-brown-secondary">
                      <div className="w-2 h-2 bg-brown-primary rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-brown-primary rounded-lg p-6 text-primary-foreground">
                <h3 className="text-xl font-bold mb-4">Get Started</h3>
                <p className="text-brown-light mb-6">
                  Ready to get expert legal consultation? Contact us today to schedule your initial consultation.
                </p>
                <button className="w-full bg-primary-foreground text-brown-primary hover:bg-brown-light font-semibold py-3 px-6 rounded-lg transition-colors">
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
