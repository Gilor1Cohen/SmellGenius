import { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import axios from "axios";

import type {
  PerfumeInformationRes,
  PerfumeInformationResData,
} from "../../../types/Perfumes.types";
import type { likeRes } from "../../../types/Auth.types";

import { UserContext } from "../../../contexts/UserContext";

import PerfumeInformation from "../../ui/PerfumeInformation/PerfumeInformation";

import "./PerfumeInformationPage.css";

export default function PerfumeInformationPage() {
  const [data, setData] = useState<PerfumeInformationResData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [like, setLike] = useState<boolean>(false);
  const [likeLoading, setLikeLoading] = useState<boolean>(false);

  const { setUser, setAuth } = useContext(UserContext);

  const { pathname } = useLocation();
  const [, , slug] = pathname.split("/");
  const title: string = slug.split("-").join(" ");

  useEffect(() => {
    async function GetData(): Promise<void> {
      setLoading(true);
      setData(null);
      setError(null);
      try {
        const res = await axios.get<PerfumeInformationRes>(
          "http://localhost:5174/Perfumes/GetPerfumeData",
          {
            params: { perfumeName: title },
            withCredentials: true,
          }
        );

        setData(res.data.data);
        setLike(res.data.data.Like);
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          if ([404, 400, 500].includes(status))
            setError(error.response?.data?.message || "Error getting data");
          if ([401, 403].includes(status)) {
            setAuth(false);
            setUser(null);
            return;
          }
        }

        setError(error.response?.data?.message || "Error getting data");
      } finally {
        setLoading(false);
      }
    }

    GetData();
  }, [pathname]);

  async function onLike(perfumeName: string): Promise<void> {
    setLikeLoading(true);

    try {
      const like = await axios.post<likeRes>(
        "http://localhost:5174/Auth/LikePerfume",
        { perfumeName: perfumeName, isLiked: data?.Like },
        { withCredentials: true }
      );

      if (like.status === 200) {
        setLike((prev) => !prev);

        setAuth(true);

        setUser({
          _id: like.data.data.data._id,
          Name: like.data.data.data.Name,
          YearOfBirth: like.data.data.data.YearOfBirth,
          FavoritePerfumes: like.data.data.data.FavoritePerfumes,
          Gender: like.data.data.data.Gender,
          Email: like.data.data.data.Email,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if ([401, 403].includes(status)) {
          setAuth(false);
          setUser(null);
          return;
        }
      }
    } finally {
      setLikeLoading(false);
    }
  }

  return (
    <section id="PerfumeInformationPage">
      {loading && <p className="status">Loading...</p>}

      {error && <p className="status error">{error}</p>}

      {data && (
        <PerfumeInformation
          data={data}
          like={like}
          onLike={onLike}
          loading={likeLoading}
        />
      )}
    </section>
  );
}
