import heroImage from "@/assets/hero-medical.jpg";
import mkLogo from "@/assets/mk-logo.png";

const Hero = () => {

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
        
        <p className="text-xl md:text-2xl text-muted-foreground animate-in fade-in slide-in-from-top duration-700 delay-200">
          भारत और दुनिया की दवाओं की सही जानकारी, AI की मदद से
        </p>

      </div>
    </div>
  );
};

export default Hero;
