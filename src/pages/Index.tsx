import Hero from "@/components/Hero";
import AIChat from "@/components/AIChat";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="py-12 bg-background">
        <div className="container">
          <AIChat />
        </div>
      </div>

      <footer className="bg-muted py-8 border-t border-border">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground mb-2">
            © 2024 MK Medical Store - भारत और दुनिया की दवाओं की विश्वसनीय जानकारी
          </p>
          <p className="text-xs text-muted-foreground">
            ⚠️ यह जानकारी केवल शैक्षिक उद्देश्यों के लिए है। कृपया किसी भी दवा लेने से पहले डॉक्टर से परामर्श लें।
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
