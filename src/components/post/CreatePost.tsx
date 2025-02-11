import React, { useState } from 'react';
import { Image, Send } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { usePostsStore } from '../../store/posts';
import { motion } from 'framer-motion';

export const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<string[]>([]);
  const { user } = useAuthStore();
  const { addPost } = usePostsStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addPost(user.id, content, media);
    setContent('');
    setMedia([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newMedia = Array.from(files).map(file => URL.createObjectURL(file));
    setMedia(prevMedia => [...prevMedia, ...newMedia]);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-[#16171E] backdrop-blur-sm rounded-lg p-4 mb-6 relative"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <img
        src={user?.profilePicture || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150'}
        alt={user?.username}
        className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 h-16 w-16 rounded-full object-cover border-4 border-[#E41E12] bg-gray-900/50 backdrop-blur-sm"
      />
      <div className="flex flex-col items-center space-y-4 pt-10">
        <div className="w-full">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none p-2 border border-gray-700 rounded-md"
            rows={3}
          />

          {media.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2 mt-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {media.map((url, index) => (
                <motion.img
                  key={index}
                  src={url}
                  alt="Upload preview"
                  className="rounded-lg w-full mt-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </motion.div>
          )}

          <div className="flex justify-between items-center mt-4">
            <motion.button
              type="button"
              className="text-gray-400 hover:text-[#E41E12] transition-colors"
              onClick={() => {
                const fileInput = document.getElementById('fileInput') as HTMLInputElement;
                if (fileInput) {
                  fileInput.click();
                }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image size={20} />
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                multiple
                onChange={handleImageUpload}
              />
            </motion.button>

            <motion.button
              type="submit"
              disabled={content.trim() === '' && media.length === 0}
              className="bg-[#E41E12] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#E41E12]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.form>
  );
};
