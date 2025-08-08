"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X, Globe, Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setLanguage } from '@/lib/slices/languageSlice';
import { setIsSearchOpen } from '@/lib/slices/searchSlice';
import { useTranslations } from '@/hooks/use-translations';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  
  const dispatch = useAppDispatch();
  const { currentLanguage, isRTL } = useAppSelector(state => state.language);
  const { isSearchOpen } = useAppSelector(state => state.search);
  const { t } = useTranslations();
  const pathname = usePathname();

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    if (isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServicesOpen]);

  // Memoize navigation items to prevent unnecessary re-renders
  const navigationItems = useMemo(() => {
    const items = [
      { name: t('header.navigation.about') || 'About us', href: "/about", key: 'about' },
      { name: t('header.navigation.services') || 'Services', href: "/services", hasDropdown: true, key: 'services' },
      { name: t('header.navigation.team') || 'Our Team', href: "/team", key: 'team' },
      { name: t('header.navigation.blogs') || 'Blogs', href: "/blogs", key: 'blogs' },
      { name: t('header.navigation.contact') || 'Contact Us', href: "/contact", key: 'contact' },
    ];

    // Only add Home item if not on the home page
    if (pathname !== '/') {
      items.unshift({ name: 'Home', href: "/", key: 'home' });
    }

    return items;
  }, [t, pathname]);

  // Memoize services columns to prevent unnecessary re-renders
  const servicesColumns = useMemo(() => [
    [
      { name: t('services.consultation') || 'Legal Consultation Services', href: '/services/legal-consultation' },
      { name: t('services.investment') || 'Foreign Investment Services', href: '/services/foreign-investment' },
      { name: t('services.contracts') || 'Contracts', href: '/services/contracts' },
      { name: t('services.notarization') || 'Notarization', href: '/services/notarization' },
      { name: t('services.insurance') || 'Insurance', href: '/services/insurance' }
    ],
    [
      { name: t('services.defense') || 'Defense in All Cases', href: '/services/defense' },
      { name: t('services.banking') || 'Banks and Financial Institutions', href: '/services/banking' },
      { name: t('services.governance') || 'Corporate Governance Services', href: '/services/governance' },
      { name: t('services.liquidation') || 'Companies Liquidation', href: '/services/liquidation' },
      { name: t('services.regulations') || 'Internal Regulations for Companies', href: '/services/regulations' }
    ],
    [
      { name: t('services.corporate') || 'Services for Companies and Institutions', href: '/services/corporate' },
      { name: t('services.arbitration') || 'Arbitration', href: '/services/arbitration' },
      { name: t('services.intellectual') || 'Intellectual Property', href: '/services/intellectual-property' },
      { name: t('services.restructuring') || 'Corporate Restructuring and Reorganization', href: '/services/restructuring' }
    ],
    [
      { name: t('services.establishment') || 'Establishing National and Foreign Companies', href: '/services/establishment' },
      { name: t('services.agencies') || 'Commercial Agencies', href: '/services/agencies' },
      { name: t('services.vision2030') || 'Supporting Vision 2030', href: '/services/vision2030' },
      { name: t('services.estates') || 'Estates', href: '/services/estates' }
    ]
  ], [t]);

  const handleLanguageChange = (language: 'en' | 'ar') => {
    dispatch(setLanguage(language));
  };

  const handleSearchToggle = () => {
    dispatch(setIsSearchOpen(!isSearchOpen));
  };

  const handleServicesToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <header className={`bg-brown-primary text-primary-foreground sticky top-0 z-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Link href="/" className="text-primary-foreground hover:text-brown-light transition-colors">
              <div className="text-sm font-semibold">{t('header.logo.arabicName') || 'محمد بن عبد العيني'}</div>
              <div className="text-xs opacity-80">{t('header.logo.name') || 'MOHAMMAD BIN ABDUL AL-AINI'}</div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navigationItems.map((item) => (
              item.hasDropdown ? (
                <div key={item.key} className="relative" ref={servicesRef}>
                  <button
                    onClick={handleServicesToggle}
                    className="flex items-center space-x-1 hover:text-brown-light transition-colors"
                    type="button"
                  >
                    <span>{item.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Services Dropdown */}
                  {isServicesOpen && (
                    <>
                      {/* Backdrop */}
                      <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsServicesOpen(false)} />
                      <div ref={servicesRef} className="absolute top-full left-1/2 transform -translate-x-1/2 bg-brown-primary/95 backdrop-blur-sm border-brown-secondary p-8 z-50 mt-2 rounded-lg shadow-2xl border w-[90vw] max-w-5xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                          {servicesColumns.map((column, colIndex) => (
                            <div key={colIndex} className="space-y-4">
                              {column.map((service, serviceIndex) => (
                                <Link
                                  key={serviceIndex}
                                  href={service.href}
                                  className="text-primary-foreground hover:text-brown-light transition-colors cursor-pointer text-sm block"
                                  onClick={() => setIsServicesOpen(false)}
                                >
                                  {service.name}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-brown-primary">
                            {t('common.readMore') || 'Read More'}
                          </Button>
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                              alt="Lawyer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className="hover:text-brown-light transition-colors"
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Right side - Search, Language selector and Book Appointment */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            <button 
              onClick={handleSearchToggle}
              className="hover:text-brown-light transition-colors p-2"
              aria-label={t('common.search') || 'Search'}
            >
              <Search className="w-5 h-5" />
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 hover:text-brown-light transition-colors p-2">
                <Globe className="w-4 h-4" />
                <span className="ml-1">{currentLanguage === 'en' ? 'En' : 'Ar'}</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-brown-secondary border-brown-primary">
                <DropdownMenuItem 
                  className="text-primary-foreground hover:bg-brown-primary"
                  onClick={() => handleLanguageChange('en')}
                >
                  {t('header.language.en') || 'English'}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-primary-foreground hover:bg-brown-primary"
                  onClick={() => handleLanguageChange('ar')}
                >
                  {t('header.language.ar') || 'العربية'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              size="default"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-brown-primary font-medium px-6 py-2 rounded-md transition-all duration-200 shadow-sm"
            >
              {t('common.bookAppointment') || 'Book Appointment'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-primary-foreground p-2"
            aria-label={isMenuOpen ? (t('common.close') || 'Close') : 'Menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-brown-secondary">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="hover:text-brown-light transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-4">
                <button 
                  onClick={handleSearchToggle}
                  className="hover:text-brown-light transition-colors"
                  aria-label={t('common.search') || 'Search'}
                >
                  <Search className="w-5 h-5" />
                </button>
                <Button 
                  variant="outline" 
                  size="default"
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-brown-primary font-medium px-6 py-2 rounded-md transition-all duration-200 shadow-sm"
                >
                  {t('common.bookAppointment') || 'Book Appointment'}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;