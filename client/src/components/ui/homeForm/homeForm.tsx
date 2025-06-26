import { useContext, useState } from "react";
import axios from "axios";

import FormInput from "../../ui/input/input";
import GoldBtn from "../../ui/goldBtn/goldBtn";

import { useForm } from "react-hook-form";

import type {
  Perfume,
  PerfumeForm,
  PerfumeFormRes,
} from "../../../types/Perfumes.types";

import "./homeForm.css";
import PerfumeHomeItem from "../PerfumeHomeItem/PerfumeHomeItem";
import { UserContext } from "../../../contexts/UserContext";

export default function HomeForm() {
  const [data, setData] = useState<Perfume[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { setUser, setAuth } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PerfumeForm>({ mode: "all" });

  async function fetchPerfumes(data: PerfumeForm) {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<PerfumeFormRes>(
        "http://localhost:5174/Perfumes/SearchByName",
        {
          params: {
            perfumeName: data.PerfumeName,
            limit: 10,
            skip: (page - 1) * 10,
          },
          withCredentials: true,
        }
      );

      page === 1
        ? setData(res.data.data)
        : setData((prev) =>
            prev ? [...prev, ...res.data.data] : res.data.data
          );

      setHasMore(res.data.data.length === 10);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if ([404, 400, 500].includes(status))
          setError(error.response?.data?.message || "Error searching perfumes");
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

  async function onSearch(form: PerfumeForm) {
    setError(null);
    setPage(1);
    setData(null);
    setSearchTerm(form.PerfumeName);

    await fetchPerfumes({ PerfumeName: form.PerfumeName });
  }

  async function loadMore() {
    const next = page + 1;
    setPage(next);
    await fetchPerfumes({ PerfumeName: searchTerm });
  }

  return (
    <div id="search">
      <p>Perfumes search & discovery</p>
      <form onSubmit={handleSubmit(onSearch)}>
        <FormInput
          name="PerfumeName"
          type="text"
          register={register}
          placeholder="Discover your next scent"
          validation={{ required: " " }}
          error={errors.PerfumeName}
        />
        <GoldBtn
          text={loading ? "Searching..." : "Search"}
          type="submit"
          isDisabled={!isValid || loading}
        />
      </form>
      {loading && <p>Loading</p>}
      {error && <p className="error">{error}</p>}
      {data !== null && data.length === 0 && <p>No data found.</p>}

      {data !== null && data.length > 0 && (
        <div id="formHomeData">
          <ul id="perfumesBox">
            {data.map((perfume: Perfume) => (
              <PerfumeHomeItem
                key={`${perfume.Perfume}-${perfume.Year}`}
                Perfume={perfume.Perfume}
                Year={+perfume.Year}
                Brand={perfume.Brand}
                Country={perfume.Country}
              />
            ))}
          </ul>

          {hasMore && !loading && (
            <GoldBtn text="Load More" type="button" onClick={loadMore} />
          )}
        </div>
      )}
    </div>
  );
}
