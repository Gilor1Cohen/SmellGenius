import { useContext, useEffect, useState } from "react";
import GoldBtn from "../../ui/goldBtn/goldBtn";
import { filters } from "../../../data/filters";
import axios from "axios";
import { UserContext } from "../../../contexts/UserContext";

import "./Shop.css";
import type { StoreItem, StoreRes } from "../../../types/Store.types";
import StoreItemCard from "../../ui/StoreItem/StoreItem";
import { useForm } from "react-hook-form";
import Input from "../../ui/input/input";

export default function Shop() {
  const [data, setData] = useState<StoreItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<string>("All");

  const [pages, setPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const { setUser, setAuth } = useContext(UserContext);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<{ PriceLimit: string }>({ mode: "all" });

  const priceLimit = watch("PriceLimit");

  useEffect(() => {
    async function getItems(): Promise<void> {
      if (+priceLimit > 900 || +priceLimit < 200) return;

      setLoading(true);
      setData(null);
      setError(null);
      setPage(1);

      try {
        const res = await axios.get<StoreRes>(
          "http://localhost:5174/Store/GetStoreItems",
          {
            params: { filter, page, priceLimit: priceLimit ? priceLimit : 900 },
            withCredentials: true,
          }
        );

        setPages(res.data.data.pages);
        setData(res.data.data.items);
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

    getItems();
  }, [filter, page, priceLimit]);

  return (
    <section id="Shop">
      <h1>Shop</h1>
      <article className="filters">
        <div id="btns">
          {filters.map((f: string) => (
            <GoldBtn
              key={f}
              text={f}
              type="button"
              onClick={() => setFilter(f)}
              isDisabled={loading || filter == f}
            />
          ))}
        </div>

        <div className="PriceLimit">
          <label htmlFor="PriceLimit">Price limit:</label>
          <Input
            name={"PriceLimit"}
            register={register}
            validation={{
              required: "Price Limit is required",
              max: { value: 900, message: "Max price is 900" },
              min: { value: 200, message: "Min price is 200" },
            }}
            type="number"
            defaultValue="900"
            error={errors.PriceLimit}
          />
        </div>
      </article>

      <article id="dataArea">
        <div className="dataBox">
          {loading && <p>Loading data</p>}

          {error && <p>{error}</p>}

          {data &&
            data.map((item: StoreItem, idx: number) => {
              return (
                <StoreItemCard key={`${item.perfumeName}-${idx}`} item={item} />
              );
            })}
        </div>

        <div className="dataPages">
          <GoldBtn
            text="Pref"
            type="button"
            onClick={() => {
              setPage((prev: number) => prev - 1);
            }}
            isDisabled={loading || page === 1}
          />
          {page >= 3 ? (
            <>
              {page !== 1 && (
                <p
                  className={`pagesNums ${page === page - 1 ? "active" : ""}`}
                  onClick={() => setPage(page - 1)}
                >
                  {page - 1}
                </p>
              )}
              <p className={`pagesNums ${page === page ? "active" : ""}`}>
                {page}
              </p>
              {page !== pages && (
                <p
                  className={`pagesNums ${page === page + 1 ? "active" : ""}`}
                  onClick={() => setPage(page + 1)}
                >
                  {page + 1}
                </p>
              )}
            </>
          ) : (
            <>
              {Array.from({ length: pages }, (_, i) => i + 1)
                .filter((pageNum) => Math.abs(pageNum - page) <= 1)
                .map((pageNum) => (
                  <p
                    className={`pagesNums ${pageNum === page ? "active" : ""}`}
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </p>
                ))}
            </>
          )}

          <GoldBtn
            text="Next"
            type="button"
            onClick={() => {
              setPage((prev: number) => prev + 1);
            }}
            isDisabled={loading || page === pages}
          />
        </div>
      </article>
    </section>
  );
}
