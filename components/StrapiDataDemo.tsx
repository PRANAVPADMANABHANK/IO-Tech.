"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  useServices, 
  useTeamMembers, 
  useTestimonials, 
  useClients, 
  useBlogPosts,
  useSearch,
  useNewsletterSubscription,
  useContactForm,
  useAppointmentBooking
} from "@/hooks/use-strapi-data";

const StrapiDataDemo = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [appointmentForm, setAppointmentForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: ""
  });

  // Data fetching hooks
  const { data: services, loading: servicesLoading, error: servicesError, refetch: refetchServices } = useServices();
  const { data: teamMembers, loading: teamLoading, error: teamError, refetch: refetchTeam } = useTeamMembers();
  const { data: testimonials, loading: testimonialsLoading, error: testimonialsError, refetch: refetchTestimonials } = useTestimonials();
  const { data: clients, loading: clientsLoading, error: clientsError, refetch: refetchClients } = useClients();
  const { data: blogPosts, loading: blogsLoading, error: blogsError, refetch: refetchBlogs } = useBlogPosts();
  
  // Search hook
  const { data: searchResults, loading: searchLoading, error: searchError, search } = useSearch(searchQuery);
  
  // Newsletter subscription hook
  const { subscribe: subscribeNewsletter, loading: newsletterLoading, error: newsletterError, success: newsletterSuccess, reset: resetNewsletter } = useNewsletterSubscription();
  
  // Contact form hook
  const { submitForm: submitContactForm, loading: contactLoading, error: contactError, success: contactSuccess, reset: resetContact } = useContactForm();
  
  // Appointment booking hook
  const { bookAppointment, loading: appointmentLoading, error: appointmentError, success: appointmentSuccess, reset: resetAppointment } = useAppointmentBooking();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await subscribeNewsletter(newsletterEmail);
    if (newsletterSuccess) {
      setNewsletterEmail("");
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitContactForm(contactForm);
    if (contactSuccess) {
      setContactForm({ name: "", email: "", phone: "", service: "", message: "" });
    }
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await bookAppointment(appointmentForm);
    if (appointmentSuccess) {
      setAppointmentForm({ name: "", email: "", phone: "", service: "", date: "", time: "", message: "" });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(searchQuery);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Strapi Data Integration Demo</h1>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Search Across Content</CardTitle>
          <CardDescription>Search across services, team members, and blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search for services, team members, or blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={searchLoading}>
              {searchLoading ? "Searching..." : "Search"}
            </Button>
          </form>
          
          {searchError && <p className="text-red-500 mt-2">{searchError}</p>}
          
          {searchResults && (
            <div className="mt-4 space-y-4">
              {searchResults.services && searchResults.services.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Services Found:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {searchResults.services.map((service: any) => (
                      <div key={service.id} className="p-2 bg-gray-100 rounded">
                        {service.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {searchResults.team && searchResults.team.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Team Members Found:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {searchResults.team.map((member: any) => (
                      <div key={member.id} className="p-2 bg-gray-100 rounded">
                        {member.name} - {member.role}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {searchResults.blogs && searchResults.blogs.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Blog Posts Found:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {searchResults.blogs.map((post: any) => (
                      <div key={post.id} className="p-2 bg-gray-100 rounded">
                        {post.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Newsletter Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Newsletter Subscription</CardTitle>
          <CardDescription>Subscribe to our newsletter</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" disabled={newsletterLoading}>
              {newsletterLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          {newsletterError && <p className="text-red-500 mt-2">{newsletterError}</p>}
          {newsletterSuccess && <p className="text-green-500 mt-2">Successfully subscribed!</p>}
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
          <CardDescription>Send us a message</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="service">Service</Label>
                <Select value={contactForm.service} onValueChange={(value) => setContactForm({...contactForm, service: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service: any) => (
                      <SelectItem key={service.id} value={service.slug}>
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                required
              />
            </div>
            <Button type="submit" disabled={contactLoading}>
              {contactLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>
          
          {contactError && <p className="text-red-500 mt-2">{contactError}</p>}
          {contactSuccess && <p className="text-green-500 mt-2">Message sent successfully!</p>}
        </CardContent>
      </Card>

      {/* Appointment Booking */}
      <Card>
        <CardHeader>
          <CardTitle>Book Appointment</CardTitle>
          <CardDescription>Schedule a consultation</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAppointmentSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="appointment-name">Name</Label>
                <Input
                  id="appointment-name"
                  value={appointmentForm.name}
                  onChange={(e) => setAppointmentForm({...appointmentForm, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="appointment-email">Email</Label>
                <Input
                  id="appointment-email"
                  type="email"
                  value={appointmentForm.email}
                  onChange={(e) => setAppointmentForm({...appointmentForm, email: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="appointment-phone">Phone</Label>
                <Input
                  id="appointment-phone"
                  value={appointmentForm.phone}
                  onChange={(e) => setAppointmentForm({...appointmentForm, phone: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="appointment-service">Service</Label>
                <Select value={appointmentForm.service} onValueChange={(value) => setAppointmentForm({...appointmentForm, service: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service: any) => (
                      <SelectItem key={service.id} value={service.slug}>
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="appointment-date">Date</Label>
                <Input
                  id="appointment-date"
                  type="date"
                  value={appointmentForm.date}
                  onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="appointment-time">Time</Label>
                <Input
                  id="appointment-time"
                  type="time"
                  value={appointmentForm.time}
                  onChange={(e) => setAppointmentForm({...appointmentForm, time: e.target.value})}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="appointment-message">Additional Notes</Label>
              <Textarea
                id="appointment-message"
                value={appointmentForm.message}
                onChange={(e) => setAppointmentForm({...appointmentForm, message: e.target.value})}
              />
            </div>
            <Button type="submit" disabled={appointmentLoading}>
              {appointmentLoading ? "Booking..." : "Book Appointment"}
            </Button>
          </form>
          
          {appointmentError && <p className="text-red-500 mt-2">{appointmentError}</p>}
          {appointmentSuccess && <p className="text-green-500 mt-2">Appointment booked successfully!</p>}
        </CardContent>
      </Card>

      {/* Data Display Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Services ({services.length})
              <Button onClick={refetchServices} size="sm" variant="outline">
                Refresh
              </Button>
            </CardTitle>
            <CardDescription>Available legal services</CardDescription>
          </CardHeader>
          <CardContent>
            {servicesLoading ? (
              <p>Loading services...</p>
            ) : servicesError ? (
              <p className="text-red-500">{servicesError}</p>
            ) : (
              <div className="space-y-2">
                {services.map((service: any) => (
                  <div key={service.id} className="p-2 bg-gray-100 rounded">
                    <strong>{service.title}</strong>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Team Members ({teamMembers.length})
              <Button onClick={refetchTeam} size="sm" variant="outline">
                Refresh
              </Button>
            </CardTitle>
            <CardDescription>Our legal team</CardDescription>
          </CardHeader>
          <CardContent>
            {teamLoading ? (
              <p>Loading team members...</p>
            ) : teamError ? (
              <p className="text-red-500">{teamError}</p>
            ) : (
              <div className="space-y-2">
                {teamMembers.map((member: any) => (
                  <div key={member.id} className="p-2 bg-gray-100 rounded">
                    <strong>{member.name}</strong>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Testimonials ({testimonials.length})
              <Button onClick={refetchTestimonials} size="sm" variant="outline">
                Refresh
              </Button>
            </CardTitle>
            <CardDescription>Client feedback</CardDescription>
          </CardHeader>
          <CardContent>
            {testimonialsLoading ? (
              <p>Loading testimonials...</p>
            ) : testimonialsError ? (
              <p className="text-red-500">{testimonialsError}</p>
            ) : (
              <div className="space-y-2">
                {testimonials.map((testimonial: any) => (
                  <div key={testimonial.id} className="p-2 bg-gray-100 rounded">
                    <strong>{testimonial.name}</strong>
                    <p className="text-sm text-gray-600">{testimonial.content}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Clients */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Clients ({clients.length})
              <Button onClick={refetchClients} size="sm" variant="outline">
                Refresh
              </Button>
            </CardTitle>
            <CardDescription>Our client base</CardDescription>
          </CardHeader>
          <CardContent>
            {clientsLoading ? (
              <p>Loading clients...</p>
            ) : clientsError ? (
              <p className="text-red-500">{clientsError}</p>
            ) : (
              <div className="space-y-2">
                {clients.map((client: any) => (
                  <div key={client.id} className="p-2 bg-gray-100 rounded">
                    <strong>{client.name}</strong>
                    <p className="text-sm text-gray-600">{client.industry}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Blog Posts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Blog Posts ({blogPosts.length})
              <Button onClick={refetchBlogs} size="sm" variant="outline">
                Refresh
              </Button>
            </CardTitle>
            <CardDescription>Latest blog articles</CardDescription>
          </CardHeader>
          <CardContent>
            {blogsLoading ? (
              <p>Loading blog posts...</p>
            ) : blogsError ? (
              <p className="text-red-500">{blogsError}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blogPosts.map((post: any) => (
                  <div key={post.id} className="p-3 bg-gray-100 rounded">
                    <strong>{post.title}</strong>
                    <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StrapiDataDemo;
