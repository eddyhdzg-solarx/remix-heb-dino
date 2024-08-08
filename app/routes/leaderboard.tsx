// app/routes/leaderboard.tsx
import { LoaderFunction, json } from "@remix-run/node";
import { kv } from "@vercel/kv";

export const loader: LoaderFunction = async () => {
  const leaderboard =
    (await kv.get<{ user: string; score: number }[]>("leaderboard")) || [];
  return json(leaderboard);
};
