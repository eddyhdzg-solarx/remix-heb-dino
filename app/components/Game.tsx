// app/routes/game.tsx
import React, { useState, useEffect, useRef } from "react";
import { Dino } from "~/components/Dino";
import { Obstacle } from "~/components/Obstacle";

export const Game: React.FC = () => {
  const [jump, setJump] = useState(false);
  const [obstacles, setObstacles] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleJump = (event: KeyboardEvent) => {
      if (event.code === "Space" && !gameOver) {
        setJump(true);
        setTimeout(() => setJump(false), 300);
      }
    };

    window.addEventListener("keydown", handleJump);
    return () => window.removeEventListener("keydown", handleJump);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setObstacles((prev) => [...prev, Date.now()]);
      setScore((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    if (!gameRef.current) return;

    const checkCollision = () => {
      const dino = gameRef.current?.querySelector(".dino");
      const obstacle = gameRef.current?.querySelector(".obstacle");

      if (!dino || !obstacle) return;

      const dinoRect = dino.getBoundingClientRect();
      const obstacleRect = obstacle.getBoundingClientRect();

      if (
        dinoRect.right > obstacleRect.left &&
        dinoRect.left < obstacleRect.right &&
        dinoRect.bottom > obstacleRect.top
      ) {
        setGameOver(true);
      }
    };

    const gameLoop = setInterval(() => {
      if (!gameOver) {
        checkCollision();
      }
    }, 100);

    return () => clearInterval(gameLoop);
  }, [gameOver]);

  return (
    <div className={`game ${gameOver ? "paused" : ""}`} ref={gameRef}>
      <Dino jump={jump} />
      {obstacles.map((id) => (
        <Obstacle key={id} />
      ))}
      <div className="score">Score: {score}</div>
      {gameOver && <div className="game-over">Game Over</div>}
    </div>
  );
};
