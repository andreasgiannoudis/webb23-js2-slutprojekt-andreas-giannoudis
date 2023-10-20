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
  setShoppingCartList,
  setStatusPurchase,
  statusPurchase,
  setCartVisibility,
}) {
  const recycleBin = new URL("../img/recycle-bin.png", import.meta.url);
  const payment = new URL("../img/payment.png", import.meta.url);
  let totalPrice = 0;
  function calcTotalPrice() {
    let tempPrice = 0;
    shoppingCartList.map((product) => {
      tempPrice = product.price;
      totalPrice += tempPrice;
    });
    return totalPrice;
  }

  function handleClickPay() {
    updateInventory(shoppingCartList);
    if(shoppingCartList.length>0){
      setStatusPurchase('success');
    } 
    setShoppingCartList([]);
    setTimeout(() => {
      setStatusPurchase("");
    }, 3000);
  }

  function handleClickEmpty() {
    setShoppingCartList([]);
    setCartVisibility(false);
  }

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
        {statusPurchase === 'success' && <SuccessPurchase />}
      </div>
    </div>
  );
}
