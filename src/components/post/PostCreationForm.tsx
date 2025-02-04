import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageVideo, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { Post } from "@/types/post";

interface PostCreationFormProps {
  onPostCreated: (post: Post) => void;
}

const PostCreationForm = ({ onPostCreated }: PostCreationFormProps) => {
  const [newPost, setNewPost] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!newPost.trim() && !mediaFile) return;

    const newPostObj: Post = {
      id: uuidv4(),
      userId: "current-user",
      userName: "Nikola",
      content: newPost,
      mediaUrl: mediaPreview || undefined,
      mediaType: mediaFile?.type.startsWith('image/') ? 'image' : 'video',
      createdAt: new Date().toISOString(),
      likes: [],
      comments: []
    };

    onPostCreated(newPostObj);
    setNewPost("");
    setMediaFile(null);
    setMediaPreview(null);
    
    toast({
      title: "Success",
      description: "Post created successfully",
    });
  };

  return (
    <Card className="p-4 bg-[#1a1d21] border-none shadow-lg">
      <Textarea
        placeholder="Share something with the team..."
        className="bg-[#2a2d31] border-none text-gray-300 mb-4 min-h-[96px] resize-none"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />
      {mediaPreview && (
        <div className="mb-4 relative">
          {mediaFile?.type.startsWith('image/') ? (
            <img src={mediaPreview} alt="Upload preview" className="w-full max-h-96 object-cover rounded-lg" />
          ) : (
            <video src={mediaPreview} className="w-full max-h-96 rounded-lg" controls />
          )}
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => {
              setMediaFile(null);
              setMediaPreview(null);
            }}
          >
            Remove
          </Button>
        </div>
      )}
      <div className="flex justify-between items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-[#2a2d31] w-10 h-10 rounded-full"
          onClick={() => document.getElementById('media-upload')?.click()}
        >
          <ImageVideo className="w-5 h-5" />
        </Button>
        <input
          type="file"
          id="media-upload"
          className="hidden"
          accept="image/*,video/*"
          onChange={handleMediaUpload}
        />
        <Button 
          size="icon"
          className="bg-[#E41E12] hover:bg-[#E41E12]/90 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center"
          onClick={handlePost}
          disabled={!newPost.trim() && !mediaFile}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
};

export default PostCreationForm;