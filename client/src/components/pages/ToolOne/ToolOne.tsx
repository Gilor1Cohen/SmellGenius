import { useContext, useEffect, useState } from "react";
import type {
  BuyingRecommendationsData,
  BuyingRecommendationsDataRes,
  ShortPerfume,
  SmellsGroup,
} from "../../../types/Perfumes.types";
import BuyingRecommendationsBox from "../../ui/BuyingRecommendationsBox/BuyingRecommendationsBox";
import { UserContext } from "../../../contexts/UserContext";

import axios from "axios";

import "./ToolOne.css";
import PerfumeCard from "../../ui/perfumeCard/perfumeCard";

export default function ToolOne() {
  const { setUser, setAuth } = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [byBrand, setByBrand] = useState<BuyingRecommendationsData | null>(
    null
  );

  const [byCountry, setByCountry] = useState<BuyingRecommendationsData | null>(
    null
  );

  const [bySmells, setBySmells] = useState<SmellsGroup | null>(null);

  useEffect(() => {
    async function GetData(): Promise<void> {
      setLoading(true);
      try {
        const data = await axios.get<BuyingRecommendationsDataRes>(
          "http://localhost:5174/Perfumes/GetBuyingRecommendations",
          { withCredentials: true }
        );

        const [brand, country, smells] = data.data.data;

        setByBrand(brand as BuyingRecommendationsData);
        setByCountry(country as BuyingRecommendationsData);
        setBySmells(smells as SmellsGroup);
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          if ([404, 400, 500].includes(status))
            setError(
              error.response?.data?.message || "Error searching perfumes"
            );
          if ([401, 403].includes(status)) {
            setAuth(false);
            setUser(null);
            return;
          }
        }
        setError(error.response?.data?.message || "Error searching perfumes");
      } finally {
        setLoading(false);
      }
    }

    GetData();
  }, []);

  if (loading)
    return (
      <section id="ToolOne">
        <p>Loading</p>
      </section>
    );

  if (error)
    return (
      <section id="ToolOne">
        <p>No data found.</p>
      </section>
    );

  return (
    <section id="ToolOne">
      <h1>Personalized buying recommendations</h1>

      {bySmells && (
        <article className="bySmellsBox">
          <h1>Recommendations by the smells you like</h1>
          <div className="bySmellsBoxData">
            {bySmells.smellsData.map((p: ShortPerfume, idx: number) => {
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
        </article>
      )}

      {byBrand && (
        <BuyingRecommendationsBox
          title="Recommendations by the brands you like"
          data={byBrand}
        />
      )}

      {byCountry && (
        <BuyingRecommendationsBox
          title="Recommendations by countries"
          data={byCountry}
        />
      )}
    </section>
  );
}
