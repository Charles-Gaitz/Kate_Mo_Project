// Theme configuration with proper typing
export interface ThemeConfig {
  name: string;
  background: string;
  backgroundImage: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textDark: string;
  card: string;
  button: string;
  fontFamily: string;
  icon: string;
}

export const themes: Record<string, ThemeConfig> = {
  default: {
    name: 'Default',
    background: 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
    backgroundImage: '',
    primary: 'bg-white text-purple-600',
    secondary: 'bg-purple-100 text-purple-800',
    accent: 'bg-pink-500 text-white',
    text: 'text-white',
    textDark: 'text-gray-800',
    card: 'bg-white/90 backdrop-blur-sm',
    button: 'bg-purple-600 hover:bg-purple-700 text-white',
    fontFamily: "'Comic Sans MS', cursive",
    icon: '🌟'
  },
  starwars: {
    name: 'Star Wars',
    background: 'bg-black relative',
    backgroundImage: 'radial-gradient(ellipse at center, #0c1445 0%, #000000 70%)',
    primary: 'bg-yellow-400 text-black',
    secondary: 'bg-gray-800 text-yellow-400',
    accent: 'bg-red-600 text-white',
    text: 'text-yellow-400',
    textDark: 'text-yellow-400',
    card: 'bg-gray-900/90 backdrop-blur-sm border border-yellow-400 shadow-yellow-400/20 shadow-lg',
    button: 'bg-yellow-400 hover:bg-yellow-300 text-black font-bold',
    fontFamily: "'Orbitron', 'Courier New', monospace",
    icon: '⭐'
  },
  barbie: {
    name: 'Barbie',
    background: 'bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400',
    backgroundImage: '',
    primary: 'bg-pink-600 text-white',
    secondary: 'bg-pink-50 text-pink-800',
    accent: 'bg-white text-pink-600',
    text: 'text-white',
    textDark: 'text-pink-800',
    card: 'bg-white/95 backdrop-blur-sm border-2 border-pink-300 shadow-pink-200/50',
    button: 'bg-pink-600 hover:bg-pink-700 text-white',
    fontFamily: "'Pacifico', cursive",
    icon: '💖'
  },
  nature: {
    name: 'Nature',
    background: 'bg-gradient-to-br from-green-300 via-emerald-400 to-teal-500',
    backgroundImage: 'linear-gradient(135deg, #10b981 0%, #059669 25%, #047857 50%, #065f46 75%, #064e3b 100%)',
    primary: 'bg-green-600 text-white',
    secondary: 'bg-green-50 text-green-900 border border-green-200',
    accent: 'bg-amber-600 text-white',
    text: 'text-green-50',
    textDark: 'text-green-900',
    card: 'bg-white/95 backdrop-blur-sm border-2 border-green-200 shadow-green-100/50',
    button: 'bg-green-600 hover:bg-green-700 text-white',
    fontFamily: "'Nunito', 'Georgia', serif",
    icon: '🌿'
  },
  winter: {
    name: 'Winter',
    background: 'bg-gradient-to-br from-blue-100 via-blue-200 to-cyan-300',
    backgroundImage: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 25%, #93c5fd 50%, #60a5fa 75%, #3b82f6 100%)',
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-blue-50 text-blue-900 border border-blue-200',
    accent: 'bg-white text-blue-700 shadow-blue-100',
    text: 'text-blue-900',
    textDark: 'text-blue-900',
    card: 'bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-blue-100/50',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
    fontFamily: "'Quicksand', 'Inter', sans-serif",
    icon: '❄️'
  },
  spring: {
    name: 'Spring',
    background: 'bg-gradient-to-br from-green-200 via-yellow-200 to-pink-200',
    backgroundImage: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 25%, #fef3c7 50%, #fce7f3 75%, #f3e8ff 100%)',
    primary: 'bg-green-500 text-white shadow-green-200',
    secondary: 'bg-green-50 text-green-800 border border-green-200',
    accent: 'bg-pink-400 text-white shadow-pink-200',
    text: 'text-green-900',
    textDark: 'text-green-800',
    card: 'bg-white/95 backdrop-blur-sm border-2 border-green-200 shadow-green-100/50',
    button: 'bg-green-500 hover:bg-green-600 text-white shadow-green-300',
    fontFamily: "'Quicksand', sans-serif",
    icon: '🌸'
  },
  summer: {
    name: 'Summer',
    background: 'bg-gradient-to-br from-yellow-300 via-orange-300 to-blue-400',
    backgroundImage: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 25%, #fdba74 50%, #fb923c 75%, #60a5fa 100%)',
    primary: 'bg-orange-500 text-white shadow-orange-200',
    secondary: 'bg-orange-50 text-orange-800 border border-orange-200',
    accent: 'bg-yellow-400 text-orange-900 shadow-yellow-200',
    text: 'text-orange-900',
    textDark: 'text-orange-800',
    card: 'bg-white/95 backdrop-blur-sm border-2 border-orange-200 shadow-orange-100/50',
    button: 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-300',
    fontFamily: "'Fredoka One', cursive",
    icon: '☀️'
  },
  autumn: {
    name: 'Autumn',
    background: 'bg-gradient-to-br from-orange-300 via-red-400 to-amber-500',
    backgroundImage: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 25%, #f87171 50%, #dc2626 75%, #d97706 100%)',
    primary: 'bg-amber-600 text-white shadow-amber-200',
    secondary: 'bg-amber-50 text-amber-900 border border-amber-200',
    accent: 'bg-red-500 text-white shadow-red-200',
    text: 'text-amber-900',
    textDark: 'text-amber-800',
    card: 'bg-white/95 backdrop-blur-sm border-2 border-amber-200 shadow-amber-100/50',
    button: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-300',
    fontFamily: "'Merriweather', serif",
    icon: '🍂'
  }
};