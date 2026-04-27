import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_SPEED = 150;

export default function SnakeGame({ onScoreUpdate }: { onScoreUpdate: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const generateFood = useCallback((currentSnake: { x: number, y: number }[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Check if food is on snake
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    onScoreUpdate(0);
    setSpeed(INITIAL_SPEED);
    setGameStarted(true);
    setFood(generateFood(INITIAL_SNAKE));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveSnake = () => {
      const newHead = {
        x: (snake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (snake[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return;
      }

      const newSnake = [newHead, ...snake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => {
          const newScore = s + 10;
          onScoreUpdate(newScore);
          return newScore;
        });
        setFood(generateFood(newSnake));
        setSpeed(prev => Math.max(prev - 2, 70));
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const gameLoop = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoop);
  }, [snake, direction, food, gameOver, gameStarted, speed, generateFood, onScoreUpdate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const tileSize = canvas.width / GRID_SIZE;

    // Clear board
    ctx.fillStyle = '#0a0a0a'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * tileSize, 0);
      ctx.lineTo(i * tileSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * tileSize);
      ctx.lineTo(canvas.width, i * tileSize);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      ctx.shadowBlur = isHead ? 25 : 10;
      ctx.shadowColor = isHead ? '#00ffff' : '#ff00ff';
      ctx.fillStyle = isHead ? '#00ffff' : '#ff00ff'; 
      
      const padding = index === 0 ? 0 : 2;
      ctx.fillRect(
        segment.x * tileSize + padding,
        segment.y * tileSize + padding,
        tileSize - padding * 2,
        tileSize - padding * 2
      );
    });

    // Draw food (Yellow Glitch)
    ctx.shadowBlur = 30;
    ctx.shadowColor = '#ffff00';
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(
      food.x * tileSize + 3,
      food.y * tileSize + 3,
      tileSize - 6,
      tileSize - 6
    );

    // Reset shadow
    ctx.shadowBlur = 0;

  }, [snake, food]);

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative group overflow-hidden border-2 border-cyan-400 bg-black shadow-[0_0_50px_rgba(0,255,255,0.1)]">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="max-w-full aspect-square md:w-[400px] md:h-[400px] opacity-90 contrast-125"
        />

        <AnimatePresence>
          {(!gameStarted || gameOver) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md"
            >
              {gameOver && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mb-8 text-center"
                >
                  <h2 className="text-6xl font-black text-fuchsia-500 mb-2 glitch-text tracking-tighter">
                    HALT.EXE
                  </h2>
                  <p className="text-cyan-400 font-mono text-2xl uppercase tracking-widest">DATA_LOST: {score}</p>
                </motion.div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05, skewX: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="flex items-center gap-4 px-10 py-4 bg-cyan-400 text-black font-black text-xl uppercase tracking-tighter shadow-[0_0_30px_rgba(0,255,255,0.4)]"
              >
                {gameOver ? <RotateCcw size={24} /> : <Play size={24} />}
                {gameOver ? 'REBOOT' : 'EXECUTE_MAIN'}
              </motion.button>
              
              {!gameOver && (
                <p className="mt-6 text-fuchsia-500 text-xs font-bold uppercase tracking-[0.4em] animate-pulse">
                  // INPUT_KEYS: ARROW_UP_DOWN_LEFT_RIGHT
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="mt-6 flex gap-12">
        <div className="text-center">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] mb-2 font-black italic">CURRENT_BUFFER</p>
          <p className="text-4xl font-black text-cyan-400 font-mono tracking-tighter">{score.toString().padStart(4, '0')}</p>
        </div>
      </div>
    </div>
  );
}
