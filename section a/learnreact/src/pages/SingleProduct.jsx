import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddToCartBtn from "../components/AddToCartBtn";

function SingleProduct() {
  const [product, setProduct] = useState({});
  let { id } = useParams();

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  async function fetchProduct() {
    const response = await fetch("https://ecommerce-api-8ga2.onrender.com/api/product/" + id);
    const result = await response.json();
    setProduct(result);
  }

  const productTitle = product.name || product.title || "";
  const productImage = product.url || product.image || "";

  return (
    <>
      {Object.keys(product).length > 0 ? (
        <div className="singleProduct">
          <div className="left">
            <img src={productImage} alt={productTitle} />
          </div>
          <div className="right">
            <h2>{productTitle}</h2>
            {product.brand && (
              <p className="brand">
                Brand: <strong>{product.brand}</strong>
              </p>
            )}
            <p className="category">
              Category:{" "}
              <strong>
                <em>{product.category}</em>
              </strong>
            </p>
            {product.totalRating && (
              <p className="rating">Rating: ⭐ {product.totalRating} / 5</p>
            )}
            <h4 className="price">$ {product.price}</h4>
            <p className="description">{product.description}</p>
            <AddToCartBtn product={product} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default SingleProduct;
