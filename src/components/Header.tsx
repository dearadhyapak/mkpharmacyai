import mkLogo from "@/assets/mk-pharmacy-logo.jpg";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={mkLogo} alt="MK Pharmacy Hub" className="h-10 w-10 rounded-xl shadow-soft" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                MK Pharmacy Hub
              </h1>
              <p className="text-xs text-muted-foreground">AI Medical Assistant</p>
            </div>
          </div>
          
          <a
            href="https://youtube.com/@mkpharmacyhub?si=RhtQwK0pPtkvLm6i"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity shadow-soft"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="hidden sm:inline">Subscribe</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
