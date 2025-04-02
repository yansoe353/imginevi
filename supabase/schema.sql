-- Create images table for storing user-generated images
CREATE TABLE IF NOT EXISTS images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  prompt TEXT NOT NULL,
  style TEXT,
  aspect_ratio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Set up RLS (Row Level Security) to restrict access to images
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to select only their own images
CREATE POLICY "Users can view their own images" 
  ON images FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy to allow users to insert their own images
CREATE POLICY "Users can insert their own images" 
  ON images FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to delete their own images
CREATE POLICY "Users can delete their own images" 
  ON images FOR DELETE 
  USING (auth.uid() = user_id);

-- Create function to update updated_at on record changes
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_images_updated_at
  BEFORE UPDATE ON images
  FOR EACH ROW
  EXECUTE FUNCTION update_modified_column();

-- Create index for faster queries by user_id
CREATE INDEX IF NOT EXISTS images_user_id_idx ON images(user_id);

-- Create index for sorting by created_at
CREATE INDEX IF NOT EXISTS images_created_at_idx ON images(created_at DESC);
