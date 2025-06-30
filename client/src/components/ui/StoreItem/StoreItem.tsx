import type { StoreItem } from "../../../types/Store.types";
import GoldBtn from "../goldBtn/goldBtn";
import "./StoreItem.css";

export default function StoreItemCard({ item }: { item: StoreItem }) {
  return (
    <div className="store-card">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="store-card-link"
      >
        <div className="store-card-body">
          <h2 className="store-card-title">{item.perfumeName}</h2>
          <div className="store-card-gender">{item.gender}</div>
          <div className="store-card-price">
            <span className="after-discount">${item.priceAfterDiscount}</span>
            <span className="before-discount">${item.priceBeforeDiscount}</span>
          </div>
          <GoldBtn text="Buy Now" type="button" />
        </div>
      </a>
    </div>
  );
}
