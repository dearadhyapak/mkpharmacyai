import heroImage from "@/assets/hero-medical.jpg";
import mkLogo from "@/assets/mk-pharmacy-logo.jpg";

const Hero = () => {

  return (
    <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="relative z-10 container px-4 py-16 text-center">
        <div className="flex justify-center mb-6 animate-in fade-in slide-in-from-top duration-700">
          <div className="relative">
            <img src={mkLogo} alt="MK Medical" className="h-20 w-20 drop-shadow-glow" />
            <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-top duration-700 delay-100">
          MK Pharmacy Hub
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-top duration-700 delay-200">
          भारत और दुनिया की दवाओं की सही जानकारी, AI की मदद से
        </p>
      </div>
    </div>
  );
};

export default Hero;
