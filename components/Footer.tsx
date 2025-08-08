"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setSubscriptionEmail, setSubscriptionSubmitting, setSubscriptionSubmitted, setSubscriptionError, resetSubscription } from '@/lib/slices/formSlice';

const Footer = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { email, isSubmitting, isSubmitted, error } = useAppSelector((state: any) => state.form.subscription);

  // Validation schema for subscription form
  const subscriptionSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
  });

  const handleSubscribe = async (values: { email: string }, { resetForm }: any) => {
    dispatch(setSubscriptionSubmitting(true));
    dispatch(setSubscriptionError(null));

    try {
      // Simulate API call to Strapi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for duplicate email (simulated)
      const existingEmails = ['test@example.com', 'existing@email.com'];
      if (existingEmails.includes(values.email)) {
        dispatch(setSubscriptionError('This email is already subscribed'));
        toast({
          title: "Error",
          description: "This email is already subscribed to our newsletter",
          variant: "destructive",
        });
        return;
      }

      // Success
      dispatch(setSubscriptionSubmitted(true));
      dispatch(setSubscriptionEmail(values.email));
      resetForm();
      
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter",
      });
    } catch (error) {
      dispatch(setSubscriptionError('Failed to subscribe. Please try again.'));
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      dispatch(setSubscriptionSubmitting(false));
    }
  };

  const footerLinks = {
    "About": [
      "About Us",
      "Our Team", 
      "Practice Areas",
      "Case Studies",
      "Awards & Recognition"
    ],
    "Services": [
      "Corporate Law",
      "Criminal Defense",
      "Family Law", 
      "Real Estate Law",
      "Personal Injury",
      "Immigration Law"
    ],
    "Resources": [
      "Legal Blog",
      "FAQ",
      "Legal Forms",
      "Consultation Process",
      "Client Resources"
    ],
    "Contact": [
      "Contact Information",
      "Office Locations",
      "Schedule Consultation",
      "Emergency Contact",
      "Careers"
    ]
  };

  return (
    <footer className="bg-brown-dark text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="text-primary-foreground">
                <div className="text-sm font-semibold">محمد بن عبد العيني</div>
                <div className="text-xs opacity-80">MOHAMMAD BIN ABDUL AL-AINI</div>
              </div>
            </div>
            <p className="text-brown-light mb-6 leading-relaxed">
              Providing exceptional legal services with integrity, expertise, and dedication. 
              Our experienced team is committed to protecting your rights and achieving the best possible outcomes.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brown-light" />
                <span className="text-brown-light">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brown-light" />
                <span className="text-brown-light">info@lawfirm.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-brown-light" />
                <span className="text-brown-light">123 Legal Street, Law City, LC 12345</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-4 text-primary-foreground">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-brown-light hover:text-primary-foreground transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-brown-secondary/30 mt-12 pt-12">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-brown-light mb-6">
              Stay updated with the latest legal insights and firm news
            </p>
            
            <Formik
              initialValues={{ email: '' }}
              validationSchema={subscriptionSchema}
              onSubmit={handleSubscribe}
            >
              {({ isSubmitting: formikSubmitting, errors, touched }) => (
                <Form className="flex gap-2">
                  <div className="flex-1">
                    <Field
                      as={Input}
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="bg-brown-secondary border-brown-secondary text-primary-foreground placeholder:text-brown-light"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-400 text-sm mt-1 text-left">
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <Button 
                    type="submit"
                    disabled={isSubmitting || formikSubmitting}
                    className="bg-accent hover:bg-accent/90 text-primary-foreground disabled:opacity-50"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </Form>
              )}
            </Formik>
            
            {error && (
              <div className="text-red-400 text-sm mt-2">
                {error}
              </div>
            )}
            
            {isSubmitted && (
              <div className="text-green-400 text-sm mt-2">
                Successfully subscribed!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-brown-secondary/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-brown-light text-sm mb-4 md:mb-0">
              © 2024 LawFirm. All rights reserved. | Privacy Policy | Terms of Service
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#", name: "facebook" },
                { icon: Twitter, href: "#", name: "twitter" },
                { icon: Linkedin, href: "#", name: "linkedin" },
                { icon: Instagram, href: "#", name: "instagram" },
              ].map(({ icon: Icon, href, name }) => (
                <a
                  key={name}
                  href={href}
                  className="w-10 h-10 bg-brown-secondary rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-200"
                >
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;