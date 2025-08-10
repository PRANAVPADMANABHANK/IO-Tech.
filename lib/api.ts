// API service for Strapi CMS integration
import { config } from './config';

const STRAPI_URL = config.strapi.url;
const STRAPI_API_TOKEN = config.strapi.apiToken;

console.log('STRAPI_URL:', STRAPI_URL);
console.log('STRAPI_API_TOKEN:', STRAPI_API_TOKEN ? 'Set' : 'Not set');

interface ApiResponse<T> {
  data: T;
  meta?: any;
}

interface StrapiData<T> {
  id: number;
  attributes: T;
}

interface StrapiMedia {
  id: number;
  attributes: {
    url: string;
    alternativeText?: string;
    caption?: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
}

// Strapi Blocks content structure
interface StrapiBlock {
  type: string;
  children?: StrapiBlockChild[];
  [key: string]: any;
}

interface StrapiBlockChild {
  type: string;
  text?: string;
  [key: string]: any;
}

// Utility function to convert Strapi blocks to HTML
function convertStrapiBlocksToHtml(blocks: StrapiBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  return blocks.map(block => {
    switch (block.type) {
      case 'paragraph':
        const paragraphContent = block.children?.map(child => {
          if (child.type === 'text') {
            return child.text || '';
          }
          return '';
        }).join('') || '';
        return `<p>${paragraphContent}</p>`;
      
      case 'heading':
        const level = block.level || 1;
        const headingContent = block.children?.map(child => {
          if (child.type === 'text') {
            return child.text || '';
          }
          return '';
        }).join('') || '';
        return `<h${level}>${headingContent}</h${level}>`;
      
      case 'list':
        const listType = block.format === 'ordered' ? 'ol' : 'ul';
        const listItems = block.children?.map(child => {
          if (child.type === 'list-item') {
                         const itemContent = child.children?.map((itemChild: StrapiBlockChild) => {
               if (itemChild.type === 'text') {
                 return itemChild.text || '';
               }
               return '';
             }).join('') || '';
            return `<li>${itemContent}</li>`;
          }
          return '';
        }).join('') || '';
        return `<${listType}>${listItems}</${listType}>`;
      
      case 'quote':
        const quoteContent = block.children?.map(child => {
          if (child.type === 'text') {
            return child.text || '';
          }
          return '';
        }).join('') || '';
        return `<blockquote>${quoteContent}</blockquote>`;
      
      default:
        return '';
    }
  }).join('');
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
  image?: string;
  bio: string;
}

interface Client {
  id: number;
  name: string;
  logo?: string;
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

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  heroImage?: string;
  publishedAt: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  author: string;
  publishedAt: string;
  tags?: string[];
  category?: string;
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

  private getMediaUrl(media: StrapiMedia | StrapiMedia[] | null): string | undefined {
    if (!media) return undefined;
    
    if (Array.isArray(media)) {
      return media.length > 0 ? this.getMediaUrl(media[0]) : undefined;
    }
    
    if (media.attributes?.url) {
      // If the URL is already absolute, return as is
      if (media.attributes.url.startsWith('http')) {
        return media.attributes.url;
      }
      // Otherwise, construct the full URL
      return `${this.baseUrl}${media.attributes.url}`;
    }
    
    return undefined;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`;
    const config: RequestInit = {
      headers: this.headers,
      ...options,
    };

    try {
      console.log(`Making API request to: ${url}`);
      console.log('Request config:', config);
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error ${response.status}:`, errorText);
        throw new Error(`API request failed: ${response.status} ${response.statusText}. Details: ${errorText}`);
      }

