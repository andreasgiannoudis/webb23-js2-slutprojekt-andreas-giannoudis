import '../style/success-purchase.css';
//a function to display a success message when the customer purchases with success
//inside a div it has a h3 and a p element
export default function SuccessPurchase(){
    return(
        <div className="success-purchase">
            <h3>Beställningen genomfört</h3>
            <p>Tack för ditt köp!</p>
        </div>
    )
}