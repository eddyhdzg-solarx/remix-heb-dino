import React from "react";

interface DinoProps {
  jump: boolean;
}

export const Dino: React.FC<DinoProps> = ({ jump }) => {
  return <div className={`dino ${jump ? "jump" : ""}`} />;
};
