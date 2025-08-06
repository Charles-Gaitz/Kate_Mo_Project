import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { gameAssets } from '../../config/gameAssets';

const DinosaurGame = () => {
  const { currentTheme } = useTheme();
  const assets = gameAssets[currentTheme];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(() => 
    parseInt(localStorage.getItem(`dino-high-score-${currentTheme}`) || '0')
  );

  const gameStateRef = useRef({
    kate: { 
      x: 80, 
      y: 220, 
      velY: 0, 
      isJumping: false, 
      isDucking: false,
      width: 20, 
      height: 25,
      groundY: 220
    },
    obstacles: [] as Array<{ x: number, y: number, width: number, height: number, type: string }>,
    collectibles: [] as Array<{ x: number, y: number, collected: boolean, type: string }>,
    clouds: [] as Array<{ x: number, y: number, speed: number }>,
    gameLoop: null as number | null,
    gameSpeed: 4,
    gravity: 0.6,
    jumpPower: -13,
    frameCount: 0,
    obstacleTimer: 0,
    collectibleTimer: 0,
    groundOffset: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const initGame = () => {
      gameStateRef.current.kate = { 
        x: 80, 
        y: 220, 
        velY: 0, 
        isJumping: false, 
        isDucking: false,
        width: 20, 
        height: 25,
        groundY: 220
      };
      
      gameStateRef.current.obstacles = [];
      gameStateRef.current.collectibles = [];
      
      // Initialize background clouds
      gameStateRef.current.clouds = [
        { x: 200, y: 50, speed: 0.5 },
        { x: 400, y: 40, speed: 0.3 },
        { x: 500, y: 60, speed: 0.4 }
      ];
      
      gameStateRef.current.gameSpeed = 4;
      gameStateRef.current.frameCount = 0;
      gameStateRef.current.obstacleTimer = 0;
      gameStateRef.current.collectibleTimer = 0;
      gameStateRef.current.groundOffset = 0;
      
      setScore(0);
      setGameOver(false);
    };

    const spawnObstacle = () => {
      const canvas = canvasRef.current!;
      
      const obstacleTypes = [
        { width: 15, height: 30, type: 'tall' },
        { width: 25, height: 15, type: 'wide' },
        { width: 12, height: 35, type: 'thin' }
      ];
      
      const obstacle = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
      
      gameStateRef.current.obstacles.push({
        x: canvas.width + 50,
        y: 220 + 25 - obstacle.height,
        width: obstacle.width,
        height: obstacle.height,
        type: obstacle.type
      });
    };

    const spawnCollectible = () => {
      const canvas = canvasRef.current!;
      
      gameStateRef.current.collectibles.push({
        x: canvas.width + 100,
        y: 170 + Math.random() * 30,
        collected: false,
        type: assets.collectibles[Math.floor(Math.random() * assets.collectibles.length)]?.name || 'item'
      });
    };

    const checkCollisions = () => {
      const { kate, obstacles, collectibles } = gameStateRef.current;
      
      // Obstacle collisions
      obstacles.forEach(obstacle => {
        if (kate.x + kate.width > obstacle.x &&
            kate.x < obstacle.x + obstacle.width &&
            kate.y + kate.height > obstacle.y &&
            kate.y < obstacle.y + obstacle.height) {
          setGameOver(true);
        }
      });
      
      // Collectible collisions
      collectibles.forEach(collectible => {
        if (!collectible.collected &&
            Math.abs(kate.x + kate.width/2 - collectible.x) < 15 &&
            Math.abs(kate.y + kate.height/2 - collectible.y) < 15) {
          
          collectible.collected = true;
          setScore(prev => {
            const newScore = prev + 50;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem(`dino-high-score-${currentTheme}`, newScore.toString());
            }
            return newScore;
          });
        }
      });
    };

    const update = () => {
      if (!gameStarted || gameOver) return;
      
      const { kate } = gameStateRef.current;
      
      gameStateRef.current.frameCount++;
      
      // Increase score over time
      if (gameStateRef.current.frameCount % 10 === 0) {
        setScore(prev => {
          const newScore = prev + 1;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem(`dino-high-score-${currentTheme}`, newScore.toString());
          }
          return newScore;
        });
      }
      
      // Gradually increase game speed
      if (gameStateRef.current.frameCount % 300 === 0) {
        gameStateRef.current.gameSpeed = Math.min(gameStateRef.current.gameSpeed + 0.5, 8);
      }
      
      // Kate physics
      if (kate.isJumping) {
        kate.velY += gameStateRef.current.gravity;
        kate.y += kate.velY;
        
        if (kate.y >= kate.groundY) {
          kate.y = kate.groundY;
          kate.velY = 0;
          kate.isJumping = false;
        }
      }
      
      // Move ground
      gameStateRef.current.groundOffset -= gameStateRef.current.gameSpeed;
      if (gameStateRef.current.groundOffset <= -40) {
        gameStateRef.current.groundOffset = 0;
      }
      
      // Move and spawn obstacles
      gameStateRef.current.obstacles.forEach((obstacle, index) => {
        obstacle.x -= gameStateRef.current.gameSpeed;
        if (obstacle.x + obstacle.width < 0) {
          gameStateRef.current.obstacles.splice(index, 1);
        }
      });
      
      gameStateRef.current.obstacleTimer++;
      if (gameStateRef.current.obstacleTimer > 60 + Math.random() * 60) {
        spawnObstacle();
        gameStateRef.current.obstacleTimer = 0;
      }
      
      // Move and spawn collectibles
      gameStateRef.current.collectibles.forEach((collectible, index) => {
        collectible.x -= gameStateRef.current.gameSpeed;
        if (collectible.x < -20) {
          gameStateRef.current.collectibles.splice(index, 1);
        }
      });
      
      gameStateRef.current.collectibleTimer++;
      if (gameStateRef.current.collectibleTimer > 200 + Math.random() * 100) {
        spawnCollectible();
        gameStateRef.current.collectibleTimer = 0;
      }
      
      // Move clouds
      gameStateRef.current.clouds.forEach(cloud => {
        cloud.x -= cloud.speed;
        if (cloud.x < -50) {
          cloud.x = canvas.width + 50;
        }
      });
      
      checkCollisions();
    };

    const draw = () => {
      const canvas = canvasRef.current!;
      
      // Clear canvas with theme background
      ctx.fillStyle = assets.environment.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw background elements (clouds)
      gameStateRef.current.clouds.forEach(cloud => {
        ctx.font = '20px Arial';
        ctx.fillStyle = assets.environment.accentColor + '60';
        ctx.fillText(assets.environment.backgroundElements[0] || '☁️', cloud.x, cloud.y);
      });
      
      // Draw ground
      const groundY = 245;
      ctx.fillStyle = assets.environment.groundColor;
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
      
      // Ground pattern
      ctx.fillStyle = assets.environment.accentColor;
      for (let i = gameStateRef.current.groundOffset; i < canvas.width + 40; i += 40) {
        ctx.fillRect(i, groundY + 3, 20, 2);
      }
      
      // Draw obstacles
      gameStateRef.current.obstacles.forEach(obstacle => {
        ctx.fillStyle = assets.enemies[0]?.color || '#EF4444';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        
        // Add obstacle emoji
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(assets.enemies[0]?.emoji || '⚠️', obstacle.x + obstacle.width/2, obstacle.y + obstacle.height/2 + 4);
      });
      
      // Draw collectibles
      gameStateRef.current.collectibles.forEach((collectible, index) => {
        if (!collectible.collected) {
          const collectibleAsset = assets.collectibles[index % assets.collectibles.length];
          const bounceY = collectible.y + Math.sin(Date.now() * 0.01 + index) * 2;
          
          ctx.fillStyle = collectibleAsset?.color || '#F59E0B';
          ctx.beginPath();
          ctx.arc(collectible.x, bounceY, 6, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(collectibleAsset?.emoji || '⭐', collectible.x, bounceY + 4);
        }
      });
      
      // Draw Kate
      const { kate } = gameStateRef.current;
      
      // Body
      ctx.fillStyle = assets.player.color;
      if (kate.isDucking) {
        ctx.fillRect(kate.x, kate.y + 10, kate.width + 8, kate.height - 10);
      } else {
        ctx.fillRect(kate.x, kate.y, kate.width, kate.height);
      }
      
      // Character details
      ctx.fillStyle = assets.player.secondaryColor;
      ctx.fillRect(kate.x + 2, kate.y + 2, kate.width - 4, 8);
      
      // Head
      ctx.fillStyle = assets.player.accent;
      ctx.beginPath();
      ctx.arc(kate.x + kate.width/2, kate.y + 6, 5, 0, Math.PI * 2);
      ctx.fill();
      
      // Character emoji
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000000';
      ctx.fillText(assets.player.emoji, kate.x + kate.width/2, kate.y - 6);
      
      // Running animation
      if (!kate.isJumping && !kate.isDucking) {
        const legOffset = Math.sin(Date.now() * 0.02) * 2;
        ctx.fillStyle = assets.player.color;
        ctx.fillRect(kate.x + 4, kate.y + kate.height, 2, 6 + legOffset);
        ctx.fillRect(kate.x + 10, kate.y + kate.height, 2, 6 - legOffset);
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
      if (!gameStarted || gameOver) return;
      
      const { kate } = gameStateRef.current;
      
      switch (e.key) {
        case 'ArrowUp':
        case ' ':
        case 'w':
        case 'W':
          if (!kate.isJumping) {
            kate.velY = gameStateRef.current.jumpPower;
            kate.isJumping = true;
          }
          e.preventDefault();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          kate.isDucking = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const { kate } = gameStateRef.current;
      
      switch (e.key) {
        case 'ArrowDown':
        case 's':
        case 'S':
          kate.isDucking = false;
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
  }, [gameStarted, gameOver, assets, currentTheme, highScore]);

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
          High: {highScore}
        </div>
      </div>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={600}
          height={280}
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
              Start {assets.player.name} Run
            </button>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">Game Over!</h3>
            <p className="text-white mb-2">Score: {score}</p>
            {score === highScore && score > 0 && (
              <p className="text-yellow-400 mb-4">🏆 New High Score!</p>
            )}
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
        <p>Spacebar/W to jump, S to duck</p>
        <p>Avoid {assets.enemies[0]?.name || 'obstacles'}, collect {assets.collectibles[0]?.name || 'items'}!</p>
        <p className="text-xs mt-2">
          Theme: {currentTheme} | Character: {assets.player.emoji} {assets.player.name}
        </p>
      </div>
    </div>
  );
};

export default DinosaurGame;
