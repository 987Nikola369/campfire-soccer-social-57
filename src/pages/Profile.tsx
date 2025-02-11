
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/auth';
import { usePostsStore } from '../store/posts';
import { PostCard } from '../components/post/PostCard';
import { Image } from 'lucide-react';
import { User } from '../types';

export const Profile: React.FC = () => {
  const { user: loggedInUser, updateUser } = useAuthStore();
  const { posts } = usePostsStore();

  const [profilePicture, setProfilePicture] = useState<string | null>(loggedInUser?.profilePicture || null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(loggedInUser?.coverPhoto || null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      setProfilePicture(loggedInUser.profilePicture);
      setCoverPhoto(loggedInUser.coverPhoto);
    }
  }, [loggedInUser]);

  if (!loggedInUser) {
    return <p>Loading...</p>;
  }

  const userPosts = posts.filter(post => post.userId === loggedInUser.id);

  useEffect(() => {
    console.log('Profile - User posts retrieved:', userPosts);
  }, [userPosts]);

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setProfilePicture(base64String);
      localStorage.setItem(`profilePicture_${loggedInUser.email}`, base64String);
      const updatedUser: User = { ...loggedInUser, profilePicture: base64String };
      updateUser(updatedUser);
      console.log('Profile - Profile picture updated:', base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleCoverPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setCoverPhoto(base64String);
      localStorage.setItem(`coverPhoto_${loggedInUser.email}`, base64String);
      const updatedUser: User = { ...loggedInUser, coverPhoto: base64String };
      updateUser(updatedUser);
      console.log('Profile - Cover photo updated:', base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div className="p-4">
      <motion.div
        className="relative rounded-tl-2xl rounded-br-2xl"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <img
          src={coverPhoto || "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150"}
          alt="Cover Photo"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-5/6 bg-gradient-to-t from-black/80 to-transparent" />
        <motion.button
          type="button"
          className="absolute bottom-2 right-2 bg-[#E41E12] text-white rounded-full p-2 hover:bg-[#E41E12]/80 transition-colors"
          style={{zIndex: 10}}
        >
          <label htmlFor="coverPhotoInput" className="cursor-pointer">
            <Image size={20} />
            <input
              id="coverPhotoInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverPhotoUpload}
            />
          </label>
        </motion.button>
        <div className="absolute left-2 bottom-2 text-[#E41E12] font-bold">{loggedInUser.role}</div>

        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-6rem]">
          <div className="flex flex-col items-center relative">
            <div className="relative">
              <img
                src={profilePicture || "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150"}
                alt={loggedInUser.username}
                className="h-20 w-20 rounded-full object-cover border-4 border-[#E41E12]"
              />
              <button
                type="button"
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#E41E12] text-white rounded-full p-1 hover:bg-[#E41E12]/80 transition-colors"
                style={{ bottom: '-0.5rem' }}
              >
                <label htmlFor="profilePictureInput" className="cursor-pointer">
                  <Image size={16} />
                  <input
                    id="profilePictureInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePictureUpload}
                  />
                </label>
              </button>
            </div>
            <h2 className="text-2xl font-bold text-white mt-2">{loggedInUser.username}</h2>
            <p className="text-gray-400 text-sm">Member since {loggedInUser.joinDate.toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>

      <div className="mt-24">
        {userPosts.length === 0 ? (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 text-center text-gray-400">No posts yet</div>
        ) : (
          userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
