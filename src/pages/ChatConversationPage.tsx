import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/NavigationMenu';
import ChatMessageBubble from '@/components/ChatMessageBubble';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Paperclip, Send } from 'lucide-react';

const placeholderMessages = [
  { messageId: 'msg1', content: 'Hey there!', timestamp: '10:30 AM', isSentByCurrentUser: false, senderAvatarUrl: 'https://source.unsplash.com/random/100x100?person,face', senderName: 'Alice W.' },
  { messageId: 'msg2', content: 'Hi Alice! How are you?', timestamp: '10:31 AM', isSentByCurrentUser: true, status: 'delivered' as 'delivered' },
  { messageId: 'msg3', content: 'Doing great! Just working on the new project. You?', timestamp: '10:32 AM', isSentByCurrentUser: false, senderAvatarUrl: 'https://source.unsplash.com/random/100x100?person,face', senderName: 'Alice W.' },
  { messageId: 'msg4', content: 'Same here, lots to do! Did you see the latest designs?', timestamp: '10:33 AM', isSentByCurrentUser: true, status: 'read' as 'read'},
];

const ChatConversationPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  console.log(`ChatConversationPage loaded for chatId: ${chatId}`);

  // Fetch chat details based on chatId - for now, static contact name
  const contactName = chatId === 'chat1' ? 'Alice Wonderland' : 'User ' + chatId;
  const contactAvatar = chatId === 'chat1' ? 'https://source.unsplash.com/random/100x100?person,face' : 'https://source.unsplash.com/random/100x100?person';


  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-3 border-b flex items-center gap-3 sticky top-0 bg-background z-20">
        <Button variant="ghost" size="icon" onClick={() => navigate('/chat')} aria-label="Back to chats">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage src={contactAvatar} alt={contactName} />
          <AvatarFallback>{contactName.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-foreground">{contactName}</h2>
          <p className="text-xs text-muted-foreground">Online</p> {/* Placeholder status */}
        </div>
      </header>

      <ScrollArea className="flex-grow p-4 space-y-2 pb-36 md:pb-24"> {/* Padding for footer AND nav menu on mobile */}
        {placeholderMessages.map(msg => (
          <ChatMessageBubble
            key={msg.messageId}
            messageId={msg.messageId}
            content={msg.content}
            timestamp={msg.timestamp}
            isSentByCurrentUser={msg.isSentByCurrentUser}
            senderAvatarUrl={msg.senderAvatarUrl}
            senderName={msg.senderName}
            status={msg.status}
          />
        ))}
      </ScrollArea>

      <footer className="p-3 border-t bg-background sticky bottom-16 md:bottom-0 z-20"> {/* Sits above NavMenu on mobile */}
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          <Button variant="ghost" size="icon" aria-label="Attach file">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Textarea
            placeholder="Type a message..."
            className="flex-grow resize-none min-h-[40px] max-h-[120px] rounded-full px-4 py-2"
            rows={1}
          />
          <Button size="icon" aria-label="Send message">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </footer>

      <NavigationMenu />
    </div>
  );
};

export default ChatConversationPage;