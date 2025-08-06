import { Star, Heart, Leaf, Snowflake, Flower, Sun, Leaf as MapleLeaf } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSelector = () => {
  const { currentTheme, setTheme, theme } = useTheme();
  
  const themeButtons = [
    { key: 'default', name: 'Default', icon: Star, color: 'bg-purple-500 hover:bg-purple-600' },
    { key: 'starwars', name: 'Star Wars', icon: Star, color: 'bg-yellow-400 hover:bg-yellow-300 text-black' },
    { key: 'barbie', name: 'Barbie', icon: Heart, color: 'bg-pink-500 hover:bg-pink-600' },
    { key: 'nature', name: 'Nature', icon: Leaf, color: 'bg-green-500 hover:bg-green-600' },
    { key: 'winter', name: 'Winter', icon: Snowflake, color: 'bg-blue-400 hover:bg-blue-500' },
    { key: 'spring', name: 'Spring', icon: Flower, color: 'bg-green-400 hover:bg-green-500' },
    { key: 'summer', name: 'Summer', icon: Sun, color: 'bg-orange-400 hover:bg-orange-500' },
    { key: 'autumn', name: 'Autumn', icon: MapleLeaf, color: 'bg-amber-500 hover:bg-amber-600' },
  ];

  return (
    <>
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Current theme: {theme.name}
      </div>
      
      <nav 
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${theme.card} rounded-full p-3 shadow-xl border-2 ${
          theme.name === 'Star Wars' ? 'border-yellow-400' : 
          theme.name === 'Barbie' ? 'border-pink-400' : 
          theme.name === 'Nature' ? 'border-green-400' : 
          'border-gray-200'
        }`}
        role="navigation"
        aria-label="Theme selector"
      >
        <div className="flex flex-wrap gap-2 justify-center">
          {themeButtons.map((themeBtn) => {
            const IconComponent = themeBtn.icon;
            const isActive = currentTheme === themeBtn.key;
            
            return (
              <button
                key={themeBtn.key}
                onClick={() => setTheme(themeBtn.key as any)}
                className={`theme-icon p-3 rounded-full transition-all duration-500 transform hover:scale-125 hover:rotate-12 focus:scale-110 focus:rotate-6 ${
                  isActive 
                    ? `${themeBtn.color} scale-110 shadow-lg ring-2 ring-white` 
                    : `${themeBtn.color} opacity-70 hover:opacity-100`
                }`}
                title={`Switch to ${themeBtn.name} theme`}
                aria-label={`Switch to ${themeBtn.name} theme`}
                aria-pressed={isActive}
                role="button"
                tabIndex={0}
              >
                <IconComponent size={18} aria-hidden="true" />
                <span className="sr-only">{themeBtn.name} theme</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default ThemeSelector;