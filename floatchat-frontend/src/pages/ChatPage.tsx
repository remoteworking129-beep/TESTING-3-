import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import ChatBubble from "@/components/ChatBubble";
import MessageInput from "@/components/MessageInput";
import ParticleBackground from "@/components/ParticleBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Plus, History, Trash2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your FloatChat AI assistant. I can help you explore ocean data, answer questions about marine research, and provide insights from vast oceanographic datasets. What would you like to know?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const [chatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Ocean Temperature Analysis",
      lastMessage: "What are the temperature trends...",
      timestamp: "2 hours ago"
    },
    {
      id: "2", 
      title: "Marine Biology Research",
      lastMessage: "Tell me about coral bleaching...",
      timestamp: "1 day ago"
    },
    {
      id: "3",
      title: "Tide Predictions",
      lastMessage: "When is the next high tide...",
      timestamp: "3 days ago"
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(content),
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (userMessage: string): string => {
    // Simple response logic - in real app this would call the backend
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('temperature') || lowerMessage.includes('warm')) {
      return "Ocean temperatures have been showing interesting patterns. Based on recent data, we're seeing a 0.6°C increase in global ocean temperatures over the past decade. The North Atlantic shows particularly notable warming trends. Would you like me to show you specific regional data or time series analysis?";
    } else if (lowerMessage.includes('coral') || lowerMessage.includes('reef')) {
      return "Coral reefs are indeed facing challenges from rising ocean temperatures and acidification. Current monitoring shows that approximately 50% of coral reefs worldwide have experienced some level of bleaching in recent years. The Great Barrier Reef and Caribbean reefs are particularly affected. I can provide detailed satellite imagery analysis or water quality data if you're interested.";
    } else if (lowerMessage.includes('tide') || lowerMessage.includes('current')) {
      return "Tidal patterns and ocean currents are fascinating! Current models show the Gulf Stream is maintaining its strength, though there are seasonal variations. For specific tide predictions, I can access real-time NOAA data for any coastal location. Which region are you interested in exploring?";
    } else {
      return "That's a great question about ocean science! I have access to comprehensive datasets including satellite imagery, buoy measurements, marine life tracking, and climate models. I can help you analyze trends, generate visualizations, or dive deeper into specific oceanographic phenomena. What aspect interests you most?";
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticleBackground />
      <Navbar />
      
      <div className="flex-1 flex relative z-10">
        {/* Chat History Sidebar */}
        <div className="w-80 glass border-r border-accent/20 hidden lg:flex flex-col">
          <div className="p-4 border-b border-accent/20">
            <Button variant="ocean" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                <History className="w-4 h-4 mr-2" />
                Chat History
              </h3>
              
              {chatSessions.map((session) => (
                <Card key={session.id} className="glass border-accent/20 hover:border-accent/40 transition-all cursor-pointer">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {session.title}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {session.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {session.timestamp}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 glass border-b border-accent/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Ocean AI Assistant</h2>
                <p className="text-sm text-muted-foreground">Ask me anything about ocean data and marine science</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  message={message.content}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              
              {isLoading && (
                <ChatBubble
                  message="Analyzing ocean data..."
                  isUser={false}
                  timestamp={new Date().toLocaleTimeString()}
                />
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <MessageInput 
            onSendMessage={handleSendMessage} 
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;