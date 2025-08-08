"use client";

import { useState, useEffect, useRef } from "react";
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  
  const dispatch = useAppDispatch();
  const { currentLanguage, isRTL } = useAppSelector(state => state.language);
  const { isSearchOpen } = useAppSelector(state => state.search);

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

  const navigationItems = [
    { name: "About us", href: "#" },
    { name: "Services", href: "#", hasDropdown: true },
    { name: "Our Team", href: "#our-team" },
    { name: "Blogs", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  const servicesColumns = [
    [
      "Legal Consultation Services",
      "Foreign Investment Services", 
      "Contracts",
      "Notarization",
      "Insurance"
    ],
    [
      "......... and Defense in All Cases",
      "Banks and Financial Institutions",
      "Corporate Governance Services",
      "Companies Liquidation",
      "Internal Regulations for Companies"
    ],
    [
      "Services for Companies and Institutions",
      "Arbitration",
      "Intellectual Property",
      "Corporate Restructuring and Reorganization"
    ],
    [
      "Establishing National and Foreign Companies",
      "Commercial Agencies",
      "Supporting Vision 2030",
      "Estates"
    ]
  ];

  const handleLanguageChange = (language: 'en' | 'ar') => {
    dispatch(setLanguage(language));
  };

  const handleSearchToggle = () => {
    dispatch(setIsSearchOpen(!isSearchOpen));
  };

  return (
    <header className={`bg-brown-primary text-primary-foreground sticky top-0 z-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-primary-foreground">
              <div className="text-sm font-semibold">محمد بن عبد العيني</div>
              <div className="text-xs opacity-80">MOHAMMAD BIN ABDUL AL-AINI</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              item.hasDropdown ? (
                <div key={item.name} className="relative" ref={servicesRef}>
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="flex items-center space-x-1 hover:text-brown-light transition-colors"
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
                                <div key={serviceIndex} className="text-primary-foreground hover:text-brown-light transition-colors cursor-pointer text-sm">
                                  {service}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-brown-primary">
                            Read more
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
                <a
                  key={item.name}
                  href={item.href}
                  className="hover:text-brown-light transition-colors"
                >
                  {item.name}
                </a>
              )
            ))}
          </nav>

          {/* Right side - Search, Language selector and Book Appointment */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={handleSearchToggle}
              className="hover:text-brown-light transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 hover:text-brown-light transition-colors">
                <span>{currentLanguage === 'en' ? 'En' : 'Ar'}</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-brown-secondary border-brown-primary">
                <DropdownMenuItem 
                  className="text-primary-foreground hover:bg-brown-primary"
                  onClick={() => handleLanguageChange('en')}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-primary-foreground hover:bg-brown-primary"
                  onClick={() => handleLanguageChange('ar')}
                >
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-brown-primary"
            >
              Book Appointment
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-primary-foreground"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-brown-secondary">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="hover:text-brown-light transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center space-x-4 pt-4">
                <button 
                  onClick={handleSearchToggle}
                  className="hover:text-brown-light transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
                <Button 
                  variant="outline" 
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-brown-primary"
                >
                  Book Appointment
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