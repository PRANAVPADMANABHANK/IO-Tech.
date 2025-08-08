"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search, Users, Briefcase } from "lucide-react";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setQuery, setResults, setIsLoading, setIsSearchOpen } from '@/lib/slices/searchSlice';

const SearchModal = () => {
  const dispatch = useAppDispatch();
  const { query, results, isLoading, isSearchOpen } = useAppSelector(state => state.search);
  const [searchValue, setSearchValue] = useState('');

  // Mock data for search results
  const mockTeamMembers = [
    { id: 1, name: "Michael Johnson", role: "Senior Partner", type: "team" },
    { id: 2, name: "Sarah Williams", role: "Managing Partner", type: "team" },
    { id: 3, name: "David Chen", role: "Associate Partner", type: "team" },
  ];

  const mockServices = [
    { id: 1, name: "Legal Consultation Services", type: "service" },
    { id: 2, name: "Foreign Investment Services", type: "service" },
    { id: 3, name: "Corporate Governance Services", type: "service" },
    { id: 4, name: "Arbitration", type: "service" },
    { id: 5, name: "Intellectual Property", type: "service" },
  ];

  const handleSearch = async (searchTerm: string) => {
    dispatch(setQuery(searchTerm));
    dispatch(setIsLoading(true));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (searchTerm.trim() === '') {
      dispatch(setResults([]));
      dispatch(setIsLoading(false));
      return;
    }

    // Filter results based on search term
    const teamResults = mockTeamMembers.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const serviceResults = mockServices.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const allResults = [...teamResults, ...serviceResults];
    dispatch(setResults(allResults));
    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    if (isSearchOpen) {
      // Focus on search input when modal opens
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.focus();
      }
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const handleClose = () => {
    dispatch(setIsSearchOpen(false));
    setSearchValue('');
    dispatch(setQuery(''));
    dispatch(setResults([]));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="bg-brown-primary rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brown-secondary">
          <h2 className="text-xl font-semibold text-primary-foreground">Search</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-primary-foreground hover:bg-brown-secondary"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Search Input */}
        <div className="p-6 border-b border-brown-secondary">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-light w-5 h-5" />
            <Input
              id="search-input"
              type="text"
              placeholder="Search for team members, services..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 bg-brown-secondary border-brown-secondary text-primary-foreground placeholder:text-brown-light"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="text-center text-brown-light">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-foreground mx-auto"></div>
              <p className="mt-2">Searching...</p>
            </div>
          ) : query && results.length === 0 ? (
            <div className="text-center text-brown-light">
              <p>No results found for "{query}"</p>
            </div>
          ) : query && results.length > 0 ? (
            <div className="space-y-6">
              {/* Team Results */}
              {results.filter(result => result.type === 'team').length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Users className="w-5 h-5 text-brown-light" />
                    <h3 className="text-lg font-semibold text-primary-foreground">Team Members</h3>
                  </div>
                  <div className="space-y-2">
                    {results.filter(result => result.type === 'team').map((member) => (
                      <div
                        key={member.id}
                        className="p-3 bg-brown-secondary rounded-lg hover:bg-brown-secondary/80 transition-colors cursor-pointer"
                      >
                        <div className="font-medium text-primary-foreground">{member.name}</div>
                        <div className="text-sm text-brown-light">{member.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Results */}
              {results.filter(result => result.type === 'service').length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Briefcase className="w-5 h-5 text-brown-light" />
                    <h3 className="text-lg font-semibold text-primary-foreground">Services</h3>
                  </div>
                  <div className="space-y-2">
                    {results.filter(result => result.type === 'service').map((service) => (
                      <div
                        key={service.id}
                        className="p-3 bg-brown-secondary rounded-lg hover:bg-brown-secondary/80 transition-colors cursor-pointer"
                      >
                        <div className="font-medium text-primary-foreground">{service.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-brown-light">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start typing to search for team members and services</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
