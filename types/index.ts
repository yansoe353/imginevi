// Database Types
export interface UserImage {
  id: string;
  user_id: string;
  image_url: string;
  prompt: string;
  style?: string;
  aspect_ratio?: string;
  created_at: string;
  updated_at?: string;
}

// API Response Types
export interface GenerateImageResponse {
  imageUrl: string;
  error?: string;
}

// Form Types
export interface ImageGenerationForm {
  prompt: string;
  style: string;
  aspectRatio: string;
}

// Additional Types
export type SupportedImageStyle = 
  | 'realistic' 
  | 'cartoon' 
  | '3d' 
  | 'pixel' 
  | 'painting' 
  | 'sketch';

export type SupportedAspectRatio = 
  | '1:1' 
  | '4:3' 
  | '16:9' 
  | '9:16' 
  | '21:9';
