import { ThemeKey } from '../contexts/ThemeContext';

// Game assets configuration for each theme
export interface GameAssets {
  // Character assets
  player: {
    color: string;
    secondaryColor: string;
    accent: string;
    emoji: string;
    name: string;
  };
  
  // Enemy/obstacle assets
  enemies: {
    color: string;
    secondaryColor: string;
    emoji: string;
    name: string;
  }[];
  
  // Collectible assets
  collectibles: {
    color: string;
    emoji: string;
    name: string;
    points: number;
  }[];
  
  // Environment assets
  environment: {
    backgroundColor: string;
    groundColor: string;
    platformColor: string;
    accentColor: string;
    backgroundElements: string[];
  };
  
  // Sound/visual effects (represented as colors/styles)
  effects: {
    jumpEffect: string;
    collectEffect: string;
    powerUpEffect: string;
    hitEffect: string;
  };
}

export const gameAssets: Record<ThemeKey, GameAssets> = {
  default: {
    player: {
      color: '#9333EA',
      secondaryColor: '#EC4899',
      accent: '#FFFFFF',
      emoji: '🌟',
      name: 'Kate'
    },
    enemies: [
      { color: '#EF4444', secondaryColor: '#DC2626', emoji: '👾', name: 'Bug' },
      { color: '#F97316', secondaryColor: '#EA580C', emoji: '🔥', name: 'Flame' }
    ],
    collectibles: [
      { color: '#F59E0B', emoji: '⭐', name: 'Star', points: 100 },
      { color: '#10B981', emoji: '💎', name: 'Gem', points: 200 },
      { color: '#8B5CF6', emoji: '🔮', name: 'Crystal', points: 300 }
    ],
    environment: {
      backgroundColor: '#1E1B4B',
      groundColor: '#4C1D95',
      platformColor: '#7C3AED',
      accentColor: '#EC4899',
      backgroundElements: ['⭐', '✨', '🌙']
    },
    effects: {
      jumpEffect: '#F59E0B',
      collectEffect: '#10B981',
      powerUpEffect: '#8B5CF6',
      hitEffect: '#EF4444'
    }
  },
  
  starwars: {
    player: {
      color: '#FDE047',
      secondaryColor: '#1E40AF',
      accent: '#FFFFFF',
      emoji: '👨‍🚀',
      name: 'Jedi Kate'
    },
    enemies: [
      { color: '#1F2937', secondaryColor: '#EF4444', emoji: '🤖', name: 'Droid' },
      { color: '#374151', secondaryColor: '#DC2626', emoji: '⚫', name: 'Empire' },
      { color: '#6B7280', secondaryColor: '#991B1B', emoji: '🔴', name: 'Sith' }
    ],
    collectibles: [
      { color: '#3B82F6', emoji: '⚡', name: 'Force Crystal', points: 150 },
      { color: '#10B981', emoji: '🛸', name: 'Ship Part', points: 200 },
      { color: '#8B5CF6', emoji: '🗡️', name: 'Lightsaber', points: 500 }
    ],
    environment: {
      backgroundColor: '#0F172A',
      groundColor: '#1E293B',
      platformColor: '#334155',
      accentColor: '#FDE047',
      backgroundElements: ['⭐', '🌌', '🛸', '🌠']
    },
    effects: {
      jumpEffect: '#3B82F6',
      collectEffect: '#10B981',
      powerUpEffect: '#8B5CF6',
      hitEffect: '#EF4444'
    }
  },
  
  barbie: {
    player: {
      color: '#EC4899',
      secondaryColor: '#F9A8D4',
      accent: '#FFFFFF',
      emoji: '👸',
      name: 'Princess Kate'
    },
    enemies: [
      { color: '#9CA3AF', secondaryColor: '#6B7280', emoji: '🕷️', name: 'Spider' },
      { color: '#6366F1', secondaryColor: '#4F46E5', emoji: '🌀', name: 'Whirlwind' }
    ],
    collectibles: [
      { color: '#F472B6', emoji: '💕', name: 'Heart', points: 100 },
      { color: '#A855F7', emoji: '👗', name: 'Dress', points: 200 },
      { color: '#06B6D4', emoji: '💍', name: 'Diamond', points: 300 },
      { color: '#F59E0B', emoji: '👑', name: 'Crown', points: 500 }
    ],
    environment: {
      backgroundColor: '#FCE7F3',
      groundColor: '#F9A8D4',
      platformColor: '#F472B6',
      accentColor: '#EC4899',
      backgroundElements: ['💕', '🌸', '🦄', '✨', '🎀']
    },
    effects: {
      jumpEffect: '#F472B6',
      collectEffect: '#A855F7',
      powerUpEffect: '#06B6D4',
      hitEffect: '#EF4444'
    }
  },
  
  nature: {
    player: {
      color: '#059669',
      secondaryColor: '#34D399',
      accent: '#A3E635',
      emoji: '🧚',
      name: 'Forest Kate'
    },
    enemies: [
      { color: '#92400E', secondaryColor: '#A16207', emoji: '🐛', name: 'Bug' },
      { color: '#7C2D12', secondaryColor: '#9A3412', emoji: '🍄', name: 'Mushroom' },
      { color: '#365314', secondaryColor: '#3F6212', emoji: '🕸️', name: 'Web' }
    ],
    collectibles: [
      { color: '#65A30D', emoji: '🌿', name: 'Leaf', points: 50 },
      { color: '#DC2626', emoji: '🍓', name: 'Berry', points: 100 },
      { color: '#F59E0B', emoji: '🌻', name: 'Flower', points: 150 },
      { color: '#8B5CF6', emoji: '🦋', name: 'Butterfly', points: 300 }
    ],
    environment: {
      backgroundColor: '#F0FDF4',
      groundColor: '#BBF7D0',
      platformColor: '#86EFAC',
      accentColor: '#22C55E',
      backgroundElements: ['🌳', '🌿', '🍃', '🌸', '🦋']
    },
    effects: {
      jumpEffect: '#22C55E',
      collectEffect: '#F59E0B',
      powerUpEffect: '#8B5CF6',
      hitEffect: '#EF4444'
    }
  },
  
  winter: {
    player: {
      color: '#3B82F6',
      secondaryColor: '#93C5FD',
      accent: '#FFFFFF',
      emoji: '⛄',
      name: 'Snow Kate'
    },
    enemies: [
      { color: '#1E40AF', secondaryColor: '#3B82F6', emoji: '🧊', name: 'Ice Block' },
      { color: '#6B7280', secondaryColor: '#9CA3AF', emoji: '❄️', name: 'Snowstorm' },
      { color: '#374151', secondaryColor: '#4B5563', emoji: '🌨️', name: 'Blizzard' }
    ],
    collectibles: [
      { color: '#FFFFFF', emoji: '❄️', name: 'Snowflake', points: 100 },
      { color: '#3B82F6', emoji: '🧊', name: 'Ice Crystal', points: 150 },
      { color: '#8B5CF6', emoji: '💎', name: 'Frost Gem', points: 250 }
    ],
    environment: {
      backgroundColor: '#F0F9FF',
      groundColor: '#DBEAFE',
      platformColor: '#93C5FD',
      accentColor: '#3B82F6',
      backgroundElements: ['❄️', '🌨️', '⭐', '🏔️']
    },
    effects: {
      jumpEffect: '#93C5FD',
      collectEffect: '#8B5CF6',
      powerUpEffect: '#06B6D4',
      hitEffect: '#EF4444'
    }
  },
  
  spring: {
    player: {
      color: '#22C55E',
      secondaryColor: '#BBF7D0',
      accent: '#F472B6',
      emoji: '🌸',
      name: 'Bloom Kate'
    },
    enemies: [
      { color: '#A16207', secondaryColor: '#CA8A04', emoji: '🐝', name: 'Bee' },
      { color: '#7C2D12', secondaryColor: '#92400E', emoji: '🐛', name: 'Caterpillar' }
    ],
    collectibles: [
      { color: '#F472B6', emoji: '🌸', name: 'Cherry Blossom', points: 100 },
      { color: '#A855F7', emoji: '🌷', name: 'Tulip', points: 150 },
      { color: '#06B6D4', emoji: '🦋', name: 'Butterfly', points: 200 },
      { color: '#F59E0B', emoji: '🌻', name: 'Sunflower', points: 300 }
    ],
    environment: {
      backgroundColor: '#F0FDF4',
      groundColor: '#DCFCE7',
      platformColor: '#BBF7D0',
      accentColor: '#22C55E',
      backgroundElements: ['🌸', '🌿', '🦋', '🌱', '☀️']
    },
    effects: {
      jumpEffect: '#F472B6',
      collectEffect: '#A855F7',
      powerUpEffect: '#06B6D4',
      hitEffect: '#EF4444'
    }
  },
  
  summer: {
    player: {
      color: '#F97316',
      secondaryColor: '#FED7AA',
      accent: '#FEF3C7',
      emoji: '☀️',
      name: 'Sun Kate'
    },
    enemies: [
      { color: '#DC2626', secondaryColor: '#EF4444', emoji: '🔥', name: 'Fire' },
      { color: '#A16207', secondaryColor: '#CA8A04', emoji: '🌵', name: 'Cactus' },
      { color: '#7C2D12', secondaryColor: '#92400E', emoji: '🐍', name: 'Snake' }
    ],
    collectibles: [
      { color: '#F59E0B', emoji: '☀️', name: 'Sunshine', points: 100 },
      { color: '#06B6D4', emoji: '🏖️', name: 'Beach Ball', points: 150 },
      { color: '#EC4899', emoji: '🍉', name: 'Watermelon', points: 200 },
      { color: '#8B5CF6', emoji: '🌺', name: 'Hibiscus', points: 250 }
    ],
    environment: {
      backgroundColor: '#FFFBEB',
      groundColor: '#FED7AA',
      platformColor: '#FDBA74',
      accentColor: '#F97316',
      backgroundElements: ['☀️', '🌴', '🏖️', '🌊', '🐚']
    },
    effects: {
      jumpEffect: '#F59E0B',
      collectEffect: '#06B6D4',
      powerUpEffect: '#EC4899',
      hitEffect: '#EF4444'
    }
  },
  
  autumn: {
    player: {
      color: '#D97706',
      secondaryColor: '#FDBA74',
      accent: '#FED7AA',
      emoji: '🍂',
      name: 'Autumn Kate'
    },
    enemies: [
      { color: '#7C2D12', secondaryColor: '#92400E', emoji: '🕷️', name: 'Spider' },
      { color: '#A16207', secondaryColor: '#CA8A04', emoji: '🐛', name: 'Bug' },
      { color: '#DC2626', secondaryColor: '#B91C1C', emoji: '🔥', name: 'Fire' }
    ],
    collectibles: [
      { color: '#F59E0B', emoji: '🍂', name: 'Autumn Leaf', points: 100 },
      { color: '#DC2626', emoji: '🍎', name: 'Apple', points: 150 },
      { color: '#A855F7', emoji: '🍇', name: 'Grapes', points: 200 },
      { color: '#F97316', emoji: '🎃', name: 'Pumpkin', points: 300 }
    ],
    environment: {
      backgroundColor: '#FFFBEB',
      groundColor: '#FED7AA',
      platformColor: '#FDBA74',
      accentColor: '#D97706',
      backgroundElements: ['🍂', '🍁', '🌰', '🦃', '🍄']
    },
    effects: {
      jumpEffect: '#F59E0B',
      collectEffect: '#DC2626',
      powerUpEffect: '#A855F7',
      hitEffect: '#EF4444'
    }
  }
};
