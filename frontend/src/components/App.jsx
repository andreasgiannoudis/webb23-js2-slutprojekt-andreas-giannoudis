import "../style/main.css";

import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { getAllProducts } from "./BackEndServices";
import ShoppingCart from "./ShoppingCart";
import Search from "./Search";
import SortProductsByPrice from "./Sort";

export default function App() {
  const [products, setProducts] = useState([]);
  const [isCartVisible, setCartVisibility] = useState(false);
  const [shoppingCartList, setShoppingCartList] = useState([]);
  const [statusPurchase, setStatusPurchase] = useState("");
  const [searchWord, setSearchWord] = useState('');
  let tempSort; //used for setting the temporary sort value

  function addToCart(title, image, price) {
    const existingProductInCart = shoppingCartList.find(
      (product) => product.title === title
    );
    if (existingProductInCart) {
      const updatedCart = shoppingCartList.map((product) =>
        product.title === title
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      setShoppingCartList(updatedCart);
    } else {
      const updatedCart = [
        ...shoppingCartList,
        { title, image, price, quantity: 1 },
      ];
      setShoppingCartList(updatedCart);
    }
  }

  //handle the visibility of the shopping cart, in the beginning it is set to false
  //after this is called the visibility changes to true
  const toggleCartVisibility = () => {
    setCartVisibility(!isCartVisible);
  };

  //changes the visibility of the shopping cart to false
  //when the user clicks the X button in the shopping cart
  function handleClickClose() {
    setCartVisibility(false);
  }

  async function fetchAndSetProducts(setProducts, searchWord) {
    try {
      const productsData = await getAllProducts(searchWord);
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  }

  useEffect(() => {
    fetchAndSetProducts(setProducts, searchWord);
  }, [searchWord]);

  return (
    <>
      <Navbar
        toggleCartVisibility={toggleCartVisibility}
        shoppingCartList={shoppingCartList}
      />
      {isCartVisible && (
        <ShoppingCart
          onClose={handleClickClose}
          shoppingCartList={shoppingCartList}
          setShoppingCartList={setShoppingCartList}
          setStatusPurchase={setStatusPurchase}
          statusPurchase={statusPurchase}
          setCartVisibility={setCartVisibility}
          fetchAndSetProducts={fetchAndSetProducts}
          setProducts={setProducts}
          searchWord={searchWord}
        />
      )}
      <Search setSearchWord={setSearchWord}/>
      <SortProductsByPrice tempSort={tempSort} products={products} setProducts={setProducts} />
      <div className="product-container">
        {products.map((product) => (
          <ProductCard
            key={product.title}
            title={product.title}
            image={product.image}
            price={product.price}
            description={product.description}
            inventory={product.inventory}
            addToCart={addToCart}
          />
        ))}
      </div>
    </>
  );
}
