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
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-card rounded-2xl shadow-glow border border-border overflow-hidden transition-all duration-300 hover:shadow-glow">
        <div className="bg-gradient-primary p-5 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary-foreground">
              AI Medical Assistant
            </h2>
            <p className="text-sm text-primary-foreground/80">हिंदी में पूछें, तुरंत जवाब पाएं</p>
          </div>
        </div>

        <ScrollArea ref={scrollRef} className="h-[550px] p-6 bg-gradient-to-b from-muted/20 to-transparent">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="relative mb-6">
                <div className="h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Bot className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              </div>
              <p className="text-2xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
                नमस्ते! 🙏
              </p>
              <p className="text-lg text-foreground mb-2 font-medium">
                मैं आपका AI मेडिकल असिस्टेंट हूं
              </p>
              <p className="text-sm text-muted-foreground max-w-md">
                कोई भी दवा के बारे में पूछें - उपयोग, साइड इफेक्ट्स, खुराक, सावधानियां या कोई भी सवाल। मैं आपको हिंदी में विस्तार से जानकारी दूंगा।
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">💊 दवा की जानकारी</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">⚠️ साइड इफेक्ट्स</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">📋 खुराक</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-soft">
                        <Bot className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-soft ${
                      message.role === "user"
                        ? "bg-gradient-primary text-primary-foreground"
                        : "bg-card border border-border text-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>

                  {message.role === "user" && (
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-secondary flex items-center justify-center shadow-soft">
                        <User className="h-6 w-6 text-secondary-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-soft">
                      <Bot className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-2xl px-5 py-3 flex items-center gap-3 shadow-soft">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span className="text-sm font-medium">जवाब तैयार हो रहा है...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <div className="p-5 border-t border-border bg-gradient-to-b from-muted/10 to-muted/30">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="दवा के बारे में पूछें... (उदाहरण: पैरासिटामोल के साइड इफेक्ट्स)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
              disabled={isLoading}
              className="flex-1 h-12 text-base border-border focus:border-primary transition-colors"
            />
            <Button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="h-12 px-6 bg-gradient-primary hover:shadow-glow transition-all"
            >
              <Send className="h-5 w-5 mr-2" />
              भेजें
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
