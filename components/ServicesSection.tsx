import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Shield, Home, Users, Car, Globe } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Scale,
      title: "Corporate Law",
      description: "Comprehensive legal solutions for businesses of all sizes, including contract negotiations, mergers & acquisitions, and compliance matters.",
      features: ["Contract Review", "Business Formation", "Mergers & Acquisitions", "Compliance"]
    },
    {
      icon: Shield,
      title: "Criminal Defense",
      description: "Experienced criminal defense representation with a track record of successful outcomes in both state and federal courts.",
      features: ["DUI Defense", "White Collar Crimes", "Federal Cases", "Appeals"]
    },
    {
      icon: Home,
      title: "Real Estate Law",
      description: "Full-service real estate legal support for residential and commercial transactions, disputes, and property matters.",
      features: ["Property Transactions", "Title Issues", "Zoning Law", "Real Estate Litigation"]
    },
    {
      icon: Users,
      title: "Family Law",
      description: "Compassionate and skilled representation in all family law matters with focus on protecting your interests and children.",
      features: ["Divorce Proceedings", "Child Custody", "Adoption", "Prenuptial Agreements"]
    },
    {
      icon: Car,
      title: "Personal Injury",
      description: "Dedicated advocacy for injury victims to ensure maximum compensation for medical expenses, lost wages, and pain & suffering.",
      features: ["Auto Accidents", "Slip & Fall", "Medical Malpractice", "Wrongful Death"]
    },
    {
      icon: Globe,
      title: "Immigration Law",
      description: "Expert immigration services to help individuals and families navigate complex immigration processes and achieve their goals.",
      features: ["Visa Applications", "Citizenship", "Green Cards", "Deportation Defense"]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brown-dark mb-6">
            Legal Consultation Services
          </h2>
          <p className="text-lg text-brown-secondary max-w-3xl mx-auto leading-relaxed">
            Our comprehensive legal services are designed to protect your interests and provide expert guidance 
            across multiple areas of law. We deliver results-driven solutions tailored to your specific needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="border-brown-primary/20 hover:shadow-lg transition-shadow duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-brown-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-brown-primary group-hover:text-white transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-brown-primary group-hover:text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-brown-dark">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-brown-secondary mb-4 leading-relaxed">
                  {service.description}
                </CardDescription>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-brown-secondary">
                      <div className="w-2 h-2 bg-brown-primary rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-brown-primary rounded-lg p-8 md:p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Corporate Legal Consultation
          </h3>
          <p className="text-lg text-brown-light mb-8 max-w-2xl mx-auto">
            Get expert legal advice tailored to your business needs. Our corporate law specialists 
            provide strategic guidance to help your business thrive while ensuring full compliance.
          </p>
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-primary-foreground">Individual Legal Consultation</h4>
            <ul className="text-brown-light space-y-2 max-w-md mx-auto">
              <li>• Comprehensive case evaluation and strategy development</li>
              <li>• Personalized legal solutions for complex matters</li>
              <li>• Ongoing support throughout the legal process</li>
              <li>• Expert representation in negotiations and court proceedings</li>
            </ul>
            <Button 
              size="lg"
              className="bg-primary-foreground text-brown-primary hover:bg-brown-light font-semibold px-8 py-3 mt-6"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;