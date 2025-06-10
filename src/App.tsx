import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import new pages
import ChatListPage from "./pages/ChatListPage";
import ChatConversationPage from "./pages/ChatConversationPage";
import FeedPage from "./pages/FeedPage";
import UserProfilePage from "./pages/UserProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import NotFound from "./pages/NotFound"; // Assuming this exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default route to FeedPage */}
          <Route path="/" element={<FeedPage />} />
          
          {/* App routes */}
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/chat" element={<ChatListPage />} />
          <Route path="/chat/:chatId" element={<ChatConversationPage />} />
          
          {/* User Profile: /profile for current user (simplified), /profile/:userId for others */}
          <Route path="/profile" element={<UserProfilePage />} /> 
          <Route path="/profile/:userId" element={<UserProfilePage />} />
          
          <Route path="/create-post" element={<CreatePostPage />} />
          
          {/* Catch-all NotFound route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;