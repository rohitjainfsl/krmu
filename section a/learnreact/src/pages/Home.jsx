import { useEffect, useState } from "react";
import AddToCartBtn from "../components/AddToCartBtn";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch("https://ecommerce-api-8ga2.onrender.com/api/product");
    const result = await response.json();
    setProducts(result);
  }

  function trimContent(input, maxLength) {
    if (!input) return "";
    const arr = input.split(" ");
    return arr.length > maxLength
      ? arr.slice(0, maxLength).join(" ") + "..."
      : input;
  }

  return (
    <>
      <section id="product-wrapper">
        {products.length > 0
          ? products.map((product) => {
              const productId = product._id || product.id;
              const productTitle = product.name || product.title || "";
              const productImage = product.url || product.image || "";
              return (
                <div className="product" key={productId}>
                  <div className="picture">
                    <Link to={`/product/${productId}`}>
                      <img src={productImage} alt={productTitle} />
                    </Link>
                  </div>
                  <div className="content">
                    <h3>{trimContent(productTitle, 7)}</h3>
                    <p>${product.price}</p>
                    <AddToCartBtn product={product} />
                  </div>
                </div>
              );
            })
          : ""}
      </section>
    </>
  );
}

export default Home;
