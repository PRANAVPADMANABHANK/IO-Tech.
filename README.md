# Law Firm Website

A professional law firm website built with Next.js 15, TypeScript, Tailwind CSS, and Redux Toolkit. The website features a dark brown theme with multilingual support (Arabic/English) and comprehensive legal services.

## Features

### ✅ Implemented Features

#### Header Navigation
- ✅ Responsive navbar with logo and navigation links
- ✅ Services dropdown with comprehensive service categories
- ✅ Search functionality with categorized results (Team & Services)
- ✅ Multilingual support (AR/EN) with RTL for Arabic
- ✅ "Book Appointment" button

#### Hero Section
- ✅ Background images/videos from CMS (simulated)
- ✅ Auto-play slider with smooth transitions
- ✅ Multilingual support with RTL for Arabic
- ✅ Professional lawyer image integration

#### Our Team
- ✅ Team members display with images, names, and roles
- ✅ Carousel navigation for team members
- ✅ Responsive grid layout

#### Services Section
- ✅ Comprehensive legal services display
- ✅ Service categories and descriptions
- ✅ Call-to-action for consultations

#### Testimonials Section
- ✅ Client testimonials with ratings
- ✅ Carousel navigation
- ✅ Professional presentation

#### Footer
- ✅ Multiple link categories
- ✅ Newsletter subscription form with Formik validation
- ✅ Email validation with duplicate prevention
- ✅ Success/error message handling
- ✅ Multilingual support

#### Technical Implementation
- ✅ **Frontend**: Next.js 15 with TypeScript
- ✅ **Styling**: Tailwind CSS with dark brown theme
- ✅ **State Management**: Redux Toolkit
- ✅ **Form Handling**: Formik with Yup validation
- ✅ **Multilingual**: RTL support for Arabic
- ✅ **Performance**: Optimized images and loading states
- ✅ **Routing**: Dynamic service pages (`/services/[service-id]`)
- ✅ **Search**: Dedicated search page with categorized results

### 🎨 Design Features
- ✅ Dark brown, white, and black color scheme
- ✅ Responsive design for all devices
- ✅ Professional typography and spacing
- ✅ Smooth animations and transitions
- ✅ Grayscale/dark filter style for images

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles with RTL support
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Homepage
│   ├── search/page.tsx      # Search results page
│   └── services/[service-id]/page.tsx  # Dynamic service pages
├── components/
│   ├── Header.tsx           # Navigation with search and language
│   ├── HeroSection.tsx      # Hero with carousel controls
│   ├── ServicesSection.tsx  # Services display
│   ├── TeamSection.tsx      # Team members carousel
│   ├── TestimonialsSection.tsx  # Client testimonials
│   ├── Footer.tsx           # Footer with subscription form
│   ├── SearchModal.tsx      # Search modal component
│   ├── providers.tsx        # Redux and other providers
│   └── ui/                  # Shadcn/ui components
├── lib/
│   ├── store.ts             # Redux store configuration
│   ├── hooks.ts             # Typed Redux hooks
│   └── slices/              # Redux slices
│       ├── searchSlice.ts   # Search state management
│       ├── languageSlice.ts # Language/RTL state
│       └── formSlice.ts     # Form state management
└── hooks/
    └── use-toast.ts         # Toast notifications
```

## State Management

### Redux Store Structure
- **Search State**: Query, results, loading, modal state
- **Language State**: Current language (EN/AR), RTL support
- **Form State**: Subscription and appointment form states

### Key Features
- Search functionality with categorized results
- Language switching with RTL support
- Form validation and error handling
- Toast notifications for user feedback

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lawfirm-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Dependencies

### Core Dependencies
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **Formik** - Form handling
- **Yup** - Form validation
- **React Redux** - Redux React bindings

### UI Components
- **Shadcn/ui** - Component library
- **Lucide React** - Icons
- **Tailwind CSS Animate** - Animations

## CMS Integration (Strapi)

The website is designed to integrate with Strapi CMS for content management:

### Required Collections
- **Pages** - Static page content
- **Services** - Legal services with details
- **Team Members** - Team profiles and images
- **Blog** - Blog posts and articles
- **Clients** - Client testimonials and logos
- **Subscribers** - Newsletter subscribers

### API Endpoints
- Content fetching for dynamic pages
- Form submissions (subscription, appointments)
- Search functionality
- Image and media management

## Multilingual Support

### Features
- Arabic (AR) and English (EN) language support
- RTL (Right-to-Left) layout for Arabic
- Language switching with Redux state management
- Proper text direction and alignment

### Implementation
- Redux state for language management
- CSS classes for RTL support
- Dynamic content based on language selection

## Performance Optimizations

- ✅ Image optimization with Next.js Image component
- ✅ Lazy loading for components
- ✅ Debounced search functionality
- ✅ Optimized bundle size
- ✅ Loading states for better UX

## Future Enhancements

### Planned Features
- [ ] Strapi CMS integration
- [ ] Blog functionality
- [ ] Contact form with appointment booking
- [ ] Advanced search filters
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] PWA capabilities

### Technical Improvements
- [ ] API route implementation
- [ ] Database integration
- [ ] Authentication system
- [ ] Admin dashboard
- [ ] Content management system

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team.

---

**Note**: This is a frontend implementation. For production deployment, you'll need to:
1. Set up Strapi CMS backend
2. Configure environment variables
3. Set up hosting and deployment
4. Implement API routes for data fetching
5. Add proper SEO meta tags
6. Configure analytics and monitoring
