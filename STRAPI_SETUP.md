# Strapi CMS Integration Setup

This guide explains how to set up the Strapi CMS integration for the law firm website.

## Prerequisites

1. Node.js 18+ installed
2. Strapi CMS running locally or remotely

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Strapi CMS Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_actual_strapi_api_token_here
```

### Getting the API Token

1. Start Strapi: `cd my-law-firm-cms && npm run develop`
2. Open Strapi admin panel: http://localhost:1337/admin
3. Go to Settings → API Tokens
4. Create a new API token with appropriate permissions
5. Copy the token and add it to your `.env.local` file

## Content Types

Make sure the following content types are created and published in Strapi:

### Services
- title (Text)
- description (Text)
- content (Rich Text)
- slug (UID)
- features (JSON)
- image (Media)

### Team Members
- name (Text)
- role (Text)
- experience (Text)
- specialty (Text)
- image (Media)
- bio (Text)

### Testimonials
- name (Text)
- role (Text)
- company (Text)
- content (Text)
- rating (Number)
- image (Media)

### Clients
- name (Text)
- logo (Media)
- industry (Text)
- testimonial (Text, optional)

### Blogs
- title (Text)
- slug (UID)
- content (Rich Text)
- excerpt (Text)
- featuredImage (Media)
- author (Text)
- publishedAt (DateTime)
- tags (JSON, optional)
- category (Text, optional)

## Running the Application

1. Start Strapi: `cd my-law-firm-cms && npm run develop`
2. In a new terminal, start Next.js: `npm run dev`
3. Open http://localhost:3000

## Testing the Integration

The application includes a `StrapiTest` component that displays:
- Connection status
- Available services
- Team members
- Testimonials

This component helps verify that the Strapi integration is working correctly.

## Troubleshooting

### Common Issues

1. **Connection Failed**: Make sure Strapi is running on the correct port
2. **No Data**: Check if content types are published in Strapi
3. **Image Loading Issues**: Verify media files are uploaded and published
4. **API Errors**: Check browser console for detailed error messages

### Debug Steps

1. Check browser console for API request logs
2. Verify Strapi admin panel shows published content
3. Test API endpoints directly: `curl http://localhost:1337/api/services`
4. Check environment variables are loaded correctly

## Production Deployment

For production, update the environment variables:

```bash
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
STRAPI_API_TOKEN=your_production_api_token
```

Make sure to:
- Use HTTPS URLs
- Set appropriate CORS settings in Strapi
- Configure proper media storage (AWS S3, Cloudinary, etc.)
- Set up proper authentication and permissions
