// app/components/Leaderboard.tsx
import React, { useEffect, useState } from "react";

interface LeaderboardEntry {
  user: string;
  score: number;
}

export const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch("/leaderboard");
      const data = await response.json();
      setLeaderboard(data);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {leaderboard.map((entry, index) => (
        <div key={index}>
          {index + 1}. {entry.user} - {entry.score}
        </div>
      ))}
    </div>
  );
};
