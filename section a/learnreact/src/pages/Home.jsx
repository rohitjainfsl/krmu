import { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch("https://fakestoreapi.com/products");
    const result = await response.json();
    setProducts(result);
  }

  return (
    <>
      <section id="product-wrapper">
        {products.length > 0
          ? products.map((product) => (
              <div className="product" key={product.id}>
                <div className="picture">
                  <img src={product.image} alt="" />
                </div>
                <div className="content">
                  <h3>{product.title}</h3>
                  <p>{product.price}</p>
                </div>
              </div>
            ))
          : ""}
      </section>
    </>
  );
}

export default Home;
