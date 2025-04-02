# AI Image Generator

A modern, responsive web application that generates high-quality images using Google Gemini Flash 2.0. Users can describe images through text prompts and customize generation settings to create unique visuals for various purposes.

![AI Image Generator Screenshot](/public/landscape.png)

## Overview

This AI Image Generator allows users to:

- Create custom images from text descriptions
- Choose from multiple artistic styles (realistic, cartoon, 3D, etc.)
- Select different aspect ratios for various use cases
- Download generated images
- Share creations across social media platforms
- Save favorite generations in a personal library (authenticated users)

## Tech Stack & Integrations

### Core Technologies

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript for improved developer experience
- **Tailwind CSS**: Utility-first CSS framework for streamlined styling
- **Supabase**: Backend-as-a-service for authentication and database storage
- **Google Gemini Flash 2.0**: Advanced AI model for image generation

### Key Integrations

1. **Authentication**
   - Google OAuth integration through Supabase
   - Persistent login sessions
   - Protected routes for authenticated features

2. **Image Generation**
   - Integration with Google Gemini Flash 2.0 API
   - Customization options (style, aspect ratio)
   - Image storage and retrieval

3. **Sharing Capabilities**
   - Web Share API integration
   - Social media sharing (Facebook, Twitter, LinkedIn)
   - Email sharing functionality
   - Clipboard link copying

4. **User Management**
   - User registration and authentication
   - Personal image library for authenticated users
   - Usage limitations for free vs. signed-in users

## SEO Optimizations

This project implements numerous SEO best practices:

### Metadata & Schema Markup

- **Comprehensive Metadata**: Custom metadata for all pages with targeted keywords, descriptions, and titles
- **Open Graph Protocol**: Enhanced social sharing with OG tags for title, description, and images
- **Twitter Cards**: Optimized Twitter sharing appearance with proper card type and metadata
- **Schema.org JSON-LD**: Structured data implementation for improved search engine understanding
- **Canonical URLs**: Proper canonical URL implementation to prevent duplicate content issues

### Technical SEO

- **Sitemap Generation**: Dynamic sitemap.xml creation with prioritized URLs
- **Robots.txt Configuration**: Properly configured robots.txt for search engine crawling guidance
- **Semantic HTML**: Proper heading hierarchy and semantic markup for accessibility and SEO
- **Responsive Design**: Mobile-friendly layout for improved mobile rankings
- **Image Optimization**: Next.js Image component usage with proper alt text and lazy loading

### Content & User Experience

- **SEO-Friendly URLs**: Clear, descriptive URLs for each page
- **Keyword Targeting**: Strategic keyword placement in headings, content, and metadata
- **Fast Loading Times**: Optimized performance for better user experience and search rankings
- **Accessible Design**: Semantic HTML and proper contrast for improved accessibility scores

## Best Practices

The project follows several development and design best practices:

### Code Quality

- Component-based architecture for reusability
- TypeScript for type safety
- Clean code organization and documentation
- Error handling for improved reliability

### User Experience

- Responsive design for all device sizes
- Progressive enhancement for core functionality
- Accessible design principles (semantic HTML, ARIA attributes)
- Intuitive interface with clear user flows

### Performance

- Server-side rendering for improved initial load times
- Image optimization with Next.js Image component
- Lazy loading of non-critical resources
- Efficient state management

### Security

- OAuth authentication for secure login
- Environment variable protection for sensitive keys
- Protected API routes for secure operations
- Form validation and input sanitization

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project
- Google Cloud Console project with OAuth credentials
- API key for image generation service

### Installation

1. Clone the repository
```bash
git clone https://github.com/Shoyo-Hin4ta/image-gen.git
cd image-gen
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file with the following:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

```
├── app/                    # Next.js app directory and routes
│   ├── api/                # API routes
│   ├── generate/           # Image generation page
│   ├── examples/           # Examples/How It Works page  
│   └── layout.tsx          # Root layout with metadata
├── components/             # Reusable UI components
│   ├── ui/                 # Core UI components 
│   ├── image-generator.tsx # Main image generation component
│   └── ...
├── context/                # React context providers
│   └── auth-context.tsx    # Authentication context
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and libraries
│   └── generate-image.ts   # Image generation logic
├── public/                 # Static assets
│   └── ...
└── utils/                  # Helper utilities
    └── supabase/           # Supabase client utilities
```

## Features

### Image Generation
Users can generate custom images by:
1. Entering a detailed text prompt
2. Selecting from 20+ artistic styles
3. Choosing an aspect ratio
4. Clicking "Generate Image"

### User Accounts
- Free trial: 1 images without sign-in
- Unlimited generations for authenticated users
- Personal image library for saving and organizing generations

### Sharing & Downloading
- Direct download of generated images
- Multiple sharing options (device share, social media, email)
- Link copying for sharing elsewhere

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Google Gemini](https://deepmind.google/technologies/gemini/)
