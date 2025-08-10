// Configuration file for the application
export const config = {
  strapi: {
    url: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
    apiToken: process.env.STRAPI_API_TOKEN || '',
  },
  app: {
    name: 'Law Firm Website',
    description: 'Professional law firm website built with Next.js and Strapi CMS',
  },
};

// Helper function to get Strapi URL
export const getStrapiUrl = (path: string = '') => {
  return `${config.strapi.url}${path}`;
};

// Helper function to get Strapi API URL
export const getStrapiApiUrl = (endpoint: string = '') => {
  return `${config.strapi.url}/api${endpoint}`;
};
