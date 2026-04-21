import Btn from "./Btn";

// Cart-knapp som återanvänder vår generella Btn-komponent
function CartBtn({onClick, count = 0 }) {
    return (
    <Btn 
    // vad som händer när man klickar (t.ex. gå till cart)
    onClick={onClick} 
    // visar ikon + antal om det finns produkter i cart
    spanText={count > 0 ? `🛒 (${count})` : `🛒`} 
    />
    );

}

export default CartBtn;