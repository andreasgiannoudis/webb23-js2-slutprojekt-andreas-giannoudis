//displaying the products as cards.
//for every product it shows the name, image, price, description(while hovering) and invetory
//if the inventory is 0 then the Lägg i varukorg button is disabled and cant be clicked
//otherwise the button works good and the user can add the product to the cart
import "../style/product-card.css";
import { useState } from "react";
export default function ProductCard({
  title,
  image,
  price,
  description,
  inventory,
  addToCart,
  shoppingCartList,
  setShoppingCartList,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [currentInventory, setCurrentInventory] = useState(inventory);


  //handles the add to cart
  function handleClickAddToCart() {
    if (currentInventory > 0) {
      const existingProductInCart = shoppingCartList.find(
        (product) => product.title === title
      );
      const totalQuantityInCart = existingProductInCart
        ? existingProductInCart.quantity
        : 0;

      if (totalQuantityInCart < currentInventory) {
        setShoppingCartList((prevCart) => {
          if (existingProductInCart) {
            return prevCart.map((product) =>
              product.title === title
                ? {
                    ...product,
                    quantity: product.quantity + 1,
                  }
                : product
            );
          } else {
            return [...prevCart, { title, image, price, quantity: 1 }];
          }
        });

        setIsAdded(true);
        setTimeout(() => {
          setIsAdded(false);
        }, 1500);
      }
    }
  }

  return (
    <>
      <div
        className={`product-card ${isHovered ? "show-description" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2>{title}</h2>
        <img src={image} alt={title} />
        <p>Pris: {price}kr</p>
        <p>
          {/* if the invemtory is 0 then it will show "slutsåld" otherwise it will show the number of items in the inventory */}
          {inventory === 0
            ? "Slutsåld :( "
            : `${inventory} i lager för leverans`}
        </p>
        {isHovered && <p className="product-description">{description}</p>}
        <button
          onClick={handleClickAddToCart}
          className={`add-to-cart-btn ${inventory === 0 ? "disabled" : ""} ${
            isAdded ? "added" : ""
          }`}
        >
          {isAdded ? "Tillagd i varukorg" : "Lägg i varukorg"}
        </button>
      </div>
    </>
  );
}
