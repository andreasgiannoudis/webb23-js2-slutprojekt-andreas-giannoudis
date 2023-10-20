//displaying the products as cards.
//i will explain soon how the data will be displayed
import "../style/product-card.css";
import { useState } from "react";
export default function ProductCard({
  title,
  image,
  price,
  description,
  inventory,
  addToCart,
}) {
  const [isHovered, setIsHovered] = useState(false);
  function handleClickAddToCart() {
    inventory > 0 ? addToCart(title, image, price) : "";
  }
  return (
    <>
      <div
        className="product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2>{title}</h2>
        <img src={image} alt={title} />
        <p>Pris: {price}kr</p>
        <p>
          {inventory === 0
            ? "Slutsåld :( "
            : `${inventory} i lager för leverans`}
        </p>
        {isHovered && <p className="product-description">{description}</p>}
        <button
          onClick={handleClickAddToCart}
          className={`add-to-cat-btn ${inventory === 0 ? "disabled" : ""}`}
        >
          Lägg i varukorg
        </button>
      </div>
    </>
  );
}
