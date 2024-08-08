// app/routes/updateLeaderboard.ts
import { ActionFunction, json } from "@remix-run/node";
import { kv } from "@vercel/kv";

export const action: ActionFunction = async ({ request }) => {
  const { user, score } = await request.json();

  // Get current leaderboard
  let leaderboard =
    (await kv.get<{ user: string; score: number }[]>("leaderboard")) || [];

  // Add new score
  leaderboard.push({ user, score });

  // Sort leaderboard by score in descending order and keep top 10
  leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);

  // Save updated leaderboard
  await kv.set("leaderboard", leaderboard);

  return json({ success: true });
};
