import { Button } from './ui/button';
import { Instagram, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';
import FluidGlass from './FluidGlass';

const BarCard = ({ bar, reverse = false }) => {
  return (
    <div className="relative overflow-hidden rounded-lg group w-full mx-auto">
      {/* Glass Card Background */}
      <div className="absolute inset-0 h-full w-full">
        <FluidGlass
          mode="cube"
          cubeProps={{
            scale: 1.0,
            ior: 1.8,
            thickness: 8,
            chromaticAberration: 0.15,
            anisotropy: 0.05,
            transmission: 0.9,
            roughness: 0.02,
            color: '#ffffff',
            attenuationColor: '#f8fafc',
            attenuationDistance: 0.5,
            clearcoat: 1.0,
            clearcoatRoughness: 0.0,
            reflectivity: 0.6,
            envMapIntensity: 1.2
          }}
        />
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-0 min-h-[300px] sm:min-h-[400px] w-full">
        {/* Image Section */}
        <div className={cn(
          "relative overflow-hidden h-48 sm:h-64 lg:h-96 w-full",
          reverse && "lg:order-2"
        )}>
          <img 
            src={bar.image} 
            alt={bar.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content Section */}
        <div className={cn(
          "p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-center backdrop-blur-sm w-full",
          reverse && "lg:order-1"
        )}>
          <div className="space-y-3 sm:space-y-4 lg:space-y-6 w-full">
            <div className="space-y-2 sm:space-y-3 lg:space-y-4 w-full">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white leading-tight drop-shadow-lg break-words w-full">
                {bar.name}
              </h2>
              
              <div className="flex flex-col gap-2 sm:gap-3 w-full">
                {/* Instagram Link with Fluid Glass */}
                <div className="relative h-10 sm:h-11 w-full max-w-full">
                  <FluidGlass
                    mode="bar"
                    barProps={{
                      scale: 0.3,
                      ior: 2.4,
                      thickness: 15,
                      chromaticAberration: 0.25,
                      anisotropy: 0.1,
                      transmission: 0.95,
                      roughness: 0.05,
                      color: '#ffffff',
                      attenuationColor: '#e0e7ff',
                      attenuationDistance: 0.2,
                      clearcoat: 1.0,
                      clearcoatRoughness: 0.0,
                      reflectivity: 0.8,
                      envMapIntensity: 1.5
                    }}
                  />
                  <Button 
                    asChild
                    variant="outline" 
                    size="sm"
                    className="absolute inset-0 border-white/30 bg-transparent hover:bg-white/20 hover:border-white/50 transition-all duration-300 z-10 text-white hover:text-white text-xs h-full w-full min-w-0"
                  >
                    <a 
                      href={bar.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-white hover:text-white px-1 sm:px-2 w-full min-w-0"
                    >
                      <Instagram size={14} className="text-white flex-shrink-0" />
                      <span className="font-medium text-white truncate text-xs overflow-hidden">{bar.instagramHandle}</span>
                    </a>
                  </Button>
                </div>

                {/* Hotpepper Link with Fluid Glass */}
                <div className="relative h-10 sm:h-11 w-full max-w-full">
                  <FluidGlass
                    mode="bar"
                    barProps={{
                      scale: 0.3,
                      ior: 2.4,
                      thickness: 15,
                      chromaticAberration: 0.25,
                      anisotropy: 0.1,
                      transmission: 0.95,
                      roughness: 0.05,
                      color: '#ffffff',
                      attenuationColor: '#fef3cd',
                      attenuationDistance: 0.2,
                      clearcoat: 1.0,
                      clearcoatRoughness: 0.0,
                      reflectivity: 0.8,
                      envMapIntensity: 1.5
                    }}
                  />
                  <Button 
                    asChild
                    size="sm"
                    className="absolute inset-0 bg-transparent hover:bg-white/20 text-white hover:text-white font-medium transition-all duration-300 z-10 border border-white/30 hover:border-white/50 text-xs h-full w-full min-w-0"
                  >
                    <a 
                      href={bar.hotpepperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-white hover:text-white px-1 sm:px-2 w-full min-w-0"
                    >
                      <ExternalLink size={14} className="text-white flex-shrink-0" />
                      <span className="text-white truncate text-xs overflow-hidden">ホットペッパー</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="pt-2 lg:pt-4">
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-white/60 to-white/20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarCard;