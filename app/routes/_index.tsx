// app/routes/game.tsx
import type { MetaFunction } from "@remix-run/node";
import { Game } from "~/components/Game";

export const meta: MetaFunction = () => {
  return [
    { title: "Dino HEB Remix Game" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default Game;
