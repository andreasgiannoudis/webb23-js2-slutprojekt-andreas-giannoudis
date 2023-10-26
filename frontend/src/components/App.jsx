import "../style/main.css";
//import of all components
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { getAllProducts } from "./BackEndServices";
import ShoppingCart from "./ShoppingCart";
import Search from "./Search";
import SortProductsByPrice from "./Sort";

export default function App() {
  const [products, setProducts] = useState([]); //array with all the products
  const [isCartVisible, setCartVisibility] = useState(false); //to toggle the visibility of the cart
  const [shoppingCartList, setShoppingCartList] = useState([]); //its the array where the products in cart are stored
  const [statusPurchase, setStatusPurchase] = useState(""); // purchase status, success or failed
  const [searchWord, setSearchWord] = useState(''); //the word that is used in search component
  let tempSort; //used for setting the temporary sort value

  //add to cart function 
  //it searches if the poduct that the user added is already in the cart 
  //if it finds the same product based on the title then increases the quatity + 1
  //if not it add the product to the shoppingCartList and sets the quantity to 1
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

  //async function for fetching the products. With or without the search word
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
    {/* navbar section */}
      <Navbar
        toggleCartVisibility={toggleCartVisibility}
        shoppingCartList={shoppingCartList}
      />

      {/* shopping cart section */}
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
      {/* search section */}
      <Search setSearchWord={setSearchWord}/>
      {/* sort by section */}
      <SortProductsByPrice tempSort={tempSort} products={products} setProducts={setProducts} />
      {/* productCard section */}
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
