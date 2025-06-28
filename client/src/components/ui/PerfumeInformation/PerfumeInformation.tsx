import type { ShortPerfume } from "../../../types/Perfumes.types";
import GoldBtn from "../goldBtn/goldBtn";
import type { PerfumeInformationProps } from "../../../types/UI.types";
import PerfumeCard from "../perfumeCard/perfumeCard";

import "./PerfumeInformation.css";

export default function PerfumeInformation({
  data,
  like,
  loading,
  onLike,
}: PerfumeInformationProps) {
  return (
    <article id="dataBox">
      <div className="perfume-data-item">
        <header className="perfume-header">
          <h2 className="perfume-title">{data.PerfumeData[0].Perfume}</h2>
          <p className="perfume-year">
            {data.PerfumeData[0].Year || "Year unknown"}
          </p>

          <GoldBtn
            onClick={() => onLike(data.PerfumeData[0].Perfume)}
            text={loading ? "Loading" : like ? "UnLike" : "Like"}
            isDisabled={loading}
            type="button"
          />
        </header>

        <dl className="perfume-meta">
          <div>
            <dt>Brand</dt>
            <dd>{data.PerfumeData[0].Brand}</dd>
          </div>
          <div>
            <dt>Country</dt>
            <dd>{data.PerfumeData[0].Country}</dd>
          </div>
          <div>
            <dt>Gender</dt>
            <dd>{data.PerfumeData[0].Gender}</dd>
          </div>
        </dl>

        <section className="perfume-notes">
          <div className="notes-group">
            <h3>Top Notes</h3>
            <p>{data.PerfumeData[0].Top}</p>
          </div>
          <div className="notes-group">
            <h3>Middle Notes</h3>
            <p>{data.PerfumeData[0].Middle}</p>
          </div>
          <div className="notes-group">
            <h3>Base Notes</h3>
            <p>{data.PerfumeData[0].Base}</p>
          </div>
        </section>

        <div className="perfumer">
          <h3>Perfumer</h3>
          <p>
            {data.PerfumeData[0].Perfumer1}
            {data.PerfumeData[0].Perfumer2 &&
              ` & ${data.PerfumeData[0].Perfumer2}`}
          </p>
        </div>

        <ul className="main-accords">
          {[
            data.PerfumeData[0].mainaccord1,
            data.PerfumeData[0].mainaccord2,
            data.PerfumeData[0].mainaccord3,
            data.PerfumeData[0].mainaccord4,
            data.PerfumeData[0].mainaccord5,
          ].map((accord, idx: number) => (
            <li key={`${idx}-${accord}-${idx}`}>{accord}</li>
          ))}
        </ul>
      </div>

      <div className="same-brand-section">
        <h3 className="same-brand-title">
          Other {data.PerfumeData[0].Brand} Fragrances
        </h3>
        <div className="same-brand-list">
          {data.SameBrand.map((p: ShortPerfume, idx: number) => {
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

      <div className="similar-perfumes-section">
        <h3 className="similar-perfumes-title">Similar Perfumes</h3>
        <div className="similar-perfumes-list">
          {data.SimilarPerfumes.map((p: ShortPerfume, idx: number) => {
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
