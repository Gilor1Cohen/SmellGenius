import type { GoldBtnProps } from "../../../types/UI.types";

import "./goldBtn.css";

export default function GoldBtn({
  text,
  type,
  isDisabled,
  className,
  onClick,
}: GoldBtnProps) {
  return (
    <button
      id="gold-btn"
      type={type}
      disabled={isDisabled}
      className={className}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