      const data = await response.json();
      console.log(`API response received for ${endpoint}:`, data);
      return data;
    } catch (error) {
      console.error('API request error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('Network error - make sure Strapi is running on', this.baseUrl);
      }
      throw error;
    }
  }

  private async safeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
    try {
      return await this.request<T>(endpoint, options);
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        console.warn(`Content type not found: ${endpoint}`);
        return null;
      }
      throw error;
    }
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      // Test with the services endpoint that we know works
      await this.request('/services?pagination[limit]=1');
      console.log('✅ Strapi connection successful!');
      return true;
    } catch (error) {
      console.error('❌ Strapi connection failed:', error);
      return false;
    }
  }

  // Services
  async getServices(locale: string = 'en'): Promise<Service[]> {
    try {
      const response = await this.request<ApiResponse<Service[]>>(`/services?populate=*&locale=${locale}`);
      
      if (!response.data || !Array.isArray(response.data)) {
        console.error('Invalid services response structure:', response);
        return [];
      }
      
      return response.data.map(item => {
        // Handle flat data structure (no attributes wrapper)
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          content: item.content,
          slug: item.slug,
          features: item.features || [],
          image: this.getMediaUrl(item.image as any),
        };
      });
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  }

  async getService(slug: string, locale: string = 'en'): Promise<Service | null> {
    try {
      const response = await this.request<ApiResponse<Service[]>>(`/services?filters[slug][$eq]=${slug}&populate=*&locale=${locale}`);
      if (response.data.length === 0) return null;
      
      const item = response.data[0];
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        content: item.content,
        slug: item.slug,
        features: item.features || [],
        image: this.getMediaUrl(item.image as any),
      };
    } catch (error) {
      console.error('Error fetching service:', error);
      return null;
    }
  }

  // Team Members
  async getTeamMembers(locale: string = 'en'): Promise<TeamMember[]> {
    try {
      const response = await this.request<ApiResponse<TeamMember[]>>(`/team-members?populate=*&locale=${locale}`);
      
      if (!response.data || !Array.isArray(response.data)) {
        console.error('Invalid team members response structure:', response);
        return [];
      }
      
      return response.data.map(item => {
        return {
          id: item.id,
          name: item.name,
          role: item.role,
          experience: item.experience,
          specialty: item.specialty,
          image: this.getMediaUrl(item.image as any),
          bio: item.bio,
        };
      });
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  }

  async getTeamMember(id: number): Promise<TeamMember | null> {
    try {
      const response = await this.request<ApiResponse<StrapiData<TeamMember>>>(`/team-members/${id}?populate=*`);
      if (!response.data) return null;
      
      if (!response.data.attributes) {
        console.warn('Team member missing attributes:', response.data);
        return null;
      }
      
      const { id: _, ...attributes } = response.data.attributes;
      return {
        id: response.data.id,
        ...attributes,
        image: this.getMediaUrl(attributes.image as any),
      };
    } catch (error) {
      console.error('Error fetching team member:', error);
      return null;
    }
  }

  // Clients
  async getClients(): Promise<Client[]> {
    try {
      const response = await this.request<ApiResponse<StrapiData<Client>[]>>('/clients?populate=*');
      
      if (!response.data || !Array.isArray(response.data)) {
        console.error('Invalid clients response structure:', response);
        return [];
      }
      
      return response.data.map(item => {
        if (!item.attributes) {
          console.warn('Client item missing attributes:', item);
          return null;
        }
        
        const { id: _, ...attributes } = item.attributes;
        return {
          id: item.id,
          ...attributes,
          logo: this.getMediaUrl(attributes.logo as any),
        };
      }).filter(Boolean) as Client[];
    } catch (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const response = await this.request<ApiResponse<StrapiData<Testimonial>[]>>('/testimonials?populate=*');
      
      if (!response.data || !Array.isArray(response.data)) {
        console.error('Invalid testimonials response structure:', response);
        return [];
      }
      
      return response.data.map(item => {
        if (!item.attributes) {
          console.warn('Testimonial item missing attributes:', item);
          return null;
        }
        
        const { id: _, ...attributes } = item.attributes;
        return {
          id: item.id,
          ...attributes,
          image: this.getMediaUrl(attributes.image as any),
        };
      }).filter(Boolean) as Testimonial[];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  }

  // Pages
  async getPages(): Promise<Page[]> {
    try {
      const response = await this.request<ApiResponse<StrapiData<Page>[]>>('/pages?populate=*');
      
      if (!response.data || !Array.isArray(response.data)) {
        console.error('Invalid pages response structure:', response);
        return [];
      }
      
      return response.data.map(item => {
        if (!item.attributes) {
          console.warn('Page item missing attributes:', item);
          return null;
        }
        
        const { id: _, ...attributes } = item.attributes;
        return {
          id: item.id,
          ...attributes,
          heroImage: this.getMediaUrl(attributes.heroImage as any),
        };
      }).filter(Boolean) as Page[];
    } catch (error) {
      console.error('Error fetching pages:', error);
      return [];
    }
  }

  async getPage(slug: string): Promise<Page | null> {
    try {
      const response = await this.request<ApiResponse<StrapiData<Page>[]>>(`/pages?filters[slug][$eq]=${slug}&populate=*`);
      if (response.data.length === 0) return null;
      
      const item = response.data[0];
      if (!item.attributes) {
        console.warn('Page item missing attributes:', item);
        return null;
      }
      
      const { id: _, ...attributes } = item.attributes;
      return {
        id: item.id,
        ...attributes,
        heroImage: this.getMediaUrl(attributes.heroImage as any),
      };
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  }

  // Blog Posts
  async getBlogPosts(locale: string = 'en'): Promise<BlogPost[]> {
    try {
      const response = await this.request<ApiResponse<BlogPost[]>>(`/blogs?populate=*&sort=publishedAt:desc&locale=${locale}`);
      
      if (!response.data || !Array.isArray(response.data)) {
        console.error('Invalid blog posts response structure:', response);
        return [];
      }
      
      return response.data.map(item => {
        // Handle flat data structure (no attributes wrapper)
        return {
          id: item.id,
          title: item.title,
          slug: item.slug,
          content: typeof item.content === 'string' ? item.content : convertStrapiBlocksToHtml(item.content as StrapiBlock[]),
          excerpt: item.excerpt,
          author: item.author,
          publishedAt: item.publishedAt,
          tags: item.tags,
          category: item.category,
          featuredImage: this.getMediaUrl(item.featuredImage as any),
        };
      });
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  async getBlogPost(slug: string, locale: string = 'en'): Promise<BlogPost | null> {
    try {
      const response = await this.request<ApiResponse<BlogPost[]>>(`/blogs?filters[slug][$eq]=${slug}&populate=*&locale=${locale}`);
      if (response.data.length === 0) return null;
      
      const item = response.data[0];
      // Handle flat data structure (no attributes wrapper)
      return {
        id: item.id,
        title: item.title,
        slug: item.slug,
        content: typeof item.content === 'string' ? item.content : convertStrapiBlocksToHtml(item.content as StrapiBlock[]),
        excerpt: item.excerpt,
        author: item.author,
        publishedAt: item.publishedAt,
        tags: item.tags,
        category: item.category,
        featuredImage: this.getMediaUrl(item.featuredImage as any),
      };
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    try {
      const response = await this.request<ApiResponse<BlogPost[]>>(`/blogs?filters[category][$eq]=${category}&populate=*&sort=publishedAt:desc`);
      
      if (!response.data || !Array.isArray(response.data)) {
        console.error('Invalid blog posts by category response structure:', response);
        return [];
      }
      
      return response.data.map(item => {
        // Handle flat data structure (no attributes wrapper)
        return {
          id: item.id,
          title: item.title,
          slug: item.slug,
          content: typeof item.content === 'string' ? item.content : convertStrapiBlocksToHtml(item.content as StrapiBlock[]),
          excerpt: item.excerpt,
          author: item.author,
          publishedAt: item.publishedAt,
          tags: item.tags,
          category: item.category,
          featuredImage: this.getMediaUrl(item.featuredImage as any),
        };
      });
    } catch (error) {
      console.error('Error fetching blog posts by category:', error);
      return [];
    }
  }

    // Search
  async search(query: string): Promise<{ team: TeamMember[]; services: Service[]; blogs: BlogPost[] }> {
    try {
      const encodedQuery = encodeURIComponent(query);
      const [teamResponse, servicesResponse, blogsResponse] = await Promise.all([
        this.request<ApiResponse<TeamMember[]>>(`/team-members?filters[$or][0][name][$containsi]=${encodedQuery}&filters[$or][1][role][$containsi]=${encodedQuery}&populate=*`),
        this.request<ApiResponse<Service[]>>(`/services?filters[$or][0][title][$containsi]=${encodedQuery}&filters[$or][1][description][$containsi]=${encodedQuery}&populate=*`),
        this.request<ApiResponse<BlogPost[]>>(`/blogs?filters[$or][0][title][$containsi]=${encodedQuery}&filters[$or][1][excerpt][$containsi]=${encodedQuery}&populate=*`),
      ]);

      return {
        team: teamResponse.data.map(item => {
          // Handle flat data structure (no attributes wrapper) - same as getTeamMembers method
          return {
            id: item.id,
            name: item.name,
            role: item.role,
            experience: item.experience,
            specialty: item.specialty,
            image: this.getMediaUrl(item.image as any),
            bio: item.bio,
          };
        }),
        services: servicesResponse.data.map(item => {
          // Handle flat data structure (no attributes wrapper) - same as getServices method
          return {
            id: item.id,
            title: item.title,
            description: item.description,
            content: item.content,
            slug: item.slug,
            features: item.features || [],
            image: this.getMediaUrl(item.image as any),
          };
        }),
        blogs: blogsResponse.data.map(item => {
          // Handle flat data structure (no attributes wrapper)
          return {
            id: item.id,
            title: item.title,
            slug: item.slug,
            content: typeof item.content === 'string' ? item.content : convertStrapiBlocksToHtml(item.content as StrapiBlock[]),
            excerpt: item.excerpt,
            author: item.author,
            publishedAt: item.publishedAt,
            tags: item.tags,
            category: item.category,
            featuredImage: this.getMediaUrl(item.featuredImage as any),
          };
        }),
      };
    } catch (error) {
      console.error('Error performing search:', error);
      return {
        team: [],
        services: [],
        blogs: []
      };
    }
  }

  // Subscribers
  async subscribeToNewsletter(email: string): Promise<Subscriber> {
    const response = await this.request<ApiResponse<StrapiData<Subscriber>>>('/subscribers', {
      method: 'POST',
      body: JSON.stringify({ data: { email } }),
    });

    if (!response.data.attributes) {
      throw new Error('Invalid response structure from newsletter subscription');
    }

    const { id: _, ...attributes } = response.data.attributes;
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
export type { Service, TeamMember, Client, Testimonial, Subscriber, Page, BlogPost };
