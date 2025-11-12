import Hero from "@/components/Hero";
import AIChat from "@/components/AIChat";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      
      <div className="flex-1 bg-background">
        <AIChat />
      </div>

      <footer className="bg-gradient-to-b from-muted/50 to-muted py-12 border-t border-border mt-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  MK Medical Store
                </h3>
                <p className="text-sm text-muted-foreground">
                  आपके स्वास्थ्य की विश्वसनीय जानकारी
                </p>
              </div>
              
              <a
                href="https://youtube.com/@mkpharmacyhub?si=RhtQwK0pPtkvLm6i"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-gradient-primary text-primary-foreground rounded-full shadow-soft hover:shadow-glow transition-all duration-300 group"
              >
                <svg className="h-6 w-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-90">हमारे YouTube Channel पर जाएं</div>
                  <div className="font-bold">MK Pharmacy Hub</div>
                </div>
              </a>
            </div>
            
            <div className="text-center space-y-3 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                © 2024 MK Medical Store - भारत और दुनिया की दवाओं की विश्वसनीय जानकारी
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2 max-w-2xl mx-auto">
                <span className="text-lg">⚠️</span>
                <p>यह जानकारी केवल शैक्षिक उद्देश्यों के लिए है। कृपया किसी भी दवा लेने से पहले डॉक्टर से परामर्श लें।</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
