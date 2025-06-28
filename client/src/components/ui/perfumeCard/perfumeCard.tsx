import { Link } from "react-router-dom";
import type { PerfumeCardProps } from "../../../types/UI.types";
import "./perfumeCard.css";

export default function PerfumeCard({ p, idx, slug }: PerfumeCardProps) {
  return (
    <Link key={`${p.Perfume}-${idx}`} to={slug} className="perfume-card-link">
      <article className="perfume-card">
        <div className="perfume-card-content">
          <h4 className="perfume-card-name">{p.Perfume}</h4>
          <div className="perfume-card-flex">
            <p className="perfume-card-year">{p.Year || "Year unknown"}</p>
            <p className="perfume-card-brand">{p.Brand || "Brand unknown"}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
