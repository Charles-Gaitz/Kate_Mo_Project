import ThemeSelector from './components/ThemeSelector';
import LandingSection from './components/LandingSection';
import AboutSection from './components/AboutSection';
import ArcadeSection from './components/ArcadeSection';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const { currentTheme, theme } = useTheme();
  const isStarWars = currentTheme === 'starwars';
  const isBarbie = currentTheme === 'barbie';
  const isNature = currentTheme === 'nature';
  const isWinter = currentTheme === 'winter';
  const isSpring = currentTheme === 'spring';
  const isSummer = currentTheme === 'summer';
  const isAutumn = currentTheme === 'autumn';

  return (
    <div 
      className={`min-h-screen transition-all duration-1000 ${theme.background} ${isStarWars || isBarbie || isNature || isWinter || isSpring || isSummer || isAutumn ? 'overflow-hidden' : ''}`}
      style={{
        fontFamily: theme.fontFamily,
        backgroundImage: theme.backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Star Wars specific background effects */}
      {isStarWars && (
        <div className="fixed inset-0 pointer-events-none">
          {/* Animated lightsaber glow effect */}
          <div className="absolute top-1/4 left-10 w-1 h-32 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-30 animate-pulse" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-1/3 right-20 w-1 h-24 bg-gradient-to-b from-transparent via-green-400 to-transparent opacity-25 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-28 bg-gradient-to-b from-transparent via-red-400 to-transparent opacity-20 animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
          
          {/* Moving starfield effect */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: '1px',
                  height: '1px',
                  animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Barbie specific background effects */}
      {(isBarbie || isSpring) && (
        <div className="fixed inset-0 pointer-events-none">
          {/* Floating glitter effect */}
          <div className="absolute inset-0">
            {[...Array(40)].map((_, i) => (
              <div
                key={`glitter-${i}`}
                className={`absolute ${isBarbie ? 'bg-pink-300' : 'bg-green-300'} rounded-full opacity-40 animate-pulse`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 2 + 1}s`
                }}
              />
            ))}
          </div>
          
          {/* Pink sparkle trails */}
          <div className={`absolute top-16 left-10 w-1 h-40 bg-gradient-to-b from-transparent ${isBarbie ? 'via-pink-400' : 'via-green-400'} to-transparent opacity-30 animate-pulse`} style={{ animationDuration: '2s' }}></div>
          <div className={`absolute top-1/3 right-16 w-1 h-32 bg-gradient-to-b from-transparent ${isBarbie ? 'via-pink-300' : 'via-green-300'} to-transparent opacity-25 animate-pulse`} style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
          <div className={`absolute bottom-1/4 left-1/4 w-1 h-36 bg-gradient-to-b from-transparent ${isBarbie ? 'via-pink-500' : 'via-green-500'} to-transparent opacity-20 animate-pulse`} style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          
          {/* Floating hearts animation */}
          {isBarbie && <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={`floating-heart-${i}`}
                className="absolute text-pink-400 opacity-50"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 16 + 12}px`,
                  animation: `float ${Math.random() * 4 + 3}s ease-in-out infinite ${Math.random() * 2}s`
                }}
              >
                💕
              </div>
            ))}
          </div>}
        </div>
      )}
      
      {/* Nature specific background effects */}
      {(isNature || isAutumn) && (
        <div className="fixed inset-0 pointer-events-none">
          {/* Floating leaves animation */}
          <div className="absolute inset-0">
            {[...Array(isNature ? 30 : 35)].map((_, i) => (
              <div
                key={`nature-leaf-${i}`}
                className={`absolute ${isNature ? 'text-green-500' : 'text-orange-500'} opacity-40`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 16 + 12}px`,
                  animation: `gentleFloat ${Math.random() * 6 + 4}s ease-in-out infinite ${Math.random() * 3}s`
                }}
              >
                {isNature ? 
                  ['🍃', '🌿', '🌱', '🍀', '🌾'][Math.floor(Math.random() * 5)] :
                  ['🍂', '🍁', '🌰', '🎃', '🍄'][Math.floor(Math.random() * 5)]
                }
              </div>
            ))}
          </div>
          
          {/* Gentle wind trails */}
          <div className={`absolute top-20 left-10 w-1 h-40 bg-gradient-to-b from-transparent ${isNature ? 'via-green-400' : 'via-orange-400'} to-transparent opacity-20 animate-pulse`} style={{ animationDuration: '4s' }}></div>
          <div className={`absolute top-1/3 right-16 w-1 h-32 bg-gradient-to-b from-transparent ${isNature ? 'via-emerald-300' : 'via-red-400'} to-transparent opacity-15 animate-pulse`} style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
          <div className={`absolute bottom-1/4 left-1/4 w-1 h-36 bg-gradient-to-b from-transparent ${isNature ? 'via-green-500' : 'via-amber-500'} to-transparent opacity-25 animate-pulse`} style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
          
          {/* Subtle particle effects */}
          <div className="absolute inset-0">
            {[...Array(isNature ? 20 : 12)].map((_, i) => (
              <div
                key={`nature-particle-${i}`}
                className={`absolute ${isNature ? 'bg-green-400' : 'bg-orange-400'} rounded-full opacity-30`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  animation: `gentlePulse ${Math.random() * 4 + 2}s ease-in-out infinite ${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Winter specific background effects */}
      {isWinter && (
        <div className="fixed inset-0 pointer-events-none">
          {/* Falling snowflakes */}
          <div className="absolute inset-0">
            {[...Array(60)].map((_, i) => (
              <div
                key={`winter-snow-${i}`}
                className="absolute text-blue-200 opacity-70"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 16 + 8}px`,
                  animation: `gentleFloat ${Math.random() * 8 + 5}s ease-in-out infinite ${Math.random() * 4}s`
                }}
              >
                {['❄️', '❅', '❆', '✻', '✼', '❈'][Math.floor(Math.random() * 6)]}
              </div>
            ))}
          </div>
          
          {/* Frost trails */}
          <div className="absolute top-12 left-8 w-1 h-44 bg-gradient-to-b from-transparent via-blue-300 to-transparent opacity-25 animate-pulse" style={{ animationDuration: '5s' }}></div>
          <div className="absolute top-1/4 right-12 w-1 h-36 bg-gradient-to-b from-transparent via-cyan-300 to-transparent opacity-20 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-40 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-30 animate-pulse" style={{ animationDuration: '7s', animationDelay: '2.5s' }}></div>
          
          {/* Ice crystals */}
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <div
                key={`ice-crystal-${i}`}
                className="absolute bg-blue-300 rounded-full opacity-25"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  animation: `gentlePulse ${Math.random() * 5 + 3}s ease-in-out infinite ${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Summer specific background effects */}
      {isSummer && (
        <div className="fixed inset-0 pointer-events-none">
          {/* Beach elements */}
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <div
                key={`summer-element-${i}`}
                className="absolute opacity-50"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 18 + 12}px`,
                  animation: `gentleFloat ${Math.random() * 4 + 3}s ease-in-out infinite ${Math.random() * 2}s`
                }}
              >
                {['☀️', '🏖️', '🌊', '🏄‍♀️', '🐚', '⛱️', '🌴'][Math.floor(Math.random() * 7)]}
              </div>
            ))}
          </div>
          
          {/* Sun rays */}
          <div className="absolute top-8 left-12 w-1 h-48 bg-gradient-to-b from-transparent via-yellow-400 to-transparent opacity-35 animate-pulse" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-20 right-16 w-1 h-40 bg-gradient-to-b from-transparent via-orange-400 to-transparent opacity-30 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/4 w-1 h-44 bg-gradient-to-b from-transparent via-yellow-500 to-transparent opacity-25 animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
          
          {/* Heat shimmer */}
          <div className="absolute inset-0">
            {[...Array(18)].map((_, i) => (
              <div
                key={`heat-shimmer-${i}`}
                className="absolute bg-orange-300 rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 5 + 2}px`,
                  height: `${Math.random() * 5 + 2}px`,
                  animation: `gentlePulse ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Theme Selector */}
      <header role="banner">
        <ThemeSelector />
      </header>
      
      {/* Main Content */}
      <main role="main" className="relative z-10 animate-fadeIn">
        <LandingSection theme={theme} />
        <AboutSection theme={theme} />
        <ArcadeSection theme={theme} />
      </main>
      
      {/* Footer */}
      <footer role="contentinfo" className={`text-center py-8 ${theme.text} opacity-75`}>
        <p className="text-sm">Made with ❤️ for the amazing Kate Morales</p>
      </footer>
      
      {/* CSS animations for enhanced themes */}
      {(isStarWars || isBarbie || isNature || isWinter || isSpring || isSummer || isAutumn) && (
        <style>{`
          /* Animations only for users who haven't requested reduced motion */
          @media (prefers-reduced-motion: no-preference) {
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes slideInLeft {
              from { opacity: 0; transform: translateX(-50px); }
              to { opacity: 1; transform: translateX(0); }
            }
            
            @keyframes slideInRight {
              from { opacity: 0; transform: translateX(50px); }
              to { opacity: 1; transform: translateX(0); }
            }
            
            @keyframes bounce {
              0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
              40%, 43% { transform: translate3d(0,-30px,0); }
              70% { transform: translate3d(0,-15px,0); }
              90% { transform: translate3d(0,-4px,0); }
            }
            
            @keyframes twinkle {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.2); }
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              33% { transform: translateY(-10px) rotate(5deg); }
              66% { transform: translateY(5px) rotate(-3deg); }
            }
            
            @keyframes gentleFloat {
              0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
              25% { transform: translateY(-8px) translateX(3px) rotate(2deg); }
              50% { transform: translateY(-5px) translateX(-2px) rotate(-1deg); }
            75% { transform: translateY(-12px) translateX(4px) rotate(3deg); }
          }
              75% { transform: translateY(2px) translateX(1px) rotate(1deg); }
            }
            
            @keyframes gentlePulse {
              0%, 100% { opacity: 0.2; transform: scale(1); }
              50% { opacity: 0.4; transform: scale(1.1); }
            }
            
            .animate-fadeIn {
              animation: fadeIn 1s ease-out;
            }
            
            .animate-fadeInUp {
              animation: fadeInUp 0.8s ease-out both;
            }
            
            .animate-slideInLeft {
              animation: slideInLeft 0.8s ease-out;
            }
            
            .animate-slideInRight {
              animation: slideInRight 0.8s ease-out;
            }
            
            .animate-bounce {
              animation: bounce 2s infinite;
            }
            
            .animate-pulse {
              animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
          }
          
          /* Reduced motion fallbacks */
          @media (prefers-reduced-motion: reduce) {
            .animate-fadeIn,
            .animate-fadeInUp,
            .animate-slideInLeft,
            .animate-slideInRight,
            .animate-bounce,
            .animate-pulse {
              animation: none;
            }
            
            /* Simple fade-in for essential visibility */
            .animate-fadeIn {
              opacity: 1;
            }
          }
          
          /* Focus styles for accessibility */
          button:focus,
          [role="button"]:focus,
          [tabindex]:focus {
            outline: 2px solid #3B82F6;
            outline-offset: 2px;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          }
          
          /* Theme icon focus styles */
          .theme-icon:focus {
            transform: scale(1.1);
            outline: 2px solid #3B82F6;
            outline-offset: 3px;
            border-radius: 50%;
          }
          
          /* Game button focus styles */
          .game-button:focus {
            outline: 3px solid #F59E0B;
            outline-offset: 2px;
          }
          
          /* Mobile optimizations */
          @media (max-width: 768px) {
            .animate-fadeInUp {
              animation-duration: 0.6s;
            }
            
            canvas {
              max-width: 100% !important;
              height: auto !important;
            }
          }
          
          /* Smooth theme transitions */
          * {
            transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease;
          }
        `}</style>
      )}
    </div>
  );
}

export default App;