"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users, Briefcase } from "lucide-react";
import { useAppDispatch } from '@/lib/hooks';
import { setQuery, setResults, setIsLoading } from '@/lib/slices/searchSlice';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState(query);
  const [results, setLocalResults] = useState<any[]>([]);
  const [isLoading, setIsLocalLoading] = useState(false);

  // Mock data for search results
  const mockTeamMembers = [
    { id: 1, name: "Michael Johnson", role: "Senior Partner", type: "team", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" },
    { id: 2, name: "Sarah Williams", role: "Managing Partner", type: "team", image: "https://images.unsplash.com/photo-1494790108755-2616b612b792?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" },
    { id: 3, name: "David Chen", role: "Associate Partner", type: "team", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" },
  ];

  const mockServices = [
    { id: 1, name: "Legal Consultation Services", type: "service", description: "Comprehensive legal consultation for all your legal needs" },
    { id: 2, name: "Foreign Investment Services", type: "service", description: "Expert guidance for foreign investment and business setup" },
    { id: 3, name: "Corporate Governance Services", type: "service", description: "Professional corporate governance and compliance services" },
    { id: 4, name: "Arbitration", type: "service", description: "Specialized arbitration and dispute resolution services" },
    { id: 5, name: "Intellectual Property", type: "service", description: "Complete IP protection and management services" },
  ];

  const performSearch = async (searchTerm: string) => {
    setIsLocalLoading(true);
    dispatch(setQuery(searchTerm));
    dispatch(setIsLoading(true));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (searchTerm.trim() === '') {
      setLocalResults([]);
      dispatch(setResults([]));
      setIsLocalLoading(false);
      dispatch(setIsLoading(false));
      return;
    }

    // Filter results based on search term
    const teamResults = mockTeamMembers.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const serviceResults = mockServices.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const allResults = [...teamResults, ...serviceResults];
    setLocalResults(allResults);
    dispatch(setResults(allResults));
    setIsLocalLoading(false);
    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchValue);
  };

  const teamResults = results.filter(result => result.type === 'team');
  const serviceResults = results.filter(result => result.type === 'service');

  return (
    <div className="min-h-screen">
      <Header />
      <SearchModal />
      
      {/* Search Hero Section */}
      <section className="bg-brown-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Search Results
            </h1>
            <p className="text-lg md:text-xl text-brown-light mb-8">
              Find team members and services that match your needs
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-light w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for team members, services..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10 bg-brown-secondary border-brown-secondary text-primary-foreground placeholder:text-brown-light"
                />
                <Button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent hover:bg-accent/90 text-primary-foreground"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-primary mx-auto"></div>
              <p className="mt-4 text-brown-secondary">Searching...</p>
            </div>
          ) : query && results.length === 0 ? (
            <div className="text-center">
              <Search className="w-16 h-16 text-brown-light mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-brown-dark mb-2">No results found</h2>
              <p className="text-brown-secondary">No results found for "{query}". Try different keywords.</p>
            </div>
          ) : query && results.length > 0 ? (
            <div className="space-y-12">
              {/* Team Results */}
              {teamResults.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <Users className="w-6 h-6 text-brown-primary" />
                    <h2 className="text-2xl font-bold text-brown-dark">Team Members ({teamResults.length})</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamResults.map((member) => (
                      <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-brown-dark mb-2">{member.name}</h3>
                          <p className="text-brown-secondary">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Results */}
              {serviceResults.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <Briefcase className="w-6 h-6 text-brown-primary" />
                    <h2 className="text-2xl font-bold text-brown-dark">Services ({serviceResults.length})</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {serviceResults.map((service) => (
                      <div key={service.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <h3 className="text-xl font-bold text-brown-dark mb-3">{service.name}</h3>
                        <p className="text-brown-secondary">{service.description}</p>
                        <Button className="mt-4 bg-brown-primary hover:bg-brown-secondary text-primary-foreground">
                          Learn More
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <Search className="w-16 h-16 text-brown-light mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-brown-dark mb-2">Start your search</h2>
              <p className="text-brown-secondary">Enter keywords to find team members and services</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
