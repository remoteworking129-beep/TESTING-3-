import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, Image, Paperclip } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MessageInput = ({ onSendMessage, disabled = false }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 glass border-t border-accent/20">
      <div className="flex items-center gap-2 max-w-4xl mx-auto">
        {/* Attachment buttons */}
        <div className="flex gap-1">
          <Button
            type="button"
            variant="wave"
            size="icon"
            className="shrink-0"
            disabled={disabled}
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="wave"
            size="icon"
            className="shrink-0"
            disabled={disabled}
          >
            <Image className="w-4 h-4" />
          </Button>
        </div>

        {/* Message input */}
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message about ocean data..."
            disabled={disabled}
            className="pr-20 bg-card/50 border-accent/30 focus:border-accent/50 text-foreground placeholder:text-muted-foreground"
          />
          
          {/* Voice input button */}
          <Button
            type="button"
            variant="wave"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
            disabled={disabled}
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>

        {/* Send button */}
        <Button
          type="submit"
          variant="ocean"
          size="icon"
          className="shrink-0"
          disabled={disabled || !message.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;