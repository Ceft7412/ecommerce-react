import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

type Product = {
  id?: number;
  title?: string;
  image?: string;
  price?: number;
  rating?: {
    rate?: number;
    count?: number;
  };
};
function Products() {
  const [products, setProducts] = useState<Product[] | null>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products?limit=7");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="h-[100%] py-6 px-5 sm:px-16 min-w-80">
      <h1 className="font-bold text-[24px] mb-10">Products You Might Like</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-16">
        {products &&
          products.map((product) => (
            <div
              className="p-3 py-6 w-[100%] sm:w-60 md:w-72 lg:w-72 xl:w-80 flex flex-col gap-2 border rounded-2xl"
              key={product.id}
            >
              <Link to={`/product/${product.id}`}>
                <div className="h-64 w-[95%] flex justify-center items-center p-6">
                  <img
                    src={product.image}
                    alt={product.title}
                    title={product.title}
                    className="h-full w-full hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="h-56 text-[17px] flex flex-col justify-between">
                <div className="flex gap-4 flex-col">
                  <span className="font-medium">{product.title}</span>
                  <span className="font-medium">${product.price}</span>
                  <div className="rating flex mb-5">
                    {[...Array(5)].map((_, i) =>
                      product.rating && product.rating.rate && i < product.rating.rate ? (
                        <FaStar key={i} />
                      ) : (
                        <FaRegStar key={i} />
                      )
                    )}
                  </div>
                </div>
                <div>
                  <AddToCart productId={product.id} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Products;
