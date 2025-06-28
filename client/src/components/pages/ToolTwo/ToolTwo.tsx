import { useCallback, useContext, useEffect, useState } from "react";

import axios from "axios";

import { situations } from "../../../data/moment";

import SituationCard from "../../ui/situationCard/situationCard";

import { UserContext } from "../../../contexts/UserContext";

import type {
  PerfumeFormRes,
  ShortPerfume,
} from "../../../types/Perfumes.types";
import PerfumeCard from "../../ui/perfumeCard/perfumeCard";

import "./ToolTwo.css";

export default function ToolTwo() {
  const [situation, setSituation] = useState<string | null>(null);

  const [data, setData] = useState<ShortPerfume[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { setUser, setAuth } = useContext(UserContext);

  const handleClick = useCallback(
    (s: string) => () => {
      setSituation(s);
    },
    []
  );

  useEffect(() => {
    if (!situation) return;

    async function getData() {
      setLoading(true);
      try {
        const res = await axios.get<PerfumeFormRes>(
          "http://localhost:5174/Perfumes/GetBySituation",
          {
            params: {
              situationName: situation,
            },
            withCredentials: true,
          }
        );

        setData(res.data.data);
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

    getData();
  }, [situation]);

  return (
    <section id="ToolTwo">
      {situation ? (
        <div id="SituationData">
          {loading ? (
            <p>Loading</p>
          ) : (
            <>
              {data &&
                data.map((p: ShortPerfume, idx: number) => {
                  if (!p) return null;
                  const slug = p.Perfume.toLowerCase()
                    .trim()
                    .replace(/\s+/g, "-");

                  return (
                    <PerfumeCard
                      key={`${p.Perfume}-${idx}`}
                      p={p}
                      idx={idx}
                      slug={slug}
                    />
                  );
                })}

              {error && <p id="Error">{error}</p>}
            </>
          )}
        </div>
      ) : (
        <div id="SituationBox">
          {situations.map((s: string, idx: number) => (
            <SituationCard
              text={s}
              key={`${s}-${idx}`}
              onClick={handleClick(s)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
