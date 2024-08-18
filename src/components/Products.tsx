import React, { useState, useEffect } from "react";
import axios from "axios";
type Product = {
  id?: number;
  title?: string;
  image?: string;
};
function Products() {
  const [products, setProducts] = useState<Product[] | null>([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section className="h-[100%] py-6 px-16 ">
      <h1 className="font-bold text-[24px] mb-10">Products You Might Like</h1>
      <div className="grid grid-cols-6 gap-16">
        {products &&
          products.map((product) => (
            <div
              className="w-56 flex flex-col gap-2 shadow-md rounded-xl"
              key={product.id}
            >
              <div className="h-60 w-fullflex justify-center items-center p-6">
                <img src={product.image} alt={product.title} className="h-full w-full" />
              </div>
              <span className="p-2">{product.title}</span>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Products;
