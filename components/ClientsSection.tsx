"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslations } from '@/hooks/use-translations';
import { useClients, useTestimonials } from '@/hooks/use-strapi-data';

const ClientsSection = () => {
  const { t, currentLanguage } = useTranslations();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { data: clients, loading: clientsLoading, error: clientsError, refetch: refetchClients } = useClients();
  const { data: testimonials, loading: testimonialsLoading, error: testimonialsError, refetch: refetchTestimonials } = useTestimonials();

  const loading = clientsLoading || testimonialsLoading;
  const error = clientsError || testimonialsError;

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-primary mx-auto"></div>
            <p className="mt-4 text-brown-secondary">Loading clients and testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <div className="space-x-4">
              <Button onClick={refetchClients}>Retry Clients</Button>
              <Button onClick={refetchTestimonials}>Retry Testimonials</Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brown-dark mb-6">
            {currentLanguage === 'en' ? 'Our Clients' : 'عملاؤنا'}
          </h2>
          <p className="text-lg text-brown-secondary max-w-3xl mx-auto leading-relaxed">
            {currentLanguage === 'en' 
              ? 'Trusted by leading companies and organizations across various industries'
              : 'موثوق بنا من قبل الشركات والمؤسسات الرائدة في مختلف الصناعات'
            }
          </p>
        </div>

        {/* Client Logos */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {clients.map((client) => (
              <div key={client.id} className="flex flex-col items-center group">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-lg flex items-center justify-center p-4 group-hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <p className="text-sm text-brown-secondary mt-2 text-center">
                  {client.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="bg-brown-light rounded-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-brown-dark mb-4">
                {currentLanguage === 'en' ? 'What Our Clients Say' : 'ماذا يقول عملاؤنا'}
              </h3>
            </div>

            <div className="relative">
            <div className="flex items-center justify-center">
              <div className="max-w-4xl mx-auto text-center">
                <Quote className="w-12 h-12 text-brown-primary mx-auto mb-6" />
                <blockquote className="text-xl md:text-2xl text-brown-dark mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-4">
                  {testimonials[currentTestimonial].image && (
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div className="text-left">
                    <p className="font-semibold text-brown-dark">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-brown-secondary">
                      {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center mt-4">
                  {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, index) => (
                    <svg
                      key={index}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white"
                aria-label={t('common.previous')}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentTestimonial === index ? 'bg-brown-primary' : 'bg-brown-primary/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white"
                aria-label={t('common.next')}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default ClientsSection;
