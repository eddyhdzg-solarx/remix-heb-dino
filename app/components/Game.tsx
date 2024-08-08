// app/components/Game.tsx
import React, { useState, useEffect, useRef } from "react";
import { Dino } from "~/components/Dino";
import { Obstacle } from "~/components/Obstacle";
import { Leaderboard } from "~/components/Leaderboard";

export const Game: React.FC = () => {
  const [jump, setJump] = useState(false);
  const [obstacles, setObstacles] = useState<{ id: number; left: number }[]>(
    []
  );
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
      setObstacles((prev) => [...prev, { id: Date.now(), left: 100 }]);
    }, 2000);

    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    if (!gameRef.current) return;

    const checkCollision = () => {
      const dino = gameRef.current?.querySelector(".dino");
      if (!dino) return;

      const dinoRect = dino.getBoundingClientRect();

      obstacles.forEach((obstacle) => {
        const obstacleElement = gameRef.current?.querySelector(
          `#obstacle-${obstacle.id}`
        );
        if (!obstacleElement) return;

        const obstacleRect = obstacleElement.getBoundingClientRect();

        if (
          dinoRect.right > obstacleRect.left &&
          dinoRect.left < obstacleRect.right &&
          dinoRect.bottom > obstacleRect.top
        ) {
          setGameOver(true);
          updateLeaderboard(score);
        } else if (obstacle.left < 0) {
          // Increment score only when the obstacle goes out of view
          setObstacles((prev) => prev.filter((o) => o.id !== obstacle.id));
          setScore((prev) => prev + 1);
        }
      });
    };

    const gameLoop = setInterval(() => {
      if (!gameOver) {
        setObstacles((prev) =>
          prev.map((obstacle) => ({
            ...obstacle,
            left: obstacle.left - 1,
          }))
        );
        checkCollision();
      }
    }, 20);

    return () => clearInterval(gameLoop);
  }, [obstacles, gameOver, score]);

  const updateLeaderboard = async (score: number) => {
    const user = "Player1"; // Replace with actual user data
    await fetch("/updateLeaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, score }),
    });
  };

  return (
    <div className={`game ${gameOver ? "paused" : ""}`} ref={gameRef}>
      <Dino jump={jump} />
      {obstacles.map((obstacle) => (
        <Obstacle
          key={obstacle.id}
          id={`obstacle-${obstacle.id}`}
          left={obstacle.left}
        />
      ))}

      <div className="score">Score: {score}</div>
      <div className="leaderboard">
        <Leaderboard />
      </div>
      {gameOver && <div className="game-over">Game Over</div>}
    </div>
  );
};
