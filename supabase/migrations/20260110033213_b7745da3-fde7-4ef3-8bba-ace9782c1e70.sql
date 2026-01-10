-- Create storage bucket for user uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true);

-- Allow anyone to upload files to the uploads bucket
CREATE POLICY "Anyone can upload files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'uploads');

-- Allow anyone to view uploaded files
CREATE POLICY "Anyone can view uploaded files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'uploads');

-- Allow users to delete their own uploaded files
CREATE POLICY "Anyone can delete uploaded files"
ON storage.objects
FOR DELETE
USING (bucket_id = 'uploads');