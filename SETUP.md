# Setup Guide for SEO Image Generator

This guide provides detailed instructions for setting up the backend infrastructure (Supabase database and Google OAuth) for the SEO Image Generator project.

## Supabase Setup

### 1. Create a Supabase Account and Project

1. Go to [supabase.com](https://supabase.com) and sign up or log in
2. Create a new project by providing a name and password
3. Wait for the project to be created (may take a few minutes)

### 2. Set Up Database Schema

1. In your Supabase project dashboard, navigate to the SQL Editor
2. Copy the contents of the `supabase/schema.sql` file in this repository
3. Paste the SQL into the SQL Editor and click "Run"

### 3. Get Supabase Credentials

1. In your Supabase project dashboard, go to Project Settings > API
2. Copy the "Project URL" - this is your `NEXT_PUBLIC_SUPABASE_URL`
3. Copy the "anon public" key - this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Add these to your `.env.local` file

## Google OAuth Setup

### 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"

### 2. Configure OAuth Consent Screen

1. Click "Configure Consent Screen"
2. Choose "External" for User Type
3. Fill in the required app information:
   - App name: "SEO Image Generator"
   - User support email: your email
   - Developer contact information: your email
4. Click "Save and Continue"
5. Add scopes: select at minimum "email" and "profile"
6. Click "Save and Continue" and complete the setup

### 3. Create OAuth Client ID

1. Go back to the "Credentials" page
2. Click "Create Credentials" > "OAuth client ID"
3. Application type: "Web application"
4. Name: "SEO Image Generator Web Client"
5. Add Authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - Your production domain if applicable
6. Add Authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - `https://YOUR_SUPABASE_PROJECT_URL/auth/v1/callback` (replace with your actual Supabase project URL)
   - Your production domain if applicable
7. Click "Create"
8. Copy the Client ID - this is your `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
9. Add it to your `.env.local` file

### 4. Configure Supabase Auth

1. In your Supabase dashboard, go to Authentication > Providers
2. Find and click on "Google"
3. Toggle to enable Google auth
4. Paste your Google Client ID and Client Secret
5. For "Authorized Redirect URLs", add:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - Your production domain redirect URL if applicable
6. Click "Save"

## Gemini API Setup

### 1. Get Gemini API Key

1. Go to [ai.google.dev](https://ai.google.dev/) and sign in with your Google account
2. Click on "Get API key" or navigate to the API key section
3. Create a new API key or use an existing one
4. Copy the API key - this is your `GEMINI_API_KEY`
5. Add it to your `.env.local` file

### 2. Enable Gemini API in Google Cloud

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "APIs & Services" > "Library"
4. Search for "Gemini API" or "Generative Language API"
5. Enable the API for your project

## Environment Variables

Ensure your `.env.local` file has all the required variables:

```
# Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

## Start the Application

Once you've completed all the setup steps, you can start the application:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application should now be running with full functionality!

## Troubleshooting

### Authentication Issues

- **Google login not working**: Ensure your domains are properly configured in both Google Cloud Console and Supabase.
- **CORS errors**: Verify your origins are correctly set up in the Google Cloud Console.
- **Redirect errors**: Double-check all redirect URIs in both Google Cloud Console and Supabase.

### Database Issues

- **RLS errors**: Make sure the Row Level Security policies are properly set up from the schema.sql file.
- **Permission denied**: Check that your Supabase anonymouse key has the necessary permissions.

### API Issues

- **Gemini API errors**: Ensure your API key is valid and the API is enabled in your Google Cloud project.
- **Rate limiting**: Google Gemini API may have rate limits - check your quota in the Google Cloud Console.
