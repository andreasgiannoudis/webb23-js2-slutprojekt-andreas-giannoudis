import '../style/nav.css';
//the whole navbar of the website
export default function Navbar({toggleCartVisibility, shoppingCartList, fetchAndSetProducts,setProducts, searchWord}){
    const shoppingCart = new URL('../img/shopping-cart.png', import.meta.url);
    const logo = new URL('../img/logo.png', import.meta.url);
    //shows how many products have been added to the shopping cart
    function productsAddedInCart(){
        let totalQuantity = 0;
        shoppingCartList.map((product)=>{
            totalQuantity += product.quantity || 1;
        })
        return totalQuantity;
    }
    //function for fetching the products. I use it when i click the produkter in navbar
    function handleFetchProducts() {
        fetchAndSetProducts(setProducts, searchWord);
    }
    return(
        <nav className="nav">
           <a href="#"><img src={logo} alt="logo" className="logo"/></a>
           <ul>
            <li>
                <a href="#" onClick={handleFetchProducts}>Produkter</a>
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