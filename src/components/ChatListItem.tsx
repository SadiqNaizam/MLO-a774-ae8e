import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge'; // For unread count
import { cn } from '@/lib/utils';

interface ChatListItemProps {
  id: string;
  avatarUrl?: string;
  contactName: string;
  lastMessage: string;
  lastMessageTimestamp: string; // e.g., "10:30 AM" or "Yesterday"
  unreadCount?: number;
  isActive?: boolean; // If this is the currently active chat
  onClick: (id: string) => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  id,
  avatarUrl,
  contactName,
  lastMessage,
  lastMessageTimestamp,
  unreadCount,
  isActive,
  onClick,
}) => {
  console.log("Rendering ChatListItem for contact:", contactName);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <button
      onClick={() => onClick(id)}
      className={cn(
        "w-full flex items-center p-3 hover:bg-muted transition-colors text-left",
        isActive && "bg-muted"
      )}
    >
      <Avatar className="h-12 w-12 mr-3">
        <AvatarImage src={avatarUrl || undefined} alt={contactName} />
        <AvatarFallback>{getInitials(contactName)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm truncate">{contactName}</h3>
          <span className="text-xs text-muted-foreground">{lastMessageTimestamp}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-muted-foreground truncate pr-2">{lastMessage}</p>
          {unreadCount && unreadCount > 0 && (
            <Badge variant="default" className="h-5 px-2 text-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
};

export default ChatListItem;