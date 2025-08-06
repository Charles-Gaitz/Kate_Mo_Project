import React from 'react';

interface LandingSectionProps {
  theme: any;
}

const LandingSection: React.FC<LandingSectionProps> = ({ theme }) => {
  const isStarWars = theme.name === 'Star Wars';
  const isBarbie = theme.name === 'Barbie';
  const isNature = theme.name === 'Nature';
  const isWinter = theme.name === 'Winter';
  const isSpring = theme.name === 'Spring';
  const isSummer = theme.name === 'Summer';
  const isAutumn = theme.name === 'Autumn';

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
      {/* Star Wars Space Background */}
      {isStarWars && (
        <>
          {/* Animated stars */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 2 + 1}s`
                }}
              />
            ))}
          </div>
          
          {/* Flying spacecraft */}
          <div className="absolute top-20 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse opacity-30"></div>
          <div className="absolute top-40 right-0 w-full h-1 bg-gradient-to-l from-transparent via-blue-400 to-transparent animate-pulse opacity-20" style={{ animationDelay: '1s' }}></div>
        </>
      )}
      
      {/* Barbie Sparkles and Hearts Background */}
      {isBarbie && (
        <>
          {/* Floating hearts */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={`heart-${i}`}
                className="absolute text-pink-300 animate-bounce opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 2 + 2}s`
                }}
              >
                💖
              </div>
            ))}
          </div>
          
          {/* Sparkle effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute text-pink-200 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 15 + 8}px`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${Math.random() * 3 + 1}s`
                }}
              >
                ✨
              </div>
            ))}
          </div>
          
          {/* Glitter trail effect */}
          <div className="absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent animate-pulse opacity-40"></div>
          <div className="absolute top-32 right-0 w-full h-1 bg-gradient-to-l from-transparent via-pink-400 to-transparent animate-pulse opacity-30" style={{ animationDelay: '1.5s' }}></div>
        </>
      )}
      
      {/* Nature Background Effects */}
      {isNature && (
        <>
          {/* Floating leaves */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(25)].map((_, i) => (
              <div
                key={`leaf-${i}`}
                className="absolute text-green-400 opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 20 + 15}px`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 4 + 3}s`
                }}
              >
                {['🍃', '🌿', '🌱', '🍀'][Math.floor(Math.random() * 4)]}
              </div>
            ))}
          </div>
          
          {/* Gentle wind effect */}
          <div className="absolute top-20 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-300 to-transparent animate-pulse opacity-30"></div>
          <div className="absolute top-60 right-0 w-full h-1 bg-gradient-to-l from-transparent via-emerald-300 to-transparent animate-pulse opacity-25" style={{ animationDelay: '2s' }}></div>
          
          {/* Mountain silhouettes */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-800/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full">
            <svg viewBox="0 0 1200 120" className="w-full h-24 fill-green-700/20">
              <path d="M0,60 C300,20 600,100 900,40 C1050,10 1150,80 1200,60 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
        </>
      )}
      
      {/* Winter Background Effects */}
      {isWinter && (
        <>
          {/* Falling snowflakes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={`snowflake-${i}`}
                className="absolute text-blue-200 opacity-80"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 16 + 8}px`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`
                }}
              >
                {['❄️', '❅', '❆', '✻', '✼'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
          
          {/* Frosted glass effects */}
          <div className="absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-pulse opacity-40"></div>
          <div className="absolute top-40 right-0 w-full h-1 bg-gradient-to-l from-transparent via-cyan-300 to-transparent animate-pulse opacity-30" style={{ animationDelay: '1s' }}></div>
          
          {/* Ice crystal effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={`crystal-${i}`}
                className="absolute bg-blue-300 rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  animation: `gentlePulse ${Math.random() * 4 + 2}s ease-in-out infinite ${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </>
      )}
      
      {/* Spring Background Effects */}
      {isSpring && (
        <>
          {/* Blooming flowers and butterflies */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(25)].map((_, i) => (
              <div
                key={`spring-element-${i}`}
                className="absolute opacity-70"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 18 + 12}px`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`
                }}
              >
                {['🌸', '🌺', '🦋', '🌼', '🌷', '🌻'][Math.floor(Math.random() * 6)]}
              </div>
            ))}
          </div>
          
          {/* Gentle breeze effects */}
          <div className="absolute top-20 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-300 to-transparent animate-pulse opacity-30"></div>
          <div className="absolute top-60 right-0 w-full h-1 bg-gradient-to-l from-transparent via-pink-300 to-transparent animate-pulse opacity-25" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Pollen particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={`pollen-${i}`}
                className="absolute bg-yellow-300 rounded-full opacity-40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  animation: `gentleFloat ${Math.random() * 5 + 3}s ease-in-out infinite ${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </>
      )}
      
      {/* Summer Background Effects */}
      {isSummer && (
        <>
          {/* Sun rays and beach elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={`summer-element-${i}`}
                className="absolute opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 20 + 15}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 2 + 2}s`
                }}
              >
                {['☀️', '🏖️', '🌊', '🏄‍♀️', '🐚', '⛱️'][Math.floor(Math.random() * 6)]}
              </div>
            ))}
          </div>
          
          {/* Sun ray effects */}
          <div className="absolute top-10 left-10 w-1 h-40 bg-gradient-to-b from-transparent via-yellow-400 to-transparent opacity-40 animate-pulse" style={{ animationDuration: '2s' }}></div>
          <div className="absolute top-20 right-20 w-1 h-32 bg-gradient-to-b from-transparent via-orange-400 to-transparent opacity-35 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-36 bg-gradient-to-b from-transparent via-yellow-500 to-transparent opacity-30 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          
          {/* Heat shimmer effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={`shimmer-${i}`}
                className="absolute bg-orange-300 rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 5 + 2}px`,
                  height: `${Math.random() * 5 + 2}px`,
                  animation: `gentlePulse ${Math.random() * 3 + 1}s ease-in-out infinite ${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </>
      )}
      
      {/* Autumn Background Effects */}
      {isAutumn && (
        <>
          {/* Falling autumn leaves */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(35)].map((_, i) => (
              <div
                key={`autumn-leaf-${i}`}
                className="absolute opacity-70"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 18 + 12}px`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 4 + 3}s`
                }}
              >
                {['🍂', '🍁', '🌰', '🎃', '🍄'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
          
          {/* Warm wind effects */}
          <div className="absolute top-15 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-pulse opacity-35"></div>
          <div className="absolute top-50 right-0 w-full h-1 bg-gradient-to-l from-transparent via-red-400 to-transparent animate-pulse opacity-30" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Cozy fireplace glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={`ember-${i}`}
                className="absolute bg-orange-400 rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  animation: `gentlePulse ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </>
      )}
      
      <div className={`${theme.card} rounded-3xl p-8 md:p-12 max-w-4xl mx-auto text-center shadow-2xl transform hover:scale-105 transition-all duration-500`}>
        {/* Kate's Avatar */}
        <div className="mb-8">
          <div className={`w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full ${
            isStarWars ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-yellow-400/50' : 
            isNature ? 'bg-gradient-to-br from-green-400 to-emerald-600 shadow-green-400/50' :
            isWinter ? 'bg-gradient-to-br from-blue-300 to-blue-500 shadow-blue-400/50' :
            isSpring ? 'bg-gradient-to-br from-green-300 to-pink-400 shadow-green-400/50' :
            isSummer ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-orange-400/50' :
            isAutumn ? 'bg-gradient-to-br from-orange-400 to-red-500 shadow-red-400/50' :
            'bg-gradient-to-br from-pink-400 to-purple-500'
          } flex items-center justify-center text-6xl md:text-7xl font-bold ${
            isStarWars ? 'text-black' : 
            isNature ? 'text-white' :
            isWinter ? 'text-white' :
            isSpring ? 'text-white' :
            isSummer ? 'text-white' :
            isAutumn ? 'text-white' :
            'text-white'
          } shadow-lg animate-bounce`}>
            K
          </div>
        </div>
        
        {/* Main Title */}
        <h1 className={`text-4xl md:text-6xl font-bold ${theme.textDark} mb-6 ${isStarWars ? 'animate-pulse tracking-wider' : 'animate-pulse'}`}>
          {isStarWars ? (
            <>
              <span className="block text-2xl md:text-3xl mb-2 opacity-75">A long time ago in a galaxy far, far away...</span>
              <span className="block text-yellow-400 drop-shadow-lg" style={{ textShadow: '0 0 10px #fbbf24' }}>
                KATE MORALES
              </span>
              <span className="block text-lg md:text-xl mt-2 opacity-90">The Force is Strong with This One</span>
            </>
          ) : isBarbie ? (
            <>
              <span className="block text-2xl md:text-3xl mb-2 opacity-75 text-pink-600">✨ Introducing ✨</span>
              <span className="block text-pink-600 drop-shadow-lg" style={{ 
                textShadow: '0 0 15px #ec4899, 0 0 30px #f472b6',
                background: 'linear-gradient(45deg, #ec4899, #f472b6, #f9a8d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                KATE MORALES
              </span>
              <span className="block text-lg md:text-xl mt-2 opacity-90 text-pink-700">Life in Plastic, It's Fantastic! 💖</span>
            </>
          ) : (
            <>
              {isNature ? (
                <>
                  <span className="block text-2xl md:text-3xl mb-2 opacity-75 text-green-700">🌿 Welcome to 🌿</span>
                  <span className="block text-green-800 drop-shadow-lg" style={{ 
                    textShadow: '0 0 15px #10b981, 0 0 30px #059669',
                    background: 'linear-gradient(45deg, #059669, #10b981, #34d399)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    KATE'S GARDEN
                  </span>
                  <span className="block text-lg md:text-xl mt-2 opacity-90 text-green-800">Where Every Day Blooms with Joy! 🌸</span>
                </>
              ) : (
                <>
                  {isWinter ? (
                    <>
                      <span className="block text-2xl md:text-3xl mb-2 opacity-75 text-blue-700">❄️ Welcome to ❄️</span>
                      <span className="block text-blue-800 drop-shadow-lg" style={{ 
                        textShadow: '0 0 15px #3b82f6, 0 0 30px #60a5fa',
                        background: 'linear-gradient(45deg, #3b82f6, #60a5fa, #93c5fd)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        KATE'S WINTER WONDERLAND
                      </span>
                      <span className="block text-lg md:text-xl mt-2 opacity-90 text-blue-800">Where Every Snowflake is Unique, Just Like Kate! ❄️</span>
                    </>
                  ) : isSpring ? (
                    <>
                      <span className="block text-2xl md:text-3xl mb-2 opacity-75 text-green-700">🌸 Welcome to 🌸</span>
                      <span className="block text-green-800 drop-shadow-lg" style={{ 
                        textShadow: '0 0 15px #10b981, 0 0 30px #34d399',
                        background: 'linear-gradient(45deg, #10b981, #34d399, #f472b6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        KATE'S SPRING GARDEN
                      </span>
                      <span className="block text-lg md:text-xl mt-2 opacity-90 text-green-800">Where New Beginnings Bloom Every Day! 🦋</span>
                    </>
                  ) : isSummer ? (
                    <>
                      <span className="block text-2xl md:text-3xl mb-2 opacity-75 text-orange-700">☀️ Welcome to ☀️</span>
                      <span className="block text-orange-800 drop-shadow-lg" style={{ 
                        textShadow: '0 0 15px #f97316, 0 0 30px #fb923c',
                        background: 'linear-gradient(45deg, #f97316, #fb923c, #fbbf24)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        KATE'S SUMMER PARADISE
                      </span>
                      <span className="block text-lg md:text-xl mt-2 opacity-90 text-orange-800">Where Every Day is a Beach Day! 🏖️</span>
                    </>
                  ) : isAutumn ? (
                    <>
                      <span className="block text-2xl md:text-3xl mb-2 opacity-75 text-amber-700">🍂 Welcome to 🍂</span>
                      <span className="block text-amber-800 drop-shadow-lg" style={{ 
                        textShadow: '0 0 15px #d97706, 0 0 30px #f59e0b',
                        background: 'linear-gradient(45deg, #d97706, #f59e0b, #dc2626)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        KATE'S AUTUMN HAVEN
                      </span>
                      <span className="block text-lg md:text-xl mt-2 opacity-90 text-amber-800">Where Every Moment is Golden! 🎃</span>
                    </>
                  ) : (
                    <>Welcome to Kate's Universe! {theme.icon}</>
                  )}
                </>
              )}
            </>
          )}
        </h1>
        
        {/* Funny Intro */}
        <div className={`text-lg md:text-xl ${theme.textDark} mb-8 leading-relaxed`}>
          {isStarWars ? (
            <>
              <p className="mb-4">
                ⭐ <strong>Imperial Alert!</strong> You've discovered the Rebel Alliance's most valuable asset! ⭐
              </p>
              <p className="mb-4">
                Meet Kate Morales - Jedi Master of Fun, Commander of Smiles, 
                and the chosen one who brings balance to any room she enters!
              </p>
              <p className="italic">
                "Do or do not laugh uncontrollably at Kate's awesomeness... there is no try!" - Master Yoda (probably) 🌟
              </p>
            </>
          ) : isBarbie ? (
            <>
              <p className="mb-4">
                💖 <strong>Breaking News from Malibu!</strong> The most fabulous girl in the world has been discovered! 💖
              </p>
              <p className="mb-4">
                Meet Kate Morales - CEO of Awesome, President of Fun, 
                and the girl who proves that you really CAN be anything you want to be!
              </p>
              <p className="italic text-pink-600">
                "Come on Kate, let's go party!" - Because every day with Kate is a dream come true! ✨
              </p>
            </>
          ) : isWinter ? (
            <>
              <p className="mb-4">
                ❄️ <strong>Winter Wonder Alert!</strong> The most warming presence in the coldest season has been found! ❄️
              </p>
              <p className="mb-4">
                Meet Kate Morales - Snow Angel Extraordinaire, Hot Cocoa Connoisseur, 
                and the person who makes even the chilliest days feel cozy and bright!
              </p>
              <p className="italic text-blue-700">
                "Like a snowflake, Kate is beautifully unique - but unlike snow, her warmth never melts away!" ☃️
              </p>
            </>
          ) : isSpring ? (
            <>
              <p className="mb-4">
                🌸 <strong>Spring Has Sprung!</strong> The most refreshing soul of the season has blossomed! 🌸
              </p>
              <p className="mb-4">
                Meet Kate Morales - Flower Whisperer, Butterfly Magnet, 
                and the person who brings new life and fresh energy to everything she touches!
              </p>
              <p className="italic text-green-700">
                "Like spring itself, Kate brings renewal, hope, and the promise that beautiful things are always growing!" 🦋
              </p>
            </>
          ) : isSummer ? (
            <>
              <p className="mb-4">
                ☀️ <strong>Summer Sunshine Alert!</strong> The brightest ray of sunshine has been discovered! ☀️
              </p>
              <p className="mb-4">
                Meet Kate Morales - Beach Day Planner, Sunshine Spreader, 
                and the person who makes every day feel like a perfect summer vacation!
              </p>
              <p className="italic text-orange-700">
                "Like the summer sun, Kate radiates warmth, energy, and makes everything around her glow!" 🏖️
              </p>
            </>
          ) : isAutumn ? (
            <>
              <p className="mb-4">
                🍂 <strong>Autumn Magic Alert!</strong> The most golden soul of the harvest season has been found! 🍂
              </p>
              <p className="mb-4">
                Meet Kate Morales - Pumpkin Spice Enthusiast, Cozy Moment Creator, 
                and the person who makes every day feel like a warm hug on a crisp fall morning!
              </p>
              <p className="italic text-amber-700">
                "Like autumn leaves, Kate is a masterpiece of natural beauty - and like harvest time, she brings abundance to all!" 🎃
              </p>
            </>
          ) : isNature ? (
            <>
              <p className="mb-4">
                🌿 <strong>Nature's Gift to the World!</strong> A rare and beautiful soul has been discovered! 🌿
              </p>
              <p className="mb-4">
                Meet Kate Morales - Guardian of Smiles, Cultivator of Joy, 
                and the person who proves that the most beautiful gardens grow in the heart!
              </p>
              <p className="italic text-green-700">
                "Like a flower that blooms in the wilderness, Kate brings beauty wherever she goes!" 🌺
              </p>
            </>
          ) : (
            <>
              <p className="mb-4">
                🎉 <strong>Alert!</strong> You've just entered the most awesome corner of the internet! 🎉
              </p>
              <p className="mb-4">
                This is Kate Morales - part-time superhero, full-time amazing human, 
                and professional bringer-of-smiles to everyone around her!
              </p>
              <p className="italic">
                Warning: Prolonged exposure to Kate's awesomeness may cause 
                uncontrollable happiness and spontaneous bursts of laughter! 😄
              </p>
            </>
          )}
        </div>
        
        {/* Animated Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className={`${theme.secondary} rounded-xl p-4 transform hover:scale-105 transition-all duration-300`}>
            <div className="text-2xl font-bold">{isStarWars ? '∞' : isBarbie ? '💯' : isNature ? '🌱' : isWinter ? '❄️' : isSpring ? '🌸' : isSummer ? '☀️' : isAutumn ? '🍂' : '∞'}</div>
            <div className="text-sm">{isStarWars ? 'Midichlorian Count' : isBarbie ? 'Dream Jobs Mastered' : isNature ? 'Seeds of Kindness Planted' : isWinter ? 'Snowflakes of Joy' : isSpring ? 'Flowers Bloomed' : isSummer ? 'Sunny Days Created' : isAutumn ? 'Golden Moments' : 'Levels of Awesome'}</div>
          </div>
          <div className={`${theme.secondary} rounded-xl p-4 transform hover:scale-105 transition-all duration-300`}>
            <div className="text-2xl font-bold">{isStarWars ? '24/7' : isBarbie ? '24/7' : isNature ? '365' : isWinter ? '365' : isSpring ? '24/7' : isSummer ? '∞' : isAutumn ? '24/7' : '24/7'}</div>
            <div className="text-sm">{isStarWars ? 'Death Star Destroyer' : isBarbie ? 'Fabulous Mode' : isNature ? 'Days of Natural Beauty' : isWinter ? 'Days of Warmth' : isSpring ? 'Growth Mode' : isSummer ? 'Beach Vibes' : isAutumn ? 'Cozy Generator' : 'Smile Generator'}</div>
          </div>
          <div className={`${theme.secondary} rounded-xl p-4 transform hover:scale-105 transition-all duration-300`}>
            <div className="text-2xl font-bold">{isStarWars ? '100%' : isBarbie ? '∞' : isNature ? '🌳' : isWinter ? '100%' : isSpring ? '∞' : isSummer ? '100%' : isAutumn ? '∞' : '100%'}</div>
            <div className="text-sm">{isStarWars ? 'Force Sensitivity' : isBarbie ? 'Pink Power Level' : isNature ? 'Organic Awesomeness' : isWinter ? 'Frost Resistance' : isSpring ? 'Renewal Energy' : isSummer ? 'Vitamin D Level' : isAutumn ? 'Harvest Wisdom' : 'Pure Magic'}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;