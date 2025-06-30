import { useContext, useEffect, useState } from "react";
import GoldBtn from "../../ui/goldBtn/goldBtn";
import { filters } from "../../../data/filters";
import axios from "axios";
import { UserContext } from "../../../contexts/UserContext";

import "./Shop.css";
import type { StoreItem, StoreRes } from "../../../types/Store.types";
import StoreItemCard from "../../ui/StoreItem/StoreItem";

export default function Shop() {
  const [data, setData] = useState<StoreItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<string>("All");

  const [pages, setPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const { setUser, setAuth } = useContext(UserContext);

  useEffect(() => {
    async function getItems(): Promise<void> {
      setLoading(true);

      try {
        const res = await axios.get<StoreRes>(
          "http://localhost:5174/Store/GetStoreItems",
          {
            params: { filter, page },
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
  }, [filter, page]);

  return (
    <section id="Shop">
      <h1>Shop</h1>
      <article id="btns">
        {filters.map((f: string) => (
          <GoldBtn
            key={f}
            text={f}
            type="button"
            onClick={() => setFilter(f)}
            isDisabled={loading || filter == f}
          />
        ))}
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
