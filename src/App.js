import BarCard from './components/BarCard';
import LiquidChrome from './components/LiquidChrome';

const bars = [
  {
    name: "大人の隠れ家　BAR よ白",
    image: "/imgs/main/yohaku.JPG", 
    instagramHandle: "@bar.yohaku",
    instagramUrl: "https://instagram.com/bar.yohaku",
    hotpepperUrl: "https://www.hotpepper.jp/strJ001258230/"
  },
  {
    name: "SHISHA&BAR WORK",
    image: "/imgs/main/work.JPG",
    instagramHandle: "@bar_work.miyazaki", 
    instagramUrl: "https://instagram.com/bar_work.miyazaki",
    hotpepperUrl: "https://www.hotpepper.jp/strJ003941638/"
  },
  {
    name: "AMUSEMENT BAR PIVOT",
    image: "/imgs/main/pivot.JPG",
    instagramHandle: "@bar_pivot_miyazaki",
    instagramUrl: "https://instagram.com/bar_pivot_miyazaki",
    hotpepperUrl: "https://www.hotpepper.jp/strJ004089339/"
  }
];

function App() {
  return (
    <div className="min-h-screen relative w-full overflow-x-hidden">
      {/* Liquid Chrome Background */}
      <div className="fixed inset-0 z-0 w-full">
        <LiquidChrome
          baseColor={[0.1, 0.1, 0.1]}
          speed={0.1}
          amplitude={0.5}
          frequencyX={3}
          frequencyY={2}
          interactive={true}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 py-8 lg:py-16 w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-6xl px-2 sm:px-4 mx-auto">
          <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center justify-center w-full">
            {bars.map((bar, index) => (
              <div 
                key={index} 
                className="animate-slide-up opacity-0 w-full max-w-5xl mx-auto"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: 'forwards'
                }}
              >
                <BarCard 
                  bar={bar} 
                  reverse={index % 2 === 1}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;
