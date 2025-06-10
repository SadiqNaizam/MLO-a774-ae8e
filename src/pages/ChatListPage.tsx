import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/NavigationMenu';
import ChatListItem from '@/components/ChatListItem';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const placeholderChats = [
  { id: 'chat1', avatarUrl: 'https://source.unsplash.com/random/100x100?person,face', contactName: 'Alice Wonderland', lastMessage: 'See you tomorrow!', lastMessageTimestamp: '10:30 AM', unreadCount: 2, isActive: false },
  { id: 'chat2', avatarUrl: 'https://source.unsplash.com/random/100x100?man,portrait', contactName: 'Bob The Builder', lastMessage: 'Sounds good.', lastMessageTimestamp: 'Yesterday', unreadCount: 0, isActive: true },
  { id: 'chat3', contactName: 'Tech Group', lastMessage: 'Anyone fixed the bug?', lastMessageTimestamp: 'Mon', unreadCount: 5, isActive: false },
];

const ChatListPage = () => {
  console.log('ChatListPage loaded');
  const navigate = useNavigate();

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-4 border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Chats</h1>
          <Button variant="ghost" size="icon" aria-label="New Chat">
            <PlusCircle className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <div className="p-4 container mx-auto">
        <Input type="search" placeholder="Search chats or start new one..." className="w-full" />
      </div>

      <ScrollArea className="flex-grow container mx-auto px-0 md:px-4 pb-20 md:pb-4">
        <div className="divide-y divide-border">
          {placeholderChats.map(chat => (
            <ChatListItem
              key={chat.id}
              id={chat.id}
              avatarUrl={chat.avatarUrl}
              contactName={chat.contactName}
              lastMessage={chat.lastMessage}
              lastMessageTimestamp={chat.lastMessageTimestamp}
              unreadCount={chat.unreadCount}
              isActive={chat.isActive}
              onClick={handleChatClick}
            />
          ))}
        </div>
      </ScrollArea>
      <NavigationMenu />
    </div>
  );
};

export default ChatListPage;