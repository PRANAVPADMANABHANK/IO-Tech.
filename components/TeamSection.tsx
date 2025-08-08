"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from '@/hooks/use-translations';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  experience: string;
  specialty: string;
}

const TeamSection = () => {
  const { t, currentLanguage } = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Michael Johnson",
      role: "Senior Partner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      experience: "15+ Years",
      specialty: "Corporate Law"
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Managing Partner", 
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b792?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      experience: "20+ Years",
      specialty: "Family Law"
    },
    {
      id: 3,
      name: "David Chen",
      role: "Associate Partner",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      experience: "12+ Years", 
      specialty: "Criminal Defense"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "Senior Associate",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      experience: "8+ Years",
      specialty: "Immigration Law"
    },
    {
      id: 5,
      name: "Ahmed Hassan",
      role: "Senior Associate",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      experience: "10+ Years",
      specialty: "Commercial Law"
    },
    {
      id: 6,
      name: "Fatima Al-Zahra",
      role: "Associate",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b792?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      experience: "5+ Years",
      specialty: "Real Estate Law"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(teamMembers.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(teamMembers.length / 3)) % Math.ceil(teamMembers.length / 3));
  };

  const getVisibleMembers = () => {
    const start = currentSlide * 3;
    return teamMembers.slice(start, start + 3);
  };

  return (
    <section id="our-team" className="py-20 bg-brown-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brown-dark mb-6">
            {t('team.title')}
          </h2>
          <p className="text-lg text-brown-secondary max-w-3xl mx-auto leading-relaxed">
            {t('team.subtitle')}
          </p>
        </div>

        {/* Team Members Carousel */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {getVisibleMembers().map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-brown-dark mb-2">
                    {member.name}
                  </h3>
                  <p className="text-brown-secondary mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-brown-secondary/80 mb-1">
                    {member.experience} {t('team.experience')}
                  </p>
                  <p className="text-sm text-brown-secondary/80">
                    {member.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white"
              aria-label={t('common.previous')}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(teamMembers.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-brown-primary' : 'bg-brown-primary/30'
                  }`}
                  aria-label={`Go to team slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="border-brown-primary text-brown-primary hover:bg-brown-primary hover:text-white"
              aria-label={t('common.next')}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;