import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/NavigationMenu';
import FeedPostCard from '@/components/FeedPostCard';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, UserPlus, MessageSquare } from 'lucide-react';

// Sample posts for user profile
const userPosts = [
  { postId: 'userpost1', userAvatarUrl: 'https://source.unsplash.com/random/100x100?woman,profile', userName: 'Jane Doe', userHandle: '@janedoe', postTimestamp: '3d ago', postTextContent: 'Loved hiking this trail! #adventure', postImageUrl: 'https://source.unsplash.com/random/800x600?hiking,mountain', likeCount: 75, commentCount: 8, isLikedByCurrentUser: false },
  { postId: 'userpost2', userAvatarUrl: 'https://source.unsplash.com/random/100x100?woman,profile', userName: 'Jane Doe', userHandle: '@janedoe', postTimestamp: '1w ago', postTextContent: 'My new workspace setup. Feeling productive!', postImageUrl: 'https://source.unsplash.com/random/800x600?workspace,desk', likeCount: 120, commentCount: 15, isLikedByCurrentUser: true },
];


const UserProfilePage = () => {
  const { userId } = useParams<{ userId?: string }>(); // userId is optional for current user's profile
  const navigate = useNavigate();
  console.log(`UserProfilePage loaded for userId: ${userId || 'current user'}`);

  const isCurrentUser = !userId || userId === 'me'; // Simplified logic for current user

  const profileData = {
    name: isCurrentUser ? 'Your Name' : 'Jane Doe',
    handle: isCurrentUser ? '@yourhandle' : '@janedoe',
    avatarUrl: isCurrentUser ? 'https://source.unsplash.com/random/150x150?user,selfie' : 'https://source.unsplash.com/random/150x150?woman,profile',
    bio: 'Lover of coffee, code, and travel. Exploring the world one line of code at a time. This is a sample bio text. It can be a bit longer.',
    followers: isCurrentUser ? 250 : 1250,
    following: isCurrentUser ? 180 : 300,
  };
  
  const handleLikeToggle = (postId: string) => console.log(`Toggled like for post ${postId}`);
  const handleComment = (postId: string) => console.log(`Comment on post ${postId}`);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow pt-6 pb-24 md:pb-8 container mx-auto px-4">
        <section className="flex flex-col items-center md:flex-row md:items-start md:gap-8 mb-8">
          <Avatar className="w-28 h-28 md:w-36 md:h-36 text-5xl border-2 border-primary">
            <AvatarImage src={profileData.avatarUrl} alt={profileData.name} />
            <AvatarFallback>{profileData.name.split(' ').map(n=>n[0]).join('').toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="mt-4 md:mt-0 text-center md:text-left flex-grow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">{profileData.name}</h1>
                    <p className="text-muted-foreground text-sm">{profileData.handle}</p>
                </div>
                {isCurrentUser ? (
                  <Button variant="outline" size="sm" className="mt-4 md:mt-0" onClick={() => console.log('Edit profile')}>
                    <Settings className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button size="sm"><UserPlus className="mr-2 h-4 w-4" /> Follow</Button>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/chat/new?userId=${userId}`)}><MessageSquare className="mr-2 h-4 w-4"/> Message</Button>
                  </div>
                )}
            </div>
            <p className="mt-3 text-sm text-foreground max-w-prose">{profileData.bio}</p>
            <div className="flex gap-6 mt-4 justify-center md:justify-start">
              <div><span className="font-bold text-foreground">{profileData.postsCount || userPosts.length}</span> <span className="text-muted-foreground">posts</span></div>
              <div><span className="font-bold text-foreground">{profileData.followers}</span> <span className="text-muted-foreground">followers</span></div>
              <div><span className="font-bold text-foreground">{profileData.following}</span> <span className="text-muted-foreground">following</span></div>
            </div>
          </div>
        </section>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:max-w-md">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="reels">Reels</TabsTrigger> {/* Placeholder for other content types */}
            <TabsTrigger value="tagged">Tagged</TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-6">
            {/* User's posts - could be a grid of images or FeedPostCards */}
            {userPosts.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4">
                    {userPosts.map(post => (
                        // For a grid, a simpler card or just an image with AspectRatio might be better
                        // Reusing FeedPostCard for now for consistency, but it's large for a grid
                         <div key={post.postId} className="max-w-full">
                            <FeedPostCard
                                {...post}
                                userName={profileData.name} // ensure consistency with profile
                                userHandle={profileData.handle}
                                userAvatarUrl={profileData.avatarUrl}
                                onLikeToggle={handleLikeToggle}
                                onComment={handleComment}
                             />
                         </div>
                    ))}
                 </div>
            ) : (
                <div className="text-center py-12 text-muted-foreground">
                    <h3 className="text-xl font-semibold">No Posts Yet</h3>
                    {isCurrentUser && <p>Share your first photo or video!</p>}
                </div>
            )}
          </TabsContent>
          <TabsContent value="reels" className="text-center py-12 text-muted-foreground">No reels yet.</TabsContent>
          <TabsContent value="tagged" className="text-center py-12 text-muted-foreground">No tagged posts yet.</TabsContent>
        </Tabs>
      </main>
      <NavigationMenu />
    </div>
  );
};

export default UserProfilePage;