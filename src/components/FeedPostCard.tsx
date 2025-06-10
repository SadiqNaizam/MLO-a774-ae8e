import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, Heart, Share2, MoreHorizontal } from 'lucide-react'; // Example icons
import { AspectRatio } from '@/components/ui/aspect-ratio'; // If posts can have images

interface FeedPostCardProps {
  postId: string;
  userAvatarUrl?: string;
  userName: string;
  userHandle: string; // e.g., @username
  postTimestamp: string; // e.g., "2h ago" or "Jul 15"
  postTextContent: string;
  postImageUrl?: string;
  likeCount: number;
  commentCount: number;
  isLikedByCurrentUser?: boolean;
  onLikeToggle: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare?: (postId: string) => void; // Optional share action
  onMoreOptions?: (postId: string) => void; // Optional more options action
}

const FeedPostCard: React.FC<FeedPostCardProps> = ({
  postId,
  userAvatarUrl,
  userName,
  userHandle,
  postTimestamp,
  postTextContent,
  postImageUrl,
  likeCount,
  commentCount,
  isLikedByCurrentUser,
  onLikeToggle,
  onComment,
  onShare,
  onMoreOptions,
}) => {
  console.log("Rendering FeedPostCard for post:", postId);

  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Card className="w-full max-w-xl mx-auto mb-4">
      <CardHeader className="flex flex-row items-center space-x-3 p-4">
        <Avatar>
          <AvatarImage src={userAvatarUrl} alt={userName} />
          <AvatarFallback>{getInitials(userName)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{userName}</span>
            <span className="text-xs text-muted-foreground">{userHandle}</span>
            <span className="text-xs text-muted-foreground">&middot;</span>
            <span className="text-xs text-muted-foreground">{postTimestamp}</span>
          </div>
        </div>
        {onMoreOptions && (
          <Button variant="ghost" size="icon" onClick={() => onMoreOptions(postId)} aria-label="More options">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm whitespace-pre-wrap break-words mb-3">
          {postTextContent}
        </p>
        {postImageUrl && (
          <div className="rounded-lg overflow-hidden border">
            <AspectRatio ratio={16 / 9}>
              <img
                src={postImageUrl}
                alt={`Post by ${userName}`}
                className="object-cover w-full h-full"
                onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails to load
              />
            </AspectRatio>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-2 border-t">
        <Button variant="ghost" size="sm" onClick={() => onComment(postId)} className="text-muted-foreground hover:text-primary">
          <MessageCircle className="h-4 w-4 mr-2" />
          {commentCount > 0 && <span>{commentCount}</span>}
          <span className="sr-only">Comment</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLikeToggle(postId)}
          className={isLikedByCurrentUser ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500"}
        >
          <Heart className={cn("h-4 w-4 mr-2", isLikedByCurrentUser && "fill-current")} />
          {likeCount > 0 && <span>{likeCount}</span>}
          <span className="sr-only">Like</span>
        </Button>
        {onShare && (
          <Button variant="ghost" size="sm" onClick={() => onShare(postId)} className="text-muted-foreground hover:text-primary">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FeedPostCard;