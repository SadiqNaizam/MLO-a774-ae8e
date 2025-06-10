import React from 'react';
import NavigationMenu from '@/components/NavigationMenu';
import FeedPostCard from '@/components/FeedPostCard';
import { ScrollArea } from '@/components/ui/scroll-area';
// import { Button } from '@/components/ui/button'; // Create Post is in NavMenu
// import { PlusSquare } from 'lucide-react';

const placeholderPosts = [
  { postId: 'post1', userAvatarUrl: 'https://source.unsplash.com/random/100x100?woman,smile', userName: 'Sarah Day', userHandle: '@sarahday', postTimestamp: '2h ago', postTextContent: 'Beautiful sunset today! 🌅 #nature #sunsetlover', postImageUrl: 'https://source.unsplash.com/random/800x600?sunset,sky', likeCount: 152, commentCount: 12, isLikedByCurrentUser: true },
  { postId: 'post2', userAvatarUrl: 'https://source.unsplash.com/random/100x100?man,beard', userName: 'John Creative', userHandle: '@johncreative', postTimestamp: '5h ago', postTextContent: 'Just finished a new illustration. What do you guys think? 🎨', postImageUrl: 'https://source.unsplash.com/random/800x600?art,abstract', likeCount: 230, commentCount: 45, isLikedByCurrentUser: false },
  { postId: 'post3', userAvatarUrl: 'https://source.unsplash.com/random/100x100?person,tech', userName: 'Tech Explorer', userHandle: '@techexplorer', postTimestamp: '1d ago', postTextContent: 'Exploring the latest in AI. Fascinating developments! 🤖\n\nRead more on my blog: example.com/blog/ai-trends', likeCount: 98, commentCount: 5, isLikedByCurrentUser: false },
];

const FeedPage = () => {
  console.log('FeedPage loaded');

  const handleLikeToggle = (postId: string) => console.log(`Toggled like for post ${postId}`);
  const handleComment = (postId: string) => console.log(`Comment on post ${postId}`);
  const handleShare = (postId: string) => console.log(`Share post ${postId}`);
  const handleMoreOptions = (postId: string) => console.log(`More options for post ${postId}`);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Feed</h1>
          {/* Create Post button is part of NavigationMenu, but an icon could be here too */}
          {/* <Button variant="ghost" size="icon" onClick={() => navigate('/create-post')}> <PlusSquare /> </Button> */}
        </div>
      </header>

      <ScrollArea className="flex-grow py-4 pb-20 md:pb-4">
        <div className="container mx-auto max-w-xl space-y-6">
          {placeholderPosts.map(post => (
            <FeedPostCard
              key={post.postId}
              postId={post.postId}
              userAvatarUrl={post.userAvatarUrl}
              userName={post.userName}
              userHandle={post.userHandle}
              postTimestamp={post.postTimestamp}
              postTextContent={post.postTextContent}
              postImageUrl={post.postImageUrl}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              isLikedByCurrentUser={post.isLikedByCurrentUser}
              onLikeToggle={handleLikeToggle}
              onComment={handleComment}
              onShare={handleShare}
              onMoreOptions={handleMoreOptions}
            />
          ))}
        </div>
      </ScrollArea>
      <NavigationMenu />
    </div>
  );
};

export default FeedPage;