import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api';

export function useStrapiData<T>(
  fetchFunction: () => Promise<T[]>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      console.error('Error refetching data:', err);
      setError(err instanceof Error ? err.message : 'Failed to reload data');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

// Specific hooks for common data types
export function useServices(locale?: string) {
  return useStrapiData(() => apiService.getServices(locale), [locale]);
}

export function useTeamMembers(locale?: string) {
  return useStrapiData(() => apiService.getTeamMembers(locale), [locale]);
}

export function useTestimonials() {
  return useStrapiData(() => apiService.getTestimonials(), []);
}

export function useClients() {
  return useStrapiData(() => apiService.getClients(), []);
}

export function useBlogPosts(locale?: string) {
  return useStrapiData(() => apiService.getBlogPosts(locale), [locale]);
}

export function usePages() {
  return useStrapiData(() => apiService.getPages(), []);
}

export function usePage(slug: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService.getPage(slug);
        setData(result);
      } catch (err) {
        console.error('Error fetching page:', err);
        setError(err instanceof Error ? err.message : 'Failed to load page');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.getPage(slug);
      setData(result);
    } catch (err) {
      console.error('Error refetching page:', err);
      setError(err instanceof Error ? err.message : 'Failed to reload page');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

export function useService(slug: string, locale?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService.getService(slug, locale);
        setData(result);
      } catch (err) {
        console.error('Error fetching service:', err);
        setError(err instanceof Error ? err.message : 'Failed to load service');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchService();
    }
  }, [slug, locale]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.getService(slug, locale);
      setData(result);
    } catch (err) {
      console.error('Error refetching service:', err);
      setError(err instanceof Error ? err.message : 'Failed to reload service');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

export function useBlogPost(slug: string, locale?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService.getBlogPost(slug, locale);
        setData(result);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug, locale]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.getBlogPost(slug, locale);
      setData(result);
    } catch (err) {
      console.error('Error refetching blog post:', err);
      setError(err instanceof Error ? err.message : 'Failed to reload blog post');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

export function useTeamMember(id: number) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService.getTeamMember(id);
        setData(result);
      } catch (err) {
        console.error('Error fetching team member:', err);
        setError(err instanceof Error ? err.message : 'Failed to load team member');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTeamMember();
    }
  }, [id]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.getTeamMember(id);
      setData(result);
    } catch (err) {
      console.error('Error refetching team member:', err);
      setError(err instanceof Error ? err.message : 'Failed to reload team member');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

export function useSearch(query: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await apiService.search(searchQuery);
      setData(result);
    } catch (err) {
      console.error('Error searching:', err);
      setError(err instanceof Error ? err.message : 'Failed to perform search');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      search(query);
    }
  }, [query]);

  return { data, loading, error, search };
}

export function useNewsletterSubscription() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const subscribe = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      // Check if subscriber already exists
      const exists = await apiService.checkSubscriberExists(email);
      if (exists) {
        setError('This email is already subscribed to our newsletter.');
        return;
      }

      // Subscribe new email
      await apiService.subscribeToNewsletter(email);
      setSuccess(true);
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
      setError(err instanceof Error ? err.message : 'Failed to subscribe to newsletter');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { subscribe, loading, error, success, reset };
}

export function useContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitForm = async (formData: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      await apiService.submitContactForm(formData);
      setSuccess(true);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit contact form');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { submitForm, loading, error, success, reset };
}

export function useAppointmentBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const bookAppointment = async (appointmentData: {
    name: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    message?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      await apiService.bookAppointment(appointmentData);
      setSuccess(true);
    } catch (err) {
      console.error('Error booking appointment:', err);
      setError(err instanceof Error ? err.message : 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { bookAppointment, loading, error, success, reset };
}

export function useStrapiConnection() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        setLoading(true);
        setError(null);
        const connected = await apiService.testConnection();
        setIsConnected(connected);
      } catch (err) {
        console.error('Error testing Strapi connection:', err);
        setError(err instanceof Error ? err.message : 'Failed to test connection');
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  const retest = async () => {
    try {
      setLoading(true);
      setError(null);
      const connected = await apiService.testConnection();
      setIsConnected(connected);
    } catch (err) {
      console.error('Error retesting Strapi connection:', err);
      setError(err instanceof Error ? err.message : 'Failed to retest connection');
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  return { isConnected, loading, error, retest };
}
