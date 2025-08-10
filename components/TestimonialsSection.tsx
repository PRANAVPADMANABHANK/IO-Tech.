"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useTestimonials } from "@/hooks/use-strapi-data";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { data: testimonials, loading, error, refetch } = useTestimonials();

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <section className="py-20 bg-brown-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-brown-light">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-brown-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-300 mb-4">{error}</p>
            <Button onClick={refetch}>Retry</Button>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-brown-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-brown-light text-lg">No testimonials available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-brown-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What our clients are saying
          </h2>
          <p className="text-lg text-brown-light max-w-3xl mx-auto leading-relaxed">
            Our clients praise our firm's professionalism, expertise, and dedication to achieving positive outcomes. 
            Read what they have to say about their experience working with our legal team.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-brown-secondary rounded-lg p-8 md:p-12 relative">
            {/* Client Photo */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary-foreground/20">
                  <img
                    src={testimonials[currentTestimonial].image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"}
                    alt={testimonials[currentTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Stars */}
                <div className="flex justify-center md:justify-start mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl mb-6 leading-relaxed italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                {/* Client Info */}
                <div>
                  <h4 className="text-xl font-bold text-primary-foreground">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-brown-light">
                    {testimonials[currentTestimonial].role}
                  </p>
                  {testimonials[currentTestimonial].company && (
                    <p className="text-brown-light text-sm">
                      {testimonials[currentTestimonial].company}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation */}
            {testimonials.length > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-brown-primary"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentTestimonial === index ? 'bg-primary-foreground' : 'bg-primary-foreground/30'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-brown-primary"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;