import { useCart } from "../context/CartContext";

function AddToCartBtn({ product }) {
  const { addToCart } = useCart();

  return (
    <button className="addToCart" onClick={() => addToCart(product)}>
      Add To Cart
    </button>
  );
}

export default AddToCartBtn;

