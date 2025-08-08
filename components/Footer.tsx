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
      // Simulate API call to Strapi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for duplicate email (simulated)
      const existingEmails = ['test@example.com', 'existing@email.com'];
      if (existingEmails.includes(values.email)) {
        dispatch(setSubscriptionError(t('footer.newsletter.duplicate')));
        toast({
          title: t('common.error'),
          description: t('footer.newsletter.duplicate'),
          variant: "destructive",
        });
        return;
      }

      // Success
      dispatch(setSubscriptionSubmitted(true));
      dispatch(setSubscriptionEmail(values.email));
      resetForm();
      
      toast({
        title: t('common.success'),
        description: t('footer.newsletter.success'),
      });
    } catch (error) {
      dispatch(setSubscriptionError(t('footer.newsletter.error')));
      toast({
        title: t('common.error'),
        description: t('footer.newsletter.error'),
        variant: "destructive",
      });
    } finally {
      dispatch(setSubscriptionSubmitting(false));
    }
  };

  const footerLinks = {
    about: {
      title: t('footer.links.about.title'),
      items: t('footer.links.about.items').split(',')
    },
    services: {
      title: t('footer.links.services.title'),
      items: t('footer.links.services.items').split(',')
    },
    resources: {
      title: t('footer.links.resources.title'),
      items: t('footer.links.resources.items').split(',')
    },
    contact: {
      title: t('footer.links.contact.title'),
      items: t('footer.links.contact.items').split(',')
    }
  };

  return (
    <footer className="bg-brown-dark text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Link href="/" className="text-primary-foreground hover:text-brown-light transition-colors">
                <div className="text-sm font-semibold">{t('header.logo.arabicName')}</div>
                <div className="text-xs opacity-80">{t('header.logo.name')}</div>
              </Link>
            </div>
            <p className="text-brown-light mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brown-light" />
                <span className="text-brown-light">{t('footer.contact.phone')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brown-light" />
                <span className="text-brown-light">{t('footer.contact.email')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-brown-light" />
                <span className="text-brown-light">{t('footer.contact.address')}</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-lg font-semibold mb-4 text-primary-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href="#" 
                      className="text-brown-light hover:text-primary-foreground transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-brown-secondary/30 mt-12 pt-12">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">{t('footer.newsletter.title')}</h3>
            <p className="text-brown-light mb-6">
              {t('footer.newsletter.subtitle')}
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
                      placeholder={t('footer.newsletter.placeholder')}
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
                    {isSubmitting ? t('common.subscribing') : t('common.subscribe')}
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
                {t('footer.newsletter.success')}
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
              {t('footer.copyright')}
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
                  aria-label={name}
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