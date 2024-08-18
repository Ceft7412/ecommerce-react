import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

type Product = {
  id?: number;
  title?: string;
  image?: string;
  price?: number;
  rating?: {
    rate: number;
    count: number;
  };
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
      <div className="grid grid-cols-4 gap-16">
        {products &&
          products.map((product) => (
            <div
              className="p-3 py-6 w-80 flex flex-col gap-2 border rounded-2xl"
              key={product.id}
            >
              <div className="h-64 w-[95%] flex justify-center items-center p-6">
                <img src={product.image} alt={product.title} className="h-full w-full" />
              </div>
              <div className="h-56 text-[17px] flex flex-col justify-between">
                <div className="flex gap-4 flex-col">
                  <span className="font-medium">{product.title}</span>
                  <span className="font-medium">${product.price}</span>
                  <div className="rating flex mb-5">
                    {[...Array(5)].map((_, i) => (
                      <FaRegStar key={i} className="" />
                    ))}
                  </div>
                </div>
                <div className="">
                  <span className="font-medium rounded-full p-2 border-black border-2 hover:bg-orange-500 hover:border-orange-500 transition-colors duration-400 cursor-default hover:text-white ">
                    Add to Cart
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Products;
