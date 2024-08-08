// app/components/Obstacle.tsx
import React from "react";

interface ObstacleProps {
  id: string;
  left: number;
}

export const Obstacle: React.FC<ObstacleProps> = ({ id, left }) => {
  return <div id={id} className="obstacle" style={{ left: `${left}%` }} />;
};
