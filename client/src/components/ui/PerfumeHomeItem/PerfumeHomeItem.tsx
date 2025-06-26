import { Link } from "react-router-dom";
import type { PerfumeHomeItemProps } from "../../../types/UI.types";
import "./PerfumeHomeItem.css";

export default function PerfumeHomeItem({
  Perfume,
  Year,
  Brand,
  Country,
}: PerfumeHomeItemProps) {
  return (
    <Link
      className="Link"
      to={`/Perfumes/${Perfume.toLowerCase().trim().replace(/\s+/g, "-")}`}
    >
      <li className="perfume-home-item">
        <h3 className="perfume-home-item__name">{Perfume}</h3>
        <p className="perfume-home-item__meta">
          <time dateTime={Year.toString()} className="perfume-home-item__year">
            {Year}
          </time>
          <span className="perfume-home-item__separator">•</span>
          <span className="perfume-home-item__brand">{Brand}</span>
          <span className="perfume-home-item__separator">•</span>
          <span className="perfume-home-item__country">{Country}</span>
        </p>
      </li>
    </Link>
  );
}
