import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  avatar?: string;
}

const ChatBubble = ({ message, isUser, timestamp, avatar }: ChatBubbleProps) => {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(!isUser);

  useEffect(() => {
    if (!isUser) {
      // Typewriter effect for AI messages
      let currentIndex = 0;
      const timer = setInterval(() => {
        if (currentIndex < message.length) {
          setDisplayedMessage(message.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 50);

      return () => clearInterval(timer);
    } else {
      setDisplayedMessage(message);
      setIsTyping(false);
    }
  }, [message, isUser]);

  return (
    <div className={`flex gap-3 mb-4 chat-enter ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <Avatar className="w-8 h-8 border-2 border-accent/30">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[70%] ${isUser ? "order-first" : ""}`}>
        <div
          className={`p-3 rounded-2xl ${
            isUser
              ? "bg-gradient-to-r from-primary to-accent text-white ml-auto"
              : "glass border border-accent/20 text-foreground"
          }`}
        >
          <p className="text-sm leading-relaxed">
            {displayedMessage}
            {isTyping && (
              <span className="inline-block w-2 h-4 bg-accent/80 ml-1 animate-pulse" />
            )}
          </p>
        </div>
        
        {timestamp && (
          <p className="text-xs text-muted-foreground mt-1 px-3">
            {timestamp}
          </p>
        )}
      </div>

      {isUser && (
        <Avatar className="w-8 h-8 border-2 border-primary/30">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-gradient-to-br from-secondary to-primary text-white">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatBubble;