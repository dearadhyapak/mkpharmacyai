import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatProps {
  initialQuery?: string;
}

const AIChat = ({ initialQuery }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (query?: string) => {
    const messageText = query || input.trim();
    if (!messageText) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("medicine-chat", {
        body: { message: messageText },
      });

      if (error) {
        throw error;
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response || "क्षमा करें, मुझे कोई जवाब नहीं मिला।",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "त्रुटि",
        description: error.message || "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-280px)] max-w-5xl mx-auto">
      <div className="flex-1 flex flex-col bg-background overflow-hidden">
        <ScrollArea ref={scrollRef} className="flex-1 px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 max-w-2xl mx-auto">
              <div className="relative mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                  <Bot className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
                MK Medical Assistant
              </h2>
              <p className="text-muted-foreground text-lg">
                दवाओं के बारे में कोई भी सवाल पूछें - मैं आपकी मदद करूंगा
              </p>
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl mx-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-4 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[85%] ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-3xl px-5 py-3"
                        : "text-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{message.content}</p>
                  </div>

                  {message.role === "user" && (
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5 text-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-4 justify-start max-w-3xl mx-auto">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <div className="border-t border-border bg-background p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-center gap-3">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Message MK Medical Assistant"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
                  disabled={isLoading}
                  className="w-full h-12 pr-12 rounded-3xl border-border bg-muted/50 focus:bg-background transition-colors"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              यह जानकारी केवल शैक्षिक उद्देश्यों के लिए है। कृपया किसी भी दवा लेने से पहले डॉक्टर से परामर्श लें।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
