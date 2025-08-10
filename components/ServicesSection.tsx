"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Shield, Home, Users, Car, Globe } from "lucide-react";
import { useServices } from "@/hooks/use-strapi-data";
import { useTranslations } from "@/hooks/use-translations";
import Link from "next/link";

// Icon mapping for services
const iconMap: { [key: string]: any } = {
  'corporate-law': Scale,
  'criminal-defense': Shield,
  'real-estate': Home,
  'family-law': Users,
  'personal-injury': Car,
  'immigration': Globe,
  'default': Scale
};

const ServicesSection = () => {
  const { t, currentLanguage } = useTranslations();
  const { data: services, loading, error, refetch } = useServices(currentLanguage);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-primary mx-auto"></div>
            <p className="mt-4 text-brown-secondary">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={refetch}>Retry</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brown-dark mb-6">
            {t('services.title')}
          </h2>
          <p className="text-lg text-brown-secondary max-w-3xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service) => {
              const IconComponent = iconMap[service.slug] || iconMap.default;
              return (
                <Link key={service.id} href={`/services/${service.slug}`}>
                  <Card className="border-brown-primary/20 hover:shadow-lg transition-all duration-300 group cursor-pointer hover:scale-105">
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto w-16 h-16 bg-brown-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-brown-primary group-hover:text-white transition-colors duration-300">
                        <IconComponent className="w-8 h-8 text-brown-primary group-hover:text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-brown-dark group-hover:text-brown-primary transition-colors">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-brown-secondary mb-4 leading-relaxed">
                        {service.description}
                      </CardDescription>
                      {service.features && service.features.length > 0 && (
                        <ul className="space-y-2">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-brown-secondary">
                              <div className="w-2 h-2 bg-brown-primary rounded-full mr-3 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                          {service.features.length > 3 && (
                            <li className="text-sm text-brown-primary font-medium text-center mt-2">
                              +{service.features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      )}
                      <div className="mt-4 text-center">
                        <span className="text-brown-primary font-medium group-hover:text-brown-secondary transition-colors">
                          Learn More →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-brown-secondary text-lg">No services available at the moment.</p>
          </div>
        )}

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