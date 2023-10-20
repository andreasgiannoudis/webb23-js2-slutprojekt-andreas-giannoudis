import '../style/nav.css';
export default function Navbar({toggleCartVisibility, shoppingCartList}){
    const shoppingCart = new URL('../img/shopping-cart.png', import.meta.url);
    const logo = new URL('../img/logo.png', import.meta.url)
    function productsAddedInCart(){
        let totalQuantity = 0;
        shoppingCartList.map((product)=>{
            totalQuantity += product.quantity || 1;
        })
        return totalQuantity;
    }
    
    return(
        <nav className="nav">
           <a href="#"><img src={logo} alt="logo" className="logo"/></a>
           <ul>
            <li>
                <a href="#">Produkter</a>
            </li>
            <li>
                <a href="#">Kontakt</a>
            </li>
            <li>
                <a href="#" onClick={toggleCartVisibility}><img src={shoppingCart} className="shopping-cart-icon" /><span className="amount-of-added-products">{productsAddedInCart()}</span></a>
            </li>
           </ul>
           
        </nav>
    )
}