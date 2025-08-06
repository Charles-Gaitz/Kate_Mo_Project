import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { gameAssets } from '../../config/gameAssets';

const MarioGame = () => {
  const { currentTheme } = useTheme();
  const assets = gameAssets[currentTheme];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const gameStateRef = useRef({
    kate: { 
      x: 50, 
      y: 300, 
      velY: 0, 
      velX: 0,
      onGround: true, 
      width: 20, 
      height: 25,
      facing: 'right' as 'left' | 'right'
    },
    platforms: [] as Array<{ x: number, y: number, width: number, height: number, type: string }>,
    collectibles: [] as Array<{ x: number, y: number, collected: boolean, type: string, points: number }>,
    gameLoop: null as number | null,
    gravity: 0.5,
    jumpPower: -12,
    speed: 4,
    keys: {
      left: false,
      right: false,
      jump: false
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const initGame = () => {
      // Create platforms with theme-appropriate styling
      gameStateRef.current.platforms = [
        { x: 0, y: 350, width: 600, height: 50, type: 'ground' }, // Ground
        { x: 150, y: 280, width: 100, height: 20, type: 'platform' },
        { x: 300, y: 220, width: 100, height: 20, type: 'platform' },
        { x: 450, y: 160, width: 100, height: 20, type: 'platform' },
        { x: 250, y: 100, width: 80, height: 20, type: 'platform' },
        { x: 80, y: 180, width: 60, height: 20, type: 'platform' }
      ];

      // Create collectibles based on theme
      gameStateRef.current.collectibles = [
        { x: 180, y: 250, collected: false, type: assets.collectibles[0]?.name || 'item', points: assets.collectibles[0]?.points || 100 },
        { x: 330, y: 190, collected: false, type: assets.collectibles[1]?.name || 'item', points: assets.collectibles[1]?.points || 150 },
        { x: 480, y: 130, collected: false, type: assets.collectibles[2]?.name || 'item', points: assets.collectibles[2]?.points || 200 },
        { x: 270, y: 70, collected: false, type: assets.collectibles[3]?.name || 'bonus', points: assets.collectibles[3]?.points || 300 },
        { x: 100, y: 150, collected: false, type: assets.collectibles[0]?.name || 'item', points: assets.collectibles[0]?.points || 100 },
        { x: 520, y: 320, collected: false, type: assets.collectibles[1]?.name || 'item', points: assets.collectibles[1]?.points || 150 }
      ];

      gameStateRef.current.kate = { 
        x: 50, 
        y: 300, 
        velY: 0, 
        velX: 0,
        onGround: true, 
        width: 20, 
        height: 25,
        facing: 'right'
      };

      setScore(0);
      setGameOver(false);
    };

    const checkCollisions = () => {
      const { kate, platforms } = gameStateRef.current;
      
      // Platform collisions
      kate.onGround = false;
      
      platforms.forEach(platform => {
        // Check if Kate is colliding with platform
        if (kate.x + kate.width > platform.x &&
            kate.x < platform.x + platform.width &&
            kate.y + kate.height > platform.y &&
            kate.y < platform.y + platform.height) {
          
          // Landing on top of platform
          if (kate.velY > 0 && kate.y < platform.y) {
            kate.y = platform.y - kate.height;
            kate.velY = 0;
            kate.onGround = true;
          }
          // Hitting platform from below
          else if (kate.velY < 0 && kate.y > platform.y) {
            kate.y = platform.y + platform.height;
            kate.velY = 0;
          }
          // Side collisions
          else if (kate.velX > 0 && kate.x < platform.x) {
            kate.x = platform.x - kate.width;
            kate.velX = 0;
          }
          else if (kate.velX < 0 && kate.x > platform.x) {
            kate.x = platform.x + platform.width;
            kate.velX = 0;
          }
        }
      });
      
      // Collectible collisions
      gameStateRef.current.collectibles.forEach(collectible => {
        if (!collectible.collected &&
            kate.x + kate.width > collectible.x - 10 &&
            kate.x < collectible.x + 20 &&
            kate.y + kate.height > collectible.y - 10 &&
            kate.y < collectible.y + 20) {
          
          collectible.collected = true;
          setScore(prev => prev + collectible.points);
        }
      });
      
      // Check win condition
      if (gameStateRef.current.collectibles.every(c => c.collected)) {
        setGameOver(true);
      }
      
      // Check if Kate fell off the screen
      if (kate.y > canvas.height) {
        setGameOver(true);
      }
    };

    const update = () => {
      if (!gameStarted || gameOver) return;
      
      const { kate, gravity, jumpPower, speed, keys } = gameStateRef.current;
      
      // Handle input
      if (keys.left) {
        kate.velX = -speed;
        kate.facing = 'left';
      } else if (keys.right) {
        kate.velX = speed;
        kate.facing = 'right';
      } else {
        kate.velX *= 0.8; // Friction
      }
      
      if (keys.jump && kate.onGround) {
        kate.velY = jumpPower;
        kate.onGround = false;
      }
      
      // Apply gravity
      if (!kate.onGround) {
        kate.velY += gravity;
      }
      
      // Update position
      kate.x += kate.velX;
      kate.y += kate.velY;
      
      // Keep Kate on screen horizontally
      if (kate.x < 0) kate.x = 0;
      if (kate.x + kate.width > canvas.width) kate.x = canvas.width - kate.width;
      
      checkCollisions();
    };

    const draw = () => {
      // Clear canvas with theme background
      ctx.fillStyle = assets.environment.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw background elements
      assets.environment.backgroundElements.forEach((element, index) => {
        ctx.font = '24px Arial';
        ctx.fillStyle = assets.environment.accentColor;
        ctx.fillText(element, 50 + (index * 80), 50 + Math.sin(Date.now() * 0.001 + index) * 10);
      });
      
      // Draw platforms
      gameStateRef.current.platforms.forEach(platform => {
        if (platform.type === 'ground') {
          ctx.fillStyle = assets.environment.groundColor;
        } else {
          ctx.fillStyle = assets.environment.platformColor;
        }
        
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        
        // Add platform decoration
        ctx.fillStyle = assets.environment.accentColor;
        ctx.fillRect(platform.x + 2, platform.y + 2, platform.width - 4, 4);
      });
      
      // Draw collectibles
      gameStateRef.current.collectibles.forEach((collectible, index) => {
        if (!collectible.collected) {
          const collectibleAsset = assets.collectibles[index % assets.collectibles.length];
          
          // Draw collectible with bounce animation
          const bounceY = collectible.y + Math.sin(Date.now() * 0.005 + index) * 3;
          
          ctx.fillStyle = collectibleAsset?.color || '#F59E0B';
          ctx.beginPath();
          ctx.arc(collectible.x + 10, bounceY + 10, 8, 0, Math.PI * 2);
          ctx.fill();
          
          // Add emoji/symbol
          ctx.font = '16px Arial';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(collectibleAsset?.emoji || '⭐', collectible.x + 10, bounceY + 15);
        }
      });
      
      // Draw Kate (Mario-style character)
      const { kate } = gameStateRef.current;
      
      // Body
      ctx.fillStyle = assets.player.color;
      ctx.fillRect(kate.x, kate.y, kate.width, kate.height);
      
      // Add character details
      ctx.fillStyle = assets.player.secondaryColor;
      ctx.fillRect(kate.x + 2, kate.y + 2, kate.width - 4, kate.height - 10);
      
      // Face/head
      ctx.fillStyle = assets.player.accent;
      ctx.beginPath();
      ctx.arc(kate.x + kate.width/2, kate.y + 6, 6, 0, Math.PI * 2);
      ctx.fill();
      
      // Add theme-specific character emoji
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000000';
      ctx.fillText(assets.player.emoji, kate.x + kate.width/2, kate.y - 8);
      
      // Direction indicator (simple)
      ctx.fillStyle = assets.player.color;
      if (kate.facing === 'right') {
        ctx.fillRect(kate.x + kate.width - 2, kate.y + kate.height/2 - 2, 4, 4);
      } else {
        ctx.fillRect(kate.x - 2, kate.y + kate.height/2 - 2, 4, 4);
      }
    };

    const gameLoop = () => {
      update();
      draw();
      if (gameStarted && !gameOver) {
        gameStateRef.current.gameLoop = requestAnimationFrame(gameLoop);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const { keys } = gameStateRef.current;
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          keys.left = true;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          keys.right = true;
          break;
        case 'ArrowUp':
        case ' ':
        case 'w':
        case 'W':
          keys.jump = true;
          e.preventDefault();
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const { keys } = gameStateRef.current;
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          keys.left = false;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          keys.right = false;
          break;
        case 'ArrowUp':
        case ' ':
        case 'w':
        case 'W':
          keys.jump = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    if (gameStarted) {
      initGame();
      gameLoop();
    } else {
      initGame();
      draw();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameStateRef.current.gameLoop) {
        cancelAnimationFrame(gameStateRef.current.gameLoop);
      }
    };
  }, [gameStarted, gameOver, assets, currentTheme]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex justify-between items-center w-full max-w-md">
        <div className="text-lg font-bold" style={{ color: assets.environment.accentColor }}>
          Score: {score}
        </div>
        <div className="text-sm" style={{ color: assets.environment.accentColor }}>
          Items: {gameStateRef.current.collectibles.filter(c => c.collected).length} / {gameStateRef.current.collectibles.length}
        </div>
      </div>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="border-2 rounded-lg"
          style={{ 
            borderColor: assets.environment.accentColor,
            backgroundColor: assets.environment.backgroundColor 
          }}
        />
        
        {!gameStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-lg font-bold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: assets.player.color }}
            >
              Start {assets.player.name} Adventure
            </button>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">
              {gameStateRef.current.collectibles.every(c => c.collected) ? 'You Win!' : 'Game Over!'}
            </h3>
            <p className="text-white mb-4">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="px-6 py-3 rounded-lg font-bold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: assets.player.color }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      
      <div className="text-center text-sm opacity-75 max-w-md">
        <p>Arrow keys or WASD to move, Spacebar/W to jump</p>
        <p>Collect all {assets.collectibles[0]?.name || 'items'} to win!</p>
        <p className="text-xs mt-2">
          Theme: {currentTheme} | Character: {assets.player.emoji} {assets.player.name}
        </p>
      </div>
    </div>
  );
};

export default MarioGame;
