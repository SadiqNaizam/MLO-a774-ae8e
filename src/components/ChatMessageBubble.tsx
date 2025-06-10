import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Optional for received messages

interface ChatMessageBubbleProps {
  messageId: string;
  content: string;
  timestamp: string; // e.g., "10:32 AM"
  isSentByCurrentUser: boolean;
  senderAvatarUrl?: string; // Only for received messages
  senderName?: string; // Only for received messages (for fallback)
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed'; // For sent messages
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  messageId,
  content,
  timestamp,
  isSentByCurrentUser,
  senderAvatarUrl,
  senderName,
  status,
}) => {
  console.log(`Rendering ChatMessageBubble: ${messageId}, sentByCurrentUser: ${isSentByCurrentUser}`);

  const getInitials = (name?: string) => {
    if (!name) return '';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Basic styling, can be significantly enhanced
  return (
    <div
      className={cn(
        "flex items-end gap-2 mb-4 max-w-[75%] md:max-w-[60%]",
        isSentByCurrentUser ? "self-end ml-auto" : "self-start mr-auto"
      )}
    >
      {!isSentByCurrentUser && (
        <Avatar className="h-8 w-8 self-end">
          <AvatarImage src={senderAvatarUrl} alt={senderName} />
          <AvatarFallback>{getInitials(senderName)}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "p-3 rounded-lg shadow-sm",
          isSentByCurrentUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted text-foreground rounded-bl-none"
        )}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
        <div
          className={cn(
            "text-xs mt-1",
            isSentByCurrentUser ? "text-primary-foreground/70 text-right" : "text-muted-foreground/70 text-left"
          )}
        >
          {timestamp}
          {isSentByCurrentUser && status && status !== 'sent' && (
            <span className="ml-1 text-xs italic">
              {status === 'sending' && ' (sending...)'}
              {status === 'delivered' && ' (delivered)'}
              {status === 'read' && ' (read)'}
              {status === 'failed' && ' (failed)'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageBubble;