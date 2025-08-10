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
import { useTranslations } from '@/hooks/use-translations';
import { apiService } from '@/lib/api';
import Link from 'next/link';

const Footer = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { email, isSubmitting, isSubmitted, error } = useAppSelector((state: any) => state.form.subscription);
  const { t, currentLanguage } = useTranslations();

  // Validation schema for subscription form
  const subscriptionSchema = Yup.object().shape({
    email: Yup.string()
      .email(currentLanguage === 'en' ? 'Please enter a valid email address' : 'يرجى إدخال عنوان بريد إلكتروني صحيح')
      .required(currentLanguage === 'en' ? 'Email is required' : 'البريد الإلكتروني مطلوب'),
  });

  const handleSubscribe = async (values: { email: string }, { resetForm }: any) => {
    dispatch(setSubscriptionSubmitting(true));
    dispatch(setSubscriptionError(null));

    try {
      // Check if subscriber already exists
      const subscriberExists = await apiService.checkSubscriberExists(values.email);
      
      if (subscriberExists) {
        dispatch(setSubscriptionError(t('footer.newsletter.duplicate') || 'This email is already subscribed to our newsletter.'));
        toast({
          title: t('common.error') || 'Error',
          description: t('footer.newsletter.duplicate') || 'This email is already subscribed to our newsletter.',
          variant: "destructive",
        });
        return;
      }

      // Subscribe to newsletter using Strapi API
      await apiService.subscribeToNewsletter(values.email);

      // Success
      dispatch(setSubscriptionSubmitted(true));
      dispatch(setSubscriptionEmail(values.email));
      resetForm();
      
      toast({
        title: t('common.success') || 'Success',
        description: t('footer.newsletter.success') || 'Successfully subscribed to our newsletter!',
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      const errorMessage = t('footer.newsletter.error') || 'Failed to subscribe. Please try again later.';
      dispatch(setSubscriptionError(errorMessage));
      toast({
        title: t('common.error') || 'Error',
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      dispatch(setSubscriptionSubmitting(false));
    }
  };

  const footerLinks = [
    { title: "About", href: "/about" },
    { title: "Our Strategy", href: "/strategy" },
    { title: "Our Advantages", href: "/advantages" },
    { title: "Social Responsibility", href: "/social-responsibility" },
    { title: "Our Services", href: "/services" }
  ];

  return (
    <footer style={{ backgroundColor: '#6B4423' }} className="text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Newsletter, Contact and Social Links Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-end gap-4 mb-8">
          {/* Newsletter Subscription and Contact */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <Formik
              initialValues={{ email: '' }}
              validationSchema={subscriptionSchema}
              onSubmit={handleSubscribe}
            >
              {({ isSubmitting: formikSubmitting }) => (
                <Form className="relative flex items-center">
                  <Field
                    as={Input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-white text-black placeholder:text-gray-500 border-0 rounded-md px-3 py-2 pr-28 w-64"
                  />
                  <Button 
                    type="submit"
                    disabled={isSubmitting || formikSubmitting}
                    style={{ backgroundColor: '#8B4513' }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-opacity-90 text-white px-3 py-0.5 rounded text-xs h-6"
                  >
                    Subscribe
                  </Button>
                </Form>
              )}
            </Formik>
            <Link href="/contact" className="text-white hover:text-gray-300 transition-colors">
              Contacts
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="flex gap-3">
            <a
              href="#"
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Google Plus"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 14h-12.017v-2h12.017v2zm7.002-7.5c-.309 0-.55.242-.55.55v1.45h-1.45c-.309 0-.55.242-.55.55s.241.55.55.55h1.45v1.45c0 .309.241.55.55.55s.55-.241.55-.55v-1.45h1.45c.308 0 .55-.242.55-.55s-.242-.55-.55-.55h-1.45v-1.45c0-.308-.241-.55-.55-.55z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="border-gray-400 mb-8" />

        {/* Bottom Section: Navigation Links and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-4 md:mb-0">
            {footerLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-white hover:text-gray-300 transition-colors text-sm"
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-white text-sm">
            © 2024 . All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;