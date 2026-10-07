import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
  const { totalItems } = useCart();

  return (
    <header>
      <h2><Link to="/">ECOMMERCE</Link></h2>
      <ul>
        <li><Link to="/categories">Categories</Link></li>
        <li>
          <Link to="/cart">
            Cart {totalItems > 0 && <span className="cart-badge">({totalItems})</span>}
          </Link>
        </li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </header>
  );
}

export default Header;