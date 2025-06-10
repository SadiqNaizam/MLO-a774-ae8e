import React, { useState } from 'react';
import NavigationMenu from '@/components/NavigationMenu';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ImageUp, MapPin, Tag, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
  console.log('CreatePostPage loaded');
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handlePublish = () => {
    console.log("Publishing post:", { caption, imagePreview, tags, location });
    // Add logic to upload and create post
    navigate('/feed'); // Navigate to feed after successful post
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-3 border-b flex justify-between items-center sticky top-0 bg-background z-10">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Go back">
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Create Post</h1>
        </div>
        <Button size="sm" onClick={handlePublish} disabled={!imagePreview && !caption.trim()}>Publish</Button>
      </header>

      <main className="flex-grow p-4 space-y-6 overflow-y-auto pb-24 md:pb-8">
        <section>
          <label htmlFor="imageUpload" className="cursor-pointer">
            <AspectRatio ratio={4 / 3} className="bg-muted rounded-md border-2 border-dashed border-border hover:border-primary transition-colors flex flex-col items-center justify-center text-muted-foreground">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="object-contain w-full h-full rounded-md" />
              ) : (
                <>
                  <ImageUp className="h-12 w-12 mb-2" />
                  <p>Tap to upload image or video</p>
                  <p className="text-xs">(Max 10MB)</p>
                </>
              )}
            </AspectRatio>
          </label>
          <Input id="imageUpload" type="file" className="hidden" accept="image/*,video/*" onChange={handleImageUpload} />
        </section>

        <section>
          <Textarea
            placeholder="Write a caption..."
            rows={4}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="text-base"
          />
        </section>
        
        <section className="space-y-3">
            <div className="flex items-center gap-2 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <Input 
                    type="text" 
                    placeholder="Tag people (e.g. @username)" 
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="border-none focus-visible:ring-0 p-0 h-auto bg-transparent" 
                />
            </div>
            <div className="flex items-center gap-2 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <Input 
                    type="text" 
                    placeholder="Add location" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border-none focus-visible:ring-0 p-0 h-auto bg-transparent" 
                />
            </div>
        </section>
      </main>
      <NavigationMenu />
    </div>
  );
};

export default CreatePostPage;