import type { ShortPerfume } from "../../../types/Perfumes.types";
import type { BuyingRecommendationsBoxProps } from "../../../types/UI.types";
import PerfumeCard from "../perfumeCard/perfumeCard";
import "./BuyingRecommendationsBox.css";

function BuyingRecommendationsBox({
  title,
  data,
}: BuyingRecommendationsBoxProps) {
  return (
    <article className="RecommendationsBox">
      <h1>{title}</h1>
      <div className="box" id="box1">
        <h2>{data.Arr1Name}</h2>
        <div className="dataBox">
          {data.Arr1.map((p: ShortPerfume, idx: number) => {
            if (!p) return null;
            const slug = p.Perfume.toLowerCase().trim().replace(/\s+/g, "-");

            return (
              <PerfumeCard
                key={`${p.Perfume}-${idx}`}
                p={p}
                idx={idx}
                slug={slug}
              />
            );
          })}
        </div>
      </div>

      <div className="box" id="box2">
        <h2>{data.Arr2Name}</h2>
        <div className="dataBox">
          {data.Arr2.map((p: ShortPerfume, idx: number) => {
            if (!p) return null;
            const slug = p.Perfume.toLowerCase().trim().replace(/\s+/g, "-");

            return (
              <PerfumeCard
                key={`${p.Perfume}-${idx}`}
                p={p}
                idx={idx}
                slug={slug}
              />
            );
          })}
        </div>
      </div>

      <div className="box" id="box3">
        <h2>{data.Arr3Name}</h2>
        <div className="dataBox">
          {data.Arr3.map((p: ShortPerfume, idx: number) => {
            if (!p) return null;
            const slug = p.Perfume.toLowerCase().trim().replace(/\s+/g, "-");

            return (
              <PerfumeCard
                key={`${p.Perfume}-${idx}`}
                p={p}
                idx={idx}
                slug={slug}
              />
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default BuyingRecommendationsBox;
