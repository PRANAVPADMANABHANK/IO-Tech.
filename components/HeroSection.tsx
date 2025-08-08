import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-brown-primary/80" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground">
            {/* Carousel Controls */}
            <div className="flex items-center space-x-4 mb-8">
              <button className="text-primary-foreground hover:text-brown-light transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((dot, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-primary-foreground' : 'bg-primary-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Lorem Ipsum
            </h1>
            <p className="text-lg md:text-xl mb-8 text-brown-light leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
            <Button 
              size="lg"
              className="bg-primary-foreground text-brown-primary hover:bg-brown-light font-semibold px-8 py-3"
            >
              Read More
            </Button>
          </div>

          {/* Right Content - Lawyer Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-lg overflow-hidden border-4 border-primary-foreground/20">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                  alt="Professional Lawyer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;