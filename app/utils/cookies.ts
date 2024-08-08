// app/utils/cookies.ts
import { createCookie } from "@remix-run/node";

export const userPrefs = createCookie("userName", {
  maxAge: 60 * 60 * 24 * 30, // 30 days
});
