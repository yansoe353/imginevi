import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Server Example | AI Image Generator",
  description: "Example of server-side rendering with Supabase in AI Image Generator",
};

export default async function ServerExamplePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  // Get the current user session
  const { data: { session } } = await supabase.auth.getSession();
  
  // Fetch user's images if logged in
  let images = [];
  if (session) {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(5);
      
    if (!error) {
      images = data;
    }
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-white">Server-Side Rendering Example</h1>
      
      <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
        <h2 className="text-2xl font-semibold mb-4 text-white">Authentication Status</h2>
        {session ? (
          <div>
            <p className="text-green-400 mb-2">✓ Authenticated as {session.user.email}</p>
            <p className="text-gray-400">User ID: {session.user.id}</p>
          </div>
        ) : (
          <p className="text-red-400">Not authenticated</p>
        )}
      </div>
      
      {session && (
        <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-white">Your Recent Images</h2>
          {images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="border border-gray-800 rounded-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <img 
                      src={image.image_url} 
                      alt={image.prompt}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-gray-300 truncate">{image.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No images found. Try generating some!</p>
          )}
        </div>
      )}
      
      <div className="flex justify-center">
        <Link href="/generate" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
          Back to Generator
        </Link>
      </div>
    </div>
  );
}
