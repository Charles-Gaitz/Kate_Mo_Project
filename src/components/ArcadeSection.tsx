import React, { useState, Suspense, lazy } from 'react';

// Lazy load game components for better performance
const PacmanGame = lazy(() => import('./games/PacmanGame'));
const DinosaurGame = lazy(() => import('./games/DinosaurGame'));
const MarioGame = lazy(() => import('./games/MarioGame'));

interface ArcadeSectionProps {
  theme: any;
}

const ArcadeSection: React.FC<ArcadeSectionProps> = ({ theme }) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const isStarWars = theme.name === 'Star Wars';
  const isBarbie = theme.name === 'Barbie';
  const isNature = theme.name === 'Nature';

  const starWarsGames = [
    {
      id: 'pacman',
      name: 'Kate Skywalker',
      description: 'Help Kate collect Death Star plans while avoiding Imperial Stormtroopers!',
      emoji: '⭐',
      component: PacmanGame
    },
    {
      id: 'mario',
      name: 'Kate\'s Galactic Lawn Service',
      description: 'Help Kate mow the Death Star\'s garden without going over mowed areas!',
      emoji: '🚀',
      component: MarioGame
    },
    {
      id: 'dinosaur',
      name: 'Kate Solo Runner',
      description: 'Pilot the Millennium Falcon through an asteroid field!',
      emoji: '🛸',
      component: DinosaurGame
    }
  ];

  const barbieGames = [
    {
      id: 'pacman',
      name: 'Kate in Malibu',
      description: 'Help Kate collect all the pink hearts while avoiding the fashion police!',
      emoji: '💖',
      component: PacmanGame
    },
    {
      id: 'mario',
      name: 'Kate\'s Dream Lawn',
      description: 'Mow Kate\'s magical pink lawn in perfect patterns without backtracking!',
      emoji: '👑',
      component: MarioGame
    },
    {
      id: 'dinosaur',
      name: 'Kate\'s Dream Run',
      description: 'Help Kate run through her dream world in style!',
      emoji: '🦄',
      component: DinosaurGame
    }
  ];

  const natureGames = [
    {
      id: 'pacman',
      name: 'Kate\'s Garden Quest',
      description: 'Help Kate collect all the flowers while avoiding the garden pests!',
      emoji: '🌸',
      component: PacmanGame
    },
    {
      id: 'mario',
      name: 'Kate\'s Eco Lawn Care',
      description: 'Mow Kate\'s organic garden in eco-friendly patterns using sustainable methods!',
      emoji: '🌲',
      component: MarioGame
    },
    {
      id: 'dinosaur',
      name: 'Kate\'s Nature Run',
      description: 'Help Kate run through the wilderness and leap over natural obstacles!',
      emoji: '🦌',
      component: DinosaurGame
    }
  ];

  const regularGames = [
    {
      id: 'pacman',
      name: 'Kate-Man',
      description: 'Help Kate collect all the hearts while avoiding the grumpy cats!',
      emoji: '💛',
      component: PacmanGame
    },
    {
      id: 'mario',
      name: 'Kate\'s Lawn Mowing Service',
      description: 'Help Kate mow different shaped lawns without going over the same spot twice!',
      emoji: '🍄',
      component: MarioGame
    },
    {
      id: 'dinosaur',
      name: 'Kate-asaurus Rex',
      description: 'Help Kate jump over obstacles in this endless runner!',
      emoji: '🦕',
      component: DinosaurGame
    }
  ];

  const games = isStarWars ? starWarsGames : isBarbie ? barbieGames : isNature ? natureGames : regularGames;

  if (selectedGame) {
    const game = games.find(g => g.id === selectedGame);
    const GameComponent = game?.component;
    
    return (
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-3xl font-bold ${theme.text}`}>
              {game?.name} {game?.emoji}
            </h2>
            <button
              onClick={() => setSelectedGame(null)}
              className={`game-button px-6 py-3 rounded-full ${theme.button} transition-all duration-300 transform hover:scale-105 focus:scale-105`}
              aria-label="Return to arcade game selection"
            >
              Back to Arcade
            </button>
          </div>
          
          <Suspense fallback={
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading game...</p>
              </div>
            </div>
          }>
            {GameComponent && <GameComponent />}
          </Suspense>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl md:text-5xl font-bold text-center ${theme.text} mb-12`}>
          {isStarWars ? 
            "Kate's Galactic Arcade 🌌" : 
            isBarbie ?
            "Kate's Dream Arcade 💖" :
            isNature ?
            "Kate's Nature Arcade 🌿" :
            "Kate's Mini Arcade 🎮"
          }
        </h2>
        
        <p className={`text-xl text-center ${theme.text} mb-12 opacity-90`}>
          {isStarWars ? 
            "Experience classic games in a galaxy far, far away with Kate as the hero!" : 
            isBarbie ?
            "Play fabulous games in Kate's dream world where everything is possible!" :
            isNature ?
            "Play peaceful games in Kate's natural world where harmony and adventure meet!" :
            "Play classic games with Kate as the star! Watch her collect pizza, avoid grumpy cats, and run through adventures!"
          }
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {games.map((game) => (
                        <div
              key={game.id}
              className={`${theme.card} rounded-3xl p-8 text-center cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-xl`}
              onClick={() => setSelectedGame(game.id)}
              role="button"
              tabIndex={0}
              aria-label={`Play ${game.name} - ${game.description}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedGame(game.id);
                }
              }}
            >
              <div className="text-6xl mb-4">{game.emoji}</div>
              <h3 className={`text-2xl font-bold ${theme.textDark} mb-4`}>
                {game.name}
              </h3>
              <p className={`${theme.textDark} mb-6 opacity-75`}>
                {game.description}
              </p>
              <button 
                className={`game-button px-6 py-3 rounded-full ${theme.button} transition-all duration-300 transform hover:scale-105 focus:scale-105`}
                aria-label={`Start ${game.name} game`}
                tabIndex={-1}
              >
                Play Now!
              </button>
            </div>
          ))}
        </div>
        
        <div className={`${theme.card} rounded-3xl p-8 mt-12 text-center shadow-2xl`}>
          <h3 className={`text-2xl font-bold ${theme.textDark} mb-4`}>
            {isStarWars ? 
              "Galactic High Score Challenge! 🏆" : 
              isBarbie ?
              "Pink Power High Score Challenge! 🏆" :
              isNature ?
              "Natural High Score Challenge! 🏆" :
              "High Score Challenge! 🏆"
            }
          </h3>
          <p className={`${theme.textDark} opacity-75`}>
            {isStarWars ? 
              "Think you can beat Kate's galactic high scores? Good luck - her Force powers extend to gaming!" : 
              isBarbie ?
              "Think you can beat Kate's fabulous high scores? Good luck - she's got that Barbie magic!" :
              isNature ?
              "Think you can beat Kate's natural high scores? Good luck - she's got that earth magic!" :
              "Think you can beat Kate's high scores? Good luck - she's got some serious gaming skills!"
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArcadeSection;