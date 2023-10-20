//shopping cart display
//the shopping cart is showing the products added to it
//for every product it shows the image, the title and the price of the product added
//It has also the ability to show the total price
//there are 2 buttons (betala and töm)
//betala btn is to complete the purchase and the töm to remove all the products from the cart
import "../style/shopping-cart.css";
import SuccessPurchase from "./SuccessPurchase";
import { updateInventory } from "./BackEndServices";
export default function ShoppingCart({
  shoppingCartList,
  onClose,
  setProducts,
  searchWord,
  setShoppingCartList,
  setStatusPurchase,
  statusPurchase,
  setCartVisibility,
  fetchAndSetProducts,
}) {
  const recycleBin = new URL("../img/recycle-bin.png", import.meta.url);
  const payment = new URL("../img/payment.png", import.meta.url);
  let totalPrice = 0;
  //calculate the total price of all the products added to the cart
  //and return the totalPrice
  function calcTotalPrice() {
    let tempPrice = 0;
    shoppingCartList.map((product) => {
      tempPrice = product.price;
      totalPrice += tempPrice;
    });
    return totalPrice;
  }

  //a function to handle what will happen when the customer presses the pay button
  //updates the inventory of each product that has been purchased
  //displaying the success message (only if the cart has at least 1 product in it)
  //resets the cart to 0
  //removes the success message after 3 seconds
  //and after 3.5 seconds the cart closes by setting the visibility to false
  function handleClickPay() {
    updateInventory(shoppingCartList);
    if (shoppingCartList.length > 0) {
      setStatusPurchase("success");
    }
    setShoppingCartList([]);
    setTimeout(() => {
      setStatusPurchase("");
      fetchAndSetProducts(setProducts, searchWord);
    }, 3000);
    setTimeout(() => {
      setCartVisibility(false);
    }, 3500);
  }

  //resets the shopping cart and closes the cart by setting the visibility to false
  function handleClickEmpty() {
    setShoppingCartList([]);
    setCartVisibility(false);
  }

  //removes only one item in the cart
  function handleRemoveItem(title) {
    const updatedCart = shoppingCartList.filter(
      (product) => product.title !== title
    );
    setShoppingCartList(updatedCart);
  }

  return (
    <div className="shopping-cart-side">
      <div className="shopping-cart-container">
        <button className="close-cart-btn" onClick={onClose}>
          X
        </button>
        <h2>Din varukorg</h2>
        <span>
          Du har lagt {shoppingCartList.length} produkter i kundvagnen
        </span>
        <div className="shopping-cart-products">
          {shoppingCartList.map((item) => (
            <div key={item.title} className="product-div">
              <div className="left-content">
                <img src={item.image} alt={item.title} />
                <h3>
                  {item.title} X {item.quantity}
                </h3>
                <a href="#" onClick={() => handleRemoveItem(item.title)}>
                  <img src={recycleBin} alt="remove" className="recycle-bin" />
                </a>
              </div>

              <div className="right-content">
                <span className="price">Pris: {item.price} kr per styck</span>
              </div>
            </div>
          ))}
        </div>
        <p>Totalt pris: {calcTotalPrice()} kr</p>
        <a href="#" onClick={handleClickPay}>
          <img src={payment} alt="payment" className="payment-icon" />
        </a>
        <a href="#" onClick={handleClickEmpty}>
          <img src={recycleBin} alt="remove" className="recycle-bin" />
        </a>
        {/* if the purchase status is set to success then the SuccessPurchase component displays */}
        {statusPurchase === "success" && <SuccessPurchase />}
      </div>
    </div>
  );
}
