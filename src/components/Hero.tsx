import { useState } from "react";
import { Search, Pill } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-medical.jpg";
import mkLogo from "@/assets/mk-logo.png";
import { useToast } from "@/components/ui/use-toast";

interface HeroProps {
  onSearch: (query: string) => void;
}

const Hero = ({ onSearch }: HeroProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "खाली खोज",
        description: "कृपया दवा का नाम लिखें",
        variant: "destructive",
      });
      return;
    }
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="relative z-10 container px-4 py-12 text-center">
        <div className="flex justify-center mb-6 animate-in fade-in slide-in-from-top duration-700">
          <img src={mkLogo} alt="MK Medical" className="h-24 w-24 drop-shadow-glow" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-top duration-700 delay-100">
          MK Medical Store
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-top duration-700 delay-200">
          भारत और दुनिया की दवाओं की सही जानकारी, AI की मदद से
        </p>

        <div className="max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-top duration-700 delay-300">
          <div className="flex gap-2 p-2 bg-card/80 backdrop-blur-sm rounded-xl shadow-medium border border-border">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="दवा का नाम खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 h-12 text-lg border-0 bg-transparent focus-visible:ring-0"
              />
            </div>
            <Button 
              onClick={handleSearch}
              size="lg"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Pill className="mr-2 h-5 w-5" />
              खोजें
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-500">
          <div className="p-6 bg-card/60 backdrop-blur-sm rounded-xl shadow-soft border border-border hover:shadow-medium transition-all duration-300">
            <div className="text-4xl mb-3">💊</div>
            <h3 className="text-lg font-semibold mb-2">असली दवाइयों की फोटो</h3>
            <p className="text-sm text-muted-foreground">भारत और विश्व की दवाओं की सही तस्वीरें</p>
          </div>

          <div className="p-6 bg-card/60 backdrop-blur-sm rounded-xl shadow-soft border border-border hover:shadow-medium transition-all duration-300">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="text-lg font-semibold mb-2">हिंदी AI असिस्टेंट</h3>
            <p className="text-sm text-muted-foreground">सरल हिंदी में पूरी जानकारी</p>
          </div>

          <div className="p-6 bg-card/60 backdrop-blur-sm rounded-xl shadow-soft border border-border hover:shadow-medium transition-all duration-300">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-lg font-semibold mb-2">पूरी जानकारी</h3>
            <p className="text-sm text-muted-foreground">उपयोग, साइड इफेक्ट्स और सावधानियां</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
