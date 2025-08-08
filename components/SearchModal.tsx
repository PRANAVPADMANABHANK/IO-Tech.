"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search, Users, Briefcase } from "lucide-react";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setQuery, setResults, setIsLoading, setIsSearchOpen } from '@/lib/slices/searchSlice';
import { useTranslations } from '@/hooks/use-translations';
import Link from 'next/link';

const SearchModal = () => {
  const dispatch = useAppDispatch();
  const { query, results, isLoading, isSearchOpen } = useAppSelector(state => state.search);
  const [searchValue, setSearchValue] = useState('');
  const { t, currentLanguage } = useTranslations();

  // Mock data for search results
  const mockTeamMembers = [
    { id: 1, name: "Michael Johnson", role: "Senior Partner", type: "team", href: "/team/michael-johnson" },
    { id: 2, name: "Sarah Williams", role: "Managing Partner", type: "team", href: "/team/sarah-williams" },
    { id: 3, name: "David Chen", role: "Associate Partner", type: "team", href: "/team/david-chen" },
  ];

  const mockServices = [
    { id: 1, name: t('services.consultation'), type: "service", href: "/services/legal-consultation" },
    { id: 2, name: t('services.investment'), type: "service", href: "/services/foreign-investment" },
    { id: 3, name: t('services.governance'), type: "service", href: "/services/governance" },
    { id: 4, name: t('services.arbitration'), type: "service", href: "/services/arbitration" },
    { id: 5, name: t('services.intellectual'), type: "service", href: "/services/intellectual-property" },
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

  const handleResultClick = () => {
    handleClose();
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="bg-brown-primary rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brown-secondary">
          <h2 className="text-xl font-semibold text-primary-foreground">{t('common.search')}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-primary-foreground hover:bg-brown-secondary"
            aria-label={t('common.close')}
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
              placeholder={t('header.search.placeholder')}
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
              <p className="mt-2">{t('common.loading')}</p>
            </div>
          ) : query && results.length === 0 ? (
            <div className="text-center text-brown-light">
              <p>{t('header.search.noResults')} "{query}"</p>
            </div>
          ) : query && results.length > 0 ? (
            <div className="space-y-6">
              {/* Team Results */}
              {results.filter(result => result.type === 'team').length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Users className="w-5 h-5 text-brown-light" />
                    <h3 className="text-lg font-semibold text-primary-foreground">
                      {currentLanguage === 'en' ? 'Team Members' : 'أعضاء الفريق'}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {results.filter(result => result.type === 'team').map((member) => (
                      <Link
                        key={member.id}
                        href={member.href}
                        onClick={handleResultClick}
                        className="p-3 bg-brown-secondary rounded-lg hover:bg-brown-secondary/80 transition-colors cursor-pointer block"
                      >
                        <div className="font-medium text-primary-foreground">{member.name}</div>
                        <div className="text-sm text-brown-light">{member.role}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Results */}
              {results.filter(result => result.type === 'service').length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Briefcase className="w-5 h-5 text-brown-light" />
                    <h3 className="text-lg font-semibold text-primary-foreground">
                      {currentLanguage === 'en' ? 'Services' : 'الخدمات'}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {results.filter(result => result.type === 'service').map((service) => (
                      <Link
                        key={service.id}
                        href={service.href}
                        onClick={handleResultClick}
                        className="p-3 bg-brown-secondary rounded-lg hover:bg-brown-secondary/80 transition-colors cursor-pointer block"
                      >
                        <div className="font-medium text-primary-foreground">{service.name}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-brown-light">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{t('header.search.startTyping')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
