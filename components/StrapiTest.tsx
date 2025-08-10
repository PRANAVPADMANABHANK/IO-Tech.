"use client";

import { useState, useEffect } from "react";
import { apiService } from "@/lib/api";

const StrapiTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>("Testing...");
  const [services, setServices] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test connection
        const isConnected = await apiService.testConnection();
        setConnectionStatus(isConnected ? "✅ Connected" : "❌ Failed");

        if (isConnected) {
          // Fetch data
          const [servicesData, teamData, testimonialsData] = await Promise.all([
            apiService.getServices(),
            apiService.getTeamMembers(),
            apiService.getTestimonials()
          ]);

          setServices(servicesData);
          setTeamMembers(teamData);
          setTestimonials(testimonialsData);
        }
      } catch (error) {
        console.error("Test failed:", error);
        setConnectionStatus("❌ Error: " + (error as Error).message);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Strapi Connection Test</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Connection Status:</h3>
        <p className={`text-lg ${connectionStatus.includes("✅") ? "text-green-600" : "text-red-600"}`}>
          {connectionStatus}
        </p>
      </div>

      {services.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Services ({services.length}):</h3>
          <div className="grid gap-2">
            {services.map((service) => (
              <div key={service.id} className="p-3 bg-gray-50 rounded border">
                <h4 className="font-medium">{service.title}</h4>
                <p className="text-sm text-gray-600">{service.description}</p>
                <p className="text-xs text-gray-500">Slug: {service.slug}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {teamMembers.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Team Members ({teamMembers.length}):</h3>
          <div className="grid gap-2">
            {teamMembers.map((member) => (
              <div key={member.id} className="p-3 bg-gray-50 rounded border">
                <h4 className="font-medium">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.role}</p>
                <p className="text-xs text-gray-500">Specialty: {member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {testimonials.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Testimonials ({testimonials.length}):</h3>
          <div className="grid gap-2">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-3 bg-gray-50 rounded border">
                <h4 className="font-medium">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.content}</p>
                <p className="text-xs text-gray-500">Rating: {testimonial.rating}/5</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {connectionStatus.includes("❌") && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="font-semibold text-red-800 mb-2">Troubleshooting:</h3>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• Make sure Strapi is running on http://localhost:1337</li>
            <li>• Check if the API endpoints are accessible</li>
            <li>• Verify content types are published in Strapi admin</li>
            <li>• Check browser console for detailed error messages</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default StrapiTest;
