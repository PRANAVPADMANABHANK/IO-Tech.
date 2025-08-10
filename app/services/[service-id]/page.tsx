"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";
import { apiService, type Service } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import Link from "next/link";

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params["service-id"] as string;
  
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const serviceData = await apiService.getService(serviceId);
        setService(serviceData);
        setError(null);
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Failed to load service details. Please try again later.');
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <SearchModal />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-primary mx-auto"></div>
            <p className="mt-4 text-brown-secondary">Loading service details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen">
        <Header />
        <SearchModal />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error || 'Service not found'}</p>
            <Link href="/services">
              <Button>Back to Services</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <SearchModal />
      
      {/* Service Hero Section */}
      <section className="bg-brown-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/services" className="inline-flex items-center text-brown-light hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-brown-light">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-2xl text-brown-dark">Service Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-lg max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: service.content }} />
                    </div>
                  </CardContent>
                </Card>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl text-brown-dark">Key Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-brown-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-brown-secondary">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-xl text-brown-dark">Service Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Tag className="w-5 h-5 text-brown-primary" />
                      <span className="text-brown-secondary">Service Type</span>
                    </div>
                    <p className="text-brown-dark font-medium">{service.title}</p>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <Button className="w-full bg-brown-primary hover:bg-brown-secondary text-white">
                        Schedule Consultation
                      </Button>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-brown-secondary mb-2">Need immediate assistance?</p>
                      <Button variant="outline" className="w-full border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white">
                        Contact Us
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
