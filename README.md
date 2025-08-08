# Law Firm Website

A modern, responsive law firm website built with Next.js 15, TypeScript, Tailwind CSS, and Redux Toolkit. Features multilingual support (Arabic/English), CMS integration with Strapi, and a comprehensive set of legal services.

## 🚀 Features

### Core Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Multilingual Support**: Arabic (RTL) and English (LTR) with automatic language switching
- **CMS Integration**: Strapi CMS for content management
- **Search Functionality**: Global search across team members and services
- **Form Handling**: Contact forms and newsletter subscription with Formik validation
- **Performance Optimized**: SSG/SSR support, image optimization, and loading states

### Components
- **HeaderNavigation**: Responsive navbar with services dropdown and language toggle
- **HeroSection**: Auto-playing slider with background images/videos
- **TeamSection**: Team member showcase with carousel
- **ClientsSection**: Client logos and testimonials
- **ServicesSection**: Comprehensive legal services display
- **Footer**: Newsletter subscription and contact information

### Technical Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **State Management**: Redux Toolkit
- **Forms**: Formik with Yup validation
- **Styling**: Tailwind CSS with custom design system
- **CMS**: Strapi (headless CMS)
- **Internationalization**: Custom translation system with RTL support

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Strapi CMS (optional, for full functionality)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd i-o-tech.net
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Strapi CMS Configuration
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   STRAPI_API_TOKEN=your-strapi-api-token
   
   # Next.js Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
i-o-tech.net/
├── app/                    # Next.js 13+ app directory
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   ├── search/            # Search results page
│   └── services/          # Service pages
├── components/            # Reusable components
│   ├── ui/               # Shadcn/ui components
│   ├── Header.tsx        # Navigation header
│   ├── HeroSection.tsx   # Hero section with slider
│   ├── TeamSection.tsx   # Team members section
│   ├── ClientsSection.tsx # Clients and testimonials
│   ├── Footer.tsx        # Footer with newsletter
│   └── SearchModal.tsx   # Search modal component
├── lib/                  # Utility functions and configurations
│   ├── api.ts           # Strapi API service
│   ├── store.ts         # Redux store configuration
│   ├── slices/          # Redux slices
│   ├── translations.ts  # Translation system
│   └── utils.ts         # Utility functions
├── hooks/               # Custom React hooks
│   └── use-translations.ts
└── public/              # Static assets
```

## 🎨 Design System

### Colors
The project uses a custom brown-based color scheme:

```css
/* CSS Variables */
--brown-primary: 25 45% 30%;    /* Dark brown */
--brown-secondary: 30 35% 25%;  /* Medium brown */
--brown-light: 30 25% 85%;      /* Light brown */
--brown-dark: 20 35% 15%;       /* Very dark brown */
```

### Typography
- **Primary Font**: System fonts with fallbacks
- **Arabic Font**: System Arabic fonts
- **Font Sizes**: Responsive typography scale

## 🌐 Multilingual Support

### Translation System
The website supports Arabic and English with automatic RTL/LTR switching:

```typescript
// Using translations in components
import { useTranslations } from '@/hooks/use-translations';

const { t, currentLanguage } = useTranslations();
const title = t('hero.title'); // Returns translated text
```

### RTL Support
- Automatic text direction switching
- Layout adjustments for Arabic
- Proper spacing and alignment

## 🔍 Search Functionality

### Global Search
- Search across team members and services
- Real-time search results
- Categorized results display
- Search modal with keyboard navigation

### Search Implementation
```typescript
// Search functionality
const handleSearch = async (query: string) => {
  const results = await apiService.search(query);
  // Update Redux state with results
};
```

## 📝 Forms and Validation

### Newsletter Subscription
- Email validation with Yup
- Duplicate email prevention
- Success/error messaging
- Formik integration

### Contact Forms
- Comprehensive form validation
- File upload support
- Email notifications
- Form state management

## 🎯 CMS Integration

### Strapi Setup
1. **Install Strapi**
   ```bash
   npx create-strapi-app@latest my-law-firm-cms
   ```

2. **Create Content Types**
   - Services
   - Team Members
   - Clients
   - Testimonials
   - Subscribers
   - Contact Submissions
   - Appointments

3. **Configure API**
   - Set up API tokens
   - Configure CORS
   - Set up media uploads

### API Endpoints
```typescript
// Available API endpoints
GET /api/services          // Get all services
GET /api/services/:slug    // Get specific service
GET /api/team-members      // Get team members
GET /api/clients           // Get clients
GET /api/testimonials      // Get testimonials
POST /api/subscribers      // Subscribe to newsletter
POST /api/contact-submissions // Submit contact form
POST /api/appointments     // Book appointment
```

## 🚀 Deployment

### Vercel Deployment
1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Environment Variables**
   Set up environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_STRAPI_URL`
   - `STRAPI_API_TOKEN`

3. **Build Configuration**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install"
   }
   ```

### Other Platforms
- **Netlify**: Configure build settings and environment variables
- **AWS Amplify**: Use Amplify CLI for deployment
- **Docker**: Use provided Dockerfile for containerized deployment

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Code Quality
- **ESLint**: Code linting and formatting
- **TypeScript**: Type safety and IntelliSense
- **Prettier**: Code formatting
- **Husky**: Git hooks for code quality

## 📊 Performance

### Optimization Techniques
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Component and image lazy loading
- **Caching**: Static generation and ISR
- **Bundle Analysis**: Webpack bundle analyzer

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Analytics**: Google Analytics integration
- **Error Tracking**: Error boundary implementation

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Documentation**: Check the project documentation
- **Issues**: Create an issue on GitHub
- **Email**: Contact the development team

## 🔄 Updates

### Version History
- **v1.0.0**: Initial release with core features
- **v1.1.0**: Added multilingual support
- **v1.2.0**: Enhanced CMS integration
- **v1.3.0**: Performance optimizations

### Upcoming Features
- [ ] Blog system integration
- [ ] Advanced appointment booking
- [ ] Client portal
- [ ] Document management
- [ ] Video consultations
- [ ] Mobile app

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
