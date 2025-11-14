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
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea ref={scrollRef} className="flex-1 px-4 py-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 max-w-4xl mx-auto">
              <div className="mb-8">
                <div className="h-20 w-20 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto shadow-lg">
                  <Bot className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                कैसे मदद कर सकता हूँ?
              </h1>
              <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-2xl">
                मैं आपकी दवाओं से संबंधित सभी सवालों का जवाब देने के लिए यहाँ हूँ
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                <div className="group p-6 bg-gradient-to-br from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 rounded-2xl transition-all cursor-pointer border border-border/50 hover:border-primary/30 hover:shadow-soft">
                  <div className="text-3xl mb-3">💊</div>
                  <div className="text-base font-semibold mb-2">दवा की पूरी जानकारी</div>
                  <div className="text-sm text-muted-foreground">उपयोग, खुराक और सावधानियां</div>
                </div>
                <div className="group p-6 bg-gradient-to-br from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 rounded-2xl transition-all cursor-pointer border border-border/50 hover:border-primary/30 hover:shadow-soft">
                  <div className="text-3xl mb-3">⚠️</div>
                  <div className="text-base font-semibold mb-2">साइड इफेक्ट्स</div>
                  <div className="text-sm text-muted-foreground">दुष्प्रभाव और सावधानियां</div>
                </div>
                <div className="group p-6 bg-gradient-to-br from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 rounded-2xl transition-all cursor-pointer border border-border/50 hover:border-primary/30 hover:shadow-soft">
                  <div className="text-3xl mb-3">📋</div>
                  <div className="text-base font-semibold mb-2">खुराक और समय</div>
                  <div className="text-sm text-muted-foreground">सही मात्रा और उपयोग का तरीका</div>
                </div>
                <div className="group p-6 bg-gradient-to-br from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 rounded-2xl transition-all cursor-pointer border border-border/50 hover:border-primary/30 hover:shadow-soft">
                  <div className="text-3xl mb-3">🔍</div>
                  <div className="text-base font-semibold mb-2">विकल्प खोजें</div>
                  <div className="text-sm text-muted-foreground">दवा के सस्ते और प्रभावी विकल्प</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto w-full space-y-8 pb-8">
              {messages.map((message, index) => (
                <div key={index} className="group">
                  {message.role === "user" ? (
                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-foreground" />
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-foreground leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-4 items-start bg-muted/30 -mx-4 px-4 py-6 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                          <Bot className="h-5 w-5 text-primary-foreground" />
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-foreground leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="max-w-3xl mx-auto w-full">
                  <div className="flex gap-4 items-start bg-muted/30 -mx-4 px-4 py-6 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <div className="border-t border-border bg-background/80 backdrop-blur-sm p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-3">
              <Input
                type="text"
                placeholder="मुझसे कुछ भी पूछें..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
                disabled={isLoading}
                className="flex-1 min-h-[52px] max-h-32 rounded-2xl border-border bg-muted/50 focus:bg-background transition-colors resize-none px-4 py-3"
              />
              <Button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="h-[52px] w-[52px] rounded-2xl bg-gradient-primary hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              यह जानकारी केवल शैक्षिक उद्देश्यों के लिए है। कृपया किसी भी दवा लेने से पहले डॉक्टर से परामर्श लें।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
