// API service for Strapi CMS integration

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface ApiResponse<T> {
  data: T;
  meta?: any;
}

interface StrapiData<T> {
  id: number;
  attributes: T;
}

interface Service {
  id: number;
  title: string;
  description: string;
  content: string;
  slug: string;
  features: string[];
  image?: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  image: string;
  bio: string;
}

interface Client {
  id: number;
  name: string;
  logo: string;
  industry: string;
  testimonial?: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

interface Subscriber {
  id: number;
  email: string;
  createdAt: string;
}

class ApiService {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor() {
    this.baseUrl = STRAPI_URL;
    this.headers = {
      'Content-Type': 'application/json',
      ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`;
    const config: RequestInit = {
      headers: this.headers,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Services
  async getServices(): Promise<Service[]> {
    const response = await this.request<ApiResponse<StrapiData<Service>[]>>('/services?populate=*');
    return response.data.map(item => {
      const { id, ...attributes } = item.attributes;
      return {
        id: item.id,
        ...attributes,
      };
    });
  }

  async getService(slug: string): Promise<Service | null> {
    const response = await this.request<ApiResponse<StrapiData<Service>[]>>(`/services?filters[slug][$eq]=${slug}&populate=*`);
    if (response.data.length === 0) return null;
    
    const item = response.data[0];
    const { id, ...attributes } = item.attributes;
    return {
      id: item.id,
      ...attributes,
    };
  }

  // Team Members
  async getTeamMembers(): Promise<TeamMember[]> {
    const response = await this.request<ApiResponse<StrapiData<TeamMember>[]>>('/team-members?populate=*');
    return response.data.map(item => {
      const { id, ...attributes } = item.attributes;
      return {
        id: item.id,
        ...attributes,
      };
    });
  }

  async getTeamMember(id: number): Promise<TeamMember | null> {
    const response = await this.request<ApiResponse<StrapiData<TeamMember>>>(`/team-members/${id}?populate=*`);
    if (!response.data) return null;
    
    const { id: attrId, ...attributes } = response.data.attributes;
    return {
      id: response.data.id,
      ...attributes,
    };
  }

  // Clients
  async getClients(): Promise<Client[]> {
    const response = await this.request<ApiResponse<StrapiData<Client>[]>>('/clients?populate=*');
    return response.data.map(item => {
      const { id, ...attributes } = item.attributes;
      return {
        id: item.id,
        ...attributes,
      };
    });
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    const response = await this.request<ApiResponse<StrapiData<Testimonial>[]>>('/testimonials?populate=*');
    return response.data.map(item => {
      const { id, ...attributes } = item.attributes;
      return {
        id: item.id,
        ...attributes,
      };
    });
  }

  // Search
  async search(query: string): Promise<{ team: TeamMember[]; services: Service[] }> {
    const [teamResponse, servicesResponse] = await Promise.all([
      this.request<ApiResponse<StrapiData<TeamMember>[]>>(`/team-members?filters[$or][0][name][$containsi]=${query}&filters[$or][1][role][$containsi]=${query}&populate=*`),
      this.request<ApiResponse<StrapiData<Service>[]>>(`/services?filters[$or][0][title][$containsi]=${query}&filters[$or][1][description][$containsi]=${query}&populate=*`),
    ]);

    return {
      team: teamResponse.data.map(item => {
        const { id, ...attributes } = item.attributes;
        return { id: item.id, ...attributes };
      }),
      services: servicesResponse.data.map(item => {
        const { id, ...attributes } = item.attributes;
        return { id: item.id, ...attributes };
      }),
    };
  }

  // Subscribers
  async subscribeToNewsletter(email: string): Promise<Subscriber> {
    const response = await this.request<ApiResponse<StrapiData<Subscriber>>>('/subscribers', {
      method: 'POST',
      body: JSON.stringify({ data: { email } }),
    });

    const { id, ...attributes } = response.data.attributes;
    return {
      id: response.data.id,
      ...attributes,
    };
  }

  async checkSubscriberExists(email: string): Promise<boolean> {
    const response = await this.request<ApiResponse<StrapiData<Subscriber>[]>>(`/subscribers?filters[email][$eq]=${email}`);
    return response.data.length > 0;
  }

  // Contact Form
  async submitContactForm(data: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  }): Promise<any> {
    return await this.request('/contact-submissions', {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }

  // Appointment Booking
  async bookAppointment(data: {
    name: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    message?: string;
  }): Promise<any> {
    return await this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();

// Export types for use in components
export type { Service, TeamMember, Client, Testimonial, Subscriber };
