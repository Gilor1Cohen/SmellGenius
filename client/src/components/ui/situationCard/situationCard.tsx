import type { SituationCardProps } from "../../../types/UI.types";
import "./situationCard.css";

export default function SituationCard({ text, onClick }: SituationCardProps) {
  return (
    <p className="situation-card" onClick={onClick}>
      {text}
    </p>
  );
}
