import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { gameAssets } from '../../config/gameAssets';

const PacmanGame = () => {
  const { currentTheme } = useTheme();
  const assets = gameAssets[currentTheme];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  const gameStateRef = useRef({
    kate: { x: 1, y: 1, direction: 'right' as 'right' | 'left' | 'up' | 'down' },
    dots: [] as Array<{ x: number, y: number, collected: boolean, type: 'small' | 'large' }>,
    ghosts: [] as Array<{ x: number, y: number, direction: string }>,
    gameLoop: null as number | null,
    maze: [] as number[][],
    cellSize: 20
  });

  // Simple maze layout (0 = wall, 1 = dot, 2 = power pellet, 3 = empty)
  const createMaze = () => {
    return [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0],
      [0,2,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,2,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,1,0],
      [0,1,1,1,1,0,1,1,1,0,0,1,1,1,0,1,1,1,1,0],
      [0,0,0,0,1,0,0,0,3,0,0,3,0,0,0,1,0,0,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { cellSize } = gameStateRef.current;
    
    const initGame = () => {
      gameStateRef.current.maze = createMaze();
      gameStateRef.current.kate = { x: 1, y: 1, direction: 'right' };
      
      // Initialize dots from maze
      gameStateRef.current.dots = [];
      const maze = gameStateRef.current.maze;
      for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
          if (maze[row][col] === 1) {
            gameStateRef.current.dots.push({ x: col, y: row, collected: false, type: 'small' });
          } else if (maze[row][col] === 2) {
            gameStateRef.current.dots.push({ x: col, y: row, collected: false, type: 'large' });
          }
        }
      }

      // Initialize ghosts
      gameStateRef.current.ghosts = [
        { x: 9, y: 4, direction: 'up' },
        { x: 10, y: 4, direction: 'down' }
      ];

      setLives(3);
      setGameOver(false);
      setScore(0);
    };

    const isValidMove = (x: number, y: number) => {
      const maze = gameStateRef.current.maze;
      if (y < 0 || y >= maze.length || x < 0 || x >= maze[0].length) return false;
      return maze[y][x] !== 0; // Can move if not a wall
    };

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = assets.environment.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw maze walls
      const maze = gameStateRef.current.maze;
      for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
          if (maze[row][col] === 0) {
            ctx.fillStyle = assets.environment.platformColor;
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
          }
        }
      }
      
      // Draw dots
      gameStateRef.current.dots.forEach(dot => {
        if (!dot.collected) {
          const x = dot.x * cellSize + cellSize / 2;
          const y = dot.y * cellSize + cellSize / 2;
          
          ctx.fillStyle = assets.collectibles[0]?.color || '#F59E0B';
          ctx.beginPath();
          if (dot.type === 'large') {
            ctx.arc(x, y, 6, 0, Math.PI * 2);
          } else {
            ctx.arc(x, y, 2, 0, Math.PI * 2);
          }
          ctx.fill();
        }
      });
      
      // Draw Kate (Pac-Man style)
      const { kate } = gameStateRef.current;
      const kateX = kate.x * cellSize + cellSize / 2;
      const kateY = kate.y * cellSize + cellSize / 2;
      
      ctx.fillStyle = assets.player.color;
      ctx.beginPath();
      ctx.arc(kateX, kateY, cellSize / 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw mouth based on direction
      ctx.fillStyle = assets.environment.backgroundColor;
      ctx.beginPath();
      let mouthAngle = 0;
      if (kate.direction === 'right') mouthAngle = 0;
      else if (kate.direction === 'down') mouthAngle = Math.PI / 2;
      else if (kate.direction === 'left') mouthAngle = Math.PI;
      else if (kate.direction === 'up') mouthAngle = 3 * Math.PI / 2;
      
      ctx.arc(kateX, kateY, cellSize / 3, mouthAngle - 0.3, mouthAngle + 0.3);
      ctx.lineTo(kateX, kateY);
      ctx.fill();
      
      // Draw ghosts
      gameStateRef.current.ghosts.forEach(ghost => {
        const ghostX = ghost.x * cellSize + cellSize / 2;
        const ghostY = ghost.y * cellSize + cellSize / 2;
        
        ctx.fillStyle = assets.enemies[0]?.color || '#EF4444';
        
        // Ghost body (rounded top, wavy bottom)
        ctx.beginPath();
        ctx.arc(ghostX, ghostY - 2, cellSize / 3, Math.PI, 0);
        ctx.lineTo(ghostX + cellSize / 3, ghostY + cellSize / 3);
        ctx.lineTo(ghostX + cellSize / 6, ghostY + cellSize / 6);
        ctx.lineTo(ghostX, ghostY + cellSize / 3);
        ctx.lineTo(ghostX - cellSize / 6, ghostY + cellSize / 6);
        ctx.lineTo(ghostX - cellSize / 3, ghostY + cellSize / 3);
        ctx.closePath();
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(ghostX - 4, ghostY - 4, 2, 0, Math.PI * 2);
        ctx.arc(ghostX + 4, ghostY - 4, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupils
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(ghostX - 4, ghostY - 4, 1, 0, Math.PI * 2);
        ctx.arc(ghostX + 4, ghostY - 4, 1, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const update = () => {
      if (!gameStarted || gameOver) return;
      
      // Check dot collection
      const { kate, dots } = gameStateRef.current;
      dots.forEach(dot => {
        if (!dot.collected && dot.x === kate.x && dot.y === kate.y) {
          dot.collected = true;
          setScore(prev => prev + (dot.type === 'large' ? 50 : 10));
        }
      });
      
      // Check if all dots collected (win condition)
      if (dots.every(dot => dot.collected)) {
        setGameOver(true);
      }
      
      // Simple ghost collision check
      const { ghosts } = gameStateRef.current;
      ghosts.forEach(ghost => {
        if (ghost.x === kate.x && ghost.y === kate.y) {
          setLives(prev => {
            const newLives = prev - 1;
            if (newLives <= 0) {
              setGameOver(true);
            } else {
              // Reset Kate position
              gameStateRef.current.kate = { x: 1, y: 1, direction: 'right' };
            }
            return newLives;
          });
        }
      });
    };

    const gameLoop = () => {
      update();
      draw();
      if (gameStarted && !gameOver) {
        gameStateRef.current.gameLoop = requestAnimationFrame(gameLoop);
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;
      
      const { kate } = gameStateRef.current;
      let newX = kate.x;
      let newY = kate.y;
      let newDirection = kate.direction;
      
      switch (e.key) {
        case 'ArrowRight':
        case 'd':
        case 'D':
          newX += 1;
          newDirection = 'right';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          newX -= 1;
          newDirection = 'left';
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          newY -= 1;
          newDirection = 'up';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          newY += 1;
          newDirection = 'down';
          break;
      }
      
      if (isValidMove(newX, newY)) {
        gameStateRef.current.kate = { x: newX, y: newY, direction: newDirection };
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    if (gameStarted) {
      initGame();
      gameLoop();
    } else {
      draw();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
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
    setLives(3);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex justify-between items-center w-full max-w-md">
        <div className="text-lg font-bold" style={{ color: assets.environment.accentColor }}>
          Score: {score}
        </div>
        <div className="text-lg font-bold" style={{ color: assets.environment.accentColor }}>
          Lives: {lives}
        </div>
      </div>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={180}
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
              Start {assets.player.name} Game
            </button>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">
              {lives <= 0 ? 'Game Over!' : 'You Win!'}
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
        <p>Use arrow keys or WASD to move {assets.player.name}</p>
        <p>Collect all {assets.collectibles[0]?.name || 'dots'} while avoiding enemies!</p>
        <p className="text-xs mt-2">
          Theme: {currentTheme} | Character: {assets.player.emoji} {assets.player.name}
        </p>
      </div>
    </div>
  );
};

export default PacmanGame;
