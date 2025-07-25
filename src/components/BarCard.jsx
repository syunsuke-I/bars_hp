import { Button } from './ui/button';
import { Instagram, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

const BarCard = ({ bar, reverse = false }) => {
  return (
    <div className="relative overflow-hidden rounded-xl group w-full mx-auto bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-white/10 shadow-2xl hover:shadow-3xl hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">

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
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/50 transition-all duration-500" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />
        </div>

        {/* Content Section */}
        <div className={cn(
          "p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center backdrop-blur-sm w-full relative",
          reverse && "lg:order-1"
        )}>
          {/* Card content background overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500" />
          <div className="space-y-4 sm:space-y-5 lg:space-y-7 w-full relative z-10">
            <div className="space-y-2 sm:space-y-3 lg:space-y-4 w-full">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight drop-shadow-lg break-words w-full group-hover:text-gray-100 transition-colors duration-300">
                {bar.name}
              </h2>
              
              <div className="flex flex-col gap-2 sm:gap-3 w-full">
                {/* Instagram Link */}
                <div className="relative h-10 sm:h-11 w-full max-w-full">
                  <Button 
                    asChild
                    variant="outline" 
                    size="sm"
                    className="w-full border-white/30 bg-black/60 hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-white hover:text-white text-xs h-full min-w-0"
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

                {/* Hotpepper Link */}
                <div className="relative h-10 sm:h-11 w-full max-w-full">
                  <Button 
                    asChild
                    size="sm"
                    className="w-full bg-black/60 hover:bg-white/20 text-white hover:text-white font-medium transition-all duration-300 border border-white/30 hover:border-white/50 text-xs h-full min-w-0"
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
            <div className="pt-3 lg:pt-5">
              <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-white/70 to-white/20 group-hover:from-white/90 group-hover:to-white/30 transition-all duration-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarCard;