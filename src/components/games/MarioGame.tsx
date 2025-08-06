import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { gameAssets } from '../../config/gameAssets';

const MarioGame = () => {
  const { currentTheme } = useTheme();
  const assets = gameAssets[currentTheme];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [grassPercentage, setGrassPercentage] = useState(100);

  const gameStateRef = useRef({
    kate: { 
      x: 50, 
      y: 50, 
      width: 20, 
      height: 20,
      direction: 'right' as 'up' | 'down' | 'left' | 'right',
      speed: 2,
      mowerWidth: 25,
      mowerHeight: 25
    },
    grass: [] as Array<{ x: number, y: number, mowed: boolean }>,
    mowedTrail: [] as Array<{ x: number, y: number }>,
    lawnShape: [] as Array<{ x: number, y: number, width: number, height: number }>,
    gameLoop: null as number | null,
    gridSize: 10,
    keys: {
      up: false,
      down: false,
      left: false,
      right: false
    },
    lastMowedPosition: { x: -1, y: -1 }
  });

  // Level configurations with different lawn shapes
  const levelShapes = [
    // Level 1: Rectangle
    [{ x: 100, y: 100, width: 400, height: 200 }],
    // Level 2: L-Shape
    [
      { x: 100, y: 100, width: 200, height: 150 },
      { x: 100, y: 250, width: 350, height: 100 }
    ],
    // Level 3: U-Shape
    [
      { x: 100, y: 100, width: 100, height: 200 },
      { x: 100, y: 300, width: 300, height: 50 },
      { x: 300, y: 100, width: 100, height: 200 }
    ],
    // Level 4: Cross shape
    [
      { x: 200, y: 50, width: 100, height: 150 },
      { x: 100, y: 150, width: 300, height: 100 },
      { x: 200, y: 250, width: 100, height: 100 }
    ],
    // Level 5: Complex shape
    [
      { x: 50, y: 50, width: 150, height: 100 },
      { x: 250, y: 50, width: 150, height: 100 },
      { x: 100, y: 150, width: 250, height: 50 },
      { x: 150, y: 200, width: 150, height: 100 }
    ]
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const initLevel = () => {
      const currentLevelShapes = levelShapes[(level - 1) % levelShapes.length];
      gameStateRef.current.lawnShape = currentLevelShapes;
      
      // Generate grass grid based on lawn shape
      const grass: Array<{ x: number, y: number, mowed: boolean }> = [];
      const gridSize = gameStateRef.current.gridSize;
      
      currentLevelShapes.forEach(shape => {
        for (let x = shape.x; x < shape.x + shape.width; x += gridSize) {
          for (let y = shape.y; y < shape.y + shape.height; y += gridSize) {
            grass.push({ x, y, mowed: false });
          }
        }
      });
      
      gameStateRef.current.grass = grass;
      gameStateRef.current.mowedTrail = [];
      gameStateRef.current.lastMowedPosition = { x: -1, y: -1 };
      
      // Position Kate at the start of the first shape
      if (currentLevelShapes.length > 0) {
        gameStateRef.current.kate.x = currentLevelShapes[0].x + 10;
        gameStateRef.current.kate.y = currentLevelShapes[0].y + 10;
      }
      
      setGrassPercentage(100);
      setLevelComplete(false);
      setGameOver(false);
    };

    const checkGrassCollision = (x: number, y: number) => {
      return gameStateRef.current.lawnShape.some(shape => 
        x >= shape.x && x <= shape.x + shape.width &&
        y >= shape.y && y <= shape.y + shape.height
      );
    };

    const mowGrass = () => {
      const { kate, grass } = gameStateRef.current;
      const gridSize = gameStateRef.current.gridSize;
      
      // Find grass tiles under the mower
      grass.forEach(grassTile => {
        const distance = Math.sqrt(
          Math.pow(kate.x + kate.width/2 - grassTile.x, 2) + 
          Math.pow(kate.y + kate.height/2 - grassTile.y, 2)
        );
        
        if (distance < gridSize * 1.5 && !grassTile.mowed) {
          grassTile.mowed = true;
          
          // Add to mowed trail
          gameStateRef.current.mowedTrail.push({
            x: grassTile.x,
            y: grassTile.y
          });
          
          // Update score
          setScore(prev => prev + 10);
        }
      });
      
      // Check if lawn is complete
      const totalGrass = grass.length;
      const mowedGrass = grass.filter(g => g.mowed).length;
      const percentage = totalGrass > 0 ? ((totalGrass - mowedGrass) / totalGrass) * 100 : 0;
      setGrassPercentage(Math.max(0, percentage));
      
      if (mowedGrass >= totalGrass * 0.95) { // 95% completion
        setLevelComplete(true);
        setScore(prev => prev + level * 500); // Bonus points for completing level
      }
    };

    const checkGameOver = () => {
      const { kate, mowedTrail } = gameStateRef.current;
      const currentPos = { 
        x: Math.floor(kate.x / gameStateRef.current.gridSize) * gameStateRef.current.gridSize,
        y: Math.floor(kate.y / gameStateRef.current.gridSize) * gameStateRef.current.gridSize
      };
      
      // Check if Kate stepped on already mowed grass (excluding the immediate last position)
      const isOnMowedGrass = mowedTrail.some((trail, index) => {
        if (index === mowedTrail.length - 1) return false; // Don't count the most recent tile
        
        const distance = Math.sqrt(
          Math.pow(currentPos.x - trail.x, 2) + 
          Math.pow(currentPos.y - trail.y, 2)
        );
        return distance < gameStateRef.current.gridSize;
      });
      
      // Check if Kate is outside the lawn boundaries
      const isInBounds = checkGrassCollision(kate.x + kate.width/2, kate.y + kate.height/2);
      
      if (isOnMowedGrass || !isInBounds) {
        setGameOver(true);
      }
    };

    const update = () => {
      if (!gameStarted || gameOver || levelComplete) return;
      
      const { kate, keys } = gameStateRef.current;
      
      // Update Kate's position based on keys
      if (keys.up && kate.y > 0) {
        kate.y -= kate.speed;
        kate.direction = 'up';
      }
      if (keys.down && kate.y < 350) {
        kate.y += kate.speed;
        kate.direction = 'down';
      }
      if (keys.left && kate.x > 0) {
        kate.x -= kate.speed;
        kate.direction = 'left';
      }
      if (keys.right && kate.x < 570) {
        kate.x += kate.speed;
        kate.direction = 'right';
      }
      
      mowGrass();
      checkGameOver();
    };

    const draw = () => {
      const canvas = canvasRef.current!;
      
      // Clear canvas with background
      ctx.fillStyle = assets.environment.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw lawn shapes (unmowed grass)
      gameStateRef.current.grass.forEach(grassTile => {
        if (!grassTile.mowed) {
          ctx.fillStyle = assets.environment.groundColor;
          ctx.fillRect(grassTile.x, grassTile.y, gameStateRef.current.gridSize, gameStateRef.current.gridSize);
          
          // Add grass texture
          ctx.fillStyle = '#90EE90'; // Light green for grass
          ctx.fillRect(grassTile.x + 1, grassTile.y + 1, gameStateRef.current.gridSize - 2, gameStateRef.current.gridSize - 2);
        }
      });
      
      // Draw mowed trail
      gameStateRef.current.mowedTrail.forEach(trail => {
        ctx.fillStyle = '#8B4513'; // Brown for mowed areas
        ctx.fillRect(trail.x, trail.y, gameStateRef.current.gridSize, gameStateRef.current.gridSize);
        
        // Add mowed grass pattern
        ctx.fillStyle = '#A0522D';
        ctx.fillRect(trail.x + 2, trail.y + 2, gameStateRef.current.gridSize - 4, gameStateRef.current.gridSize - 4);
      });
      
      // Draw Kate's lawn mower
      const { kate } = gameStateRef.current;
      
      // Mower body
      ctx.fillStyle = assets.player.color;
      ctx.fillRect(kate.x, kate.y, kate.width, kate.height);
      
      // Mower details based on direction
      ctx.fillStyle = assets.player.secondaryColor;
      switch(kate.direction) {
        case 'up':
          ctx.fillRect(kate.x + 5, kate.y - 3, 10, 3);
          break;
        case 'down':
          ctx.fillRect(kate.x + 5, kate.y + kate.height, 10, 3);
          break;
        case 'left':
          ctx.fillRect(kate.x - 3, kate.y + 5, 3, 10);
          break;
        case 'right':
          ctx.fillRect(kate.x + kate.width, kate.y + 5, 3, 10);
          break;
      }
      
      // Character indicator
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000000';
      ctx.fillText(assets.player.emoji, kate.x + kate.width/2, kate.y - 5);
      
      // Cutting effect around mower
      if (gameStarted && !gameOver && !levelComplete) {
        ctx.strokeStyle = assets.player.accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(kate.x + kate.width/2, kate.y + kate.height/2, 15, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const gameLoop = () => {
      update();
      draw();
      if (gameStarted && !gameOver && !levelComplete) {
        gameStateRef.current.gameLoop = requestAnimationFrame(gameLoop);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver || levelComplete) return;
      
      const { keys } = gameStateRef.current;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          keys.up = true;
          e.preventDefault();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          keys.down = true;
          e.preventDefault();
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          keys.left = true;
          e.preventDefault();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          keys.right = true;
          e.preventDefault();
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const { keys } = gameStateRef.current;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          keys.up = false;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          keys.down = false;
          break;
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    if (gameStarted) {
      initLevel();
      gameLoop();
    } else {
      initLevel();
      draw();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameStateRef.current.gameLoop) {
        cancelAnimationFrame(gameStateRef.current.gameLoop);
      }
    };
  }, [gameStarted, gameOver, levelComplete, level, assets, currentTheme]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setLevelComplete(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setLevelComplete(false);
    setLevel(1);
    setScore(0);
    setGrassPercentage(100);
  };

  const nextLevel = () => {
    setLevel(prev => prev + 1);
    setLevelComplete(false);
    setGameStarted(true);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex justify-between items-center w-full max-w-md">
        <div className="text-lg font-bold" style={{ color: assets.environment.accentColor }}>
          Score: {score}
        </div>
        <div className="text-sm" style={{ color: assets.environment.accentColor }}>
          Level: {level}
        </div>
        <div className="text-sm" style={{ color: assets.environment.accentColor }}>
          Grass: {Math.round(grassPercentage)}%
        </div>
      </div>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="border-2 rounded-lg game-button"
          style={{ 
            borderColor: assets.environment.accentColor,
            backgroundColor: assets.environment.backgroundColor 
          }}
          tabIndex={0}
        />
        
        {!gameStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <button
              onClick={startGame}
              className="game-button px-6 py-3 rounded-lg font-bold text-white transition-transform hover:scale-105 focus:scale-105"
              style={{ backgroundColor: assets.player.color }}
              aria-label={`Start ${assets.player.name} Lawn Mowing Game`}
            >
              Start {assets.player.name}'s Lawn Service
            </button>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">Game Over!</h3>
            <p className="text-white mb-2">You went over already mowed grass or left the lawn!</p>
            <p className="text-white mb-4">Score: {score} | Level: {level}</p>
            <button
              onClick={resetGame}
              className="game-button px-6 py-3 rounded-lg font-bold text-white transition-transform hover:scale-105 focus:scale-105"
              style={{ backgroundColor: assets.player.color }}
              aria-label="Restart lawn mowing game"
            >
              Try Again
            </button>
          </div>
        )}
        
        {levelComplete && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 rounded-lg">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">🏆 Level Complete!</h3>
            <p className="text-white mb-2">Excellent mowing! Lawn is pristine!</p>
            <p className="text-white mb-4">Score: {score} | Level: {level}</p>
            <div className="space-x-4">
              <button
                onClick={nextLevel}
                className="game-button px-6 py-3 rounded-lg font-bold text-white transition-transform hover:scale-105 focus:scale-105"
                style={{ backgroundColor: assets.collectibles[0]?.color || '#F59E0B' }}
                aria-label="Continue to next level"
              >
                Next Level
              </button>
              <button
                onClick={resetGame}
                className="game-button px-4 py-3 rounded-lg font-bold text-white transition-transform hover:scale-105 focus:scale-105"
                style={{ backgroundColor: assets.player.color }}
                aria-label="Restart from level 1"
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-center text-sm opacity-75 max-w-md">
        <p>Arrow keys or WASD to move the lawn mower</p>
        <p>Mow all the grass without going over already mowed areas!</p>
        <p className="text-xs mt-2">
          Theme: {currentTheme} | Gardener: {assets.player.emoji} {assets.player.name}
        </p>
      </div>
    </div>
  );
};

export default MarioGame;
