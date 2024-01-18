import { useCartContext } from "../../context/cartContext";
import Image from "next/image";

function CartOpener() {
  const { cartItems, setShowCart } = useCartContext();
  return (
    <>
      <div className='cartIcon relative' onClick={() => setShowCart(true)}>
        <Image
          src='/playground_assets/golf-cart-200h.png'
          alt='golf cart'
          height={35}
          width={35}
          style={{ cursor: "pointer" }}
          quality={40}
        />
        <div
          className='notify'
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {cartItems.length}
        </div>
      </div>
    </>
  );
}

export default CartOpener;
