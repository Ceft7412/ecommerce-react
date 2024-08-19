import React, { useEffect, useState, useContext } from "react";
import { DropDownContext } from "../context/DropDownContext";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";

type ProductType = {
  id?: number;
  title?: string;
  image?: string;
  price?: number;
  rating?: {
    rate?: number;
    count?: number;
  };
};
function ShopProducts() {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const { isDropDownOpen, toggleDropDown } = useContext(DropDownContext);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortType, setSortType] = useState<string>("");

  const sortProducts = (type: string) => {
    if (products) {
      const sortedProducts = [...products];
      if (type === "price") {
        sortedProducts.sort((a, b) => ((a.price || 0) > (b.price || 0) ? 1 : -1));
      } else if (type === "rating") {
        sortedProducts.sort((a, b) =>
          (a.rating?.rate || 0) > (b.rating?.rate || 0) ? -1 : 1
        );
      }
      setProducts(sortedProducts);
    }
  };

  const fetchProducts = async (category: string | null) => {
    try {
      if (category) {
        const response = await axios.get(
          `https://fakestoreapi.com/products/category/${category}`
        );
        setProducts(response.data);
        return;
      } else {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProducts(null);
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products/categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleClickCategory = (category: string) => {
    setActiveCategory(category);
    fetchProducts(category);
  };

  const handleClearCategory = () => {
    setActiveCategory(null);
    fetchProducts(null);
  };

  const handleSortClick = (type: string) => {
    if (type === "price") {
      sortProducts("price");
      setSortType("price");
    } else if (type === "rating") {
      sortProducts("rating");
      setSortType("rating");
    }
    toggleDropDown();
  };
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleDropDown();
  };

  if (loading) {
    return <section className="min-h-screen pt-[80px] px-20"></section>;
  }

  return (
    <section className="min-h-screen pt-[80px] px-20">
      <h1 className="p-4 pt-16 text-[25px] border-b">Shop</h1>
      {/* Filters */}
      <div className="p-2 pt-10 flex justify-between items-center">
        <span>Showing {products?.length} results</span>
        <div
          onClick={handleToggle}
          className="relative flex items-center gap-4 mt-4 justify-betweentext-[17px]"
        >
          <span>Sort by {sortType && sortType}</span>
          <IoChevronDown
            className={` transition-transform duration-400 ${
              isDropDownOpen ? "rotate-180" : ""
            }`}
          />
          {isDropDownOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 right-0 top-7 shadow flex flex-col bg-white border rounded"
            >
              <span
                onClick={() => handleSortClick("price")}
                className="cursor-pointer hover:text-orange-500 p-2"
              >
                Price
              </span>
              <span
                onClick={() => handleSortClick("rating")}
                className="cursor-pointer hover:text-orange-500 p-2"
              >
                Rating
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-5 flex gap-2 items-center">
        {categories &&
          categories.map((category) => (
            <span
              key={category}
              onClick={() => handleClickCategory(category)}
              className={`p-2 px-4 border rounded-full cursor-pointer ${
                category === activeCategory ? "bg-orange-500 text-white" : ""
              } hover:bg-orange-500 hover:text-white transition-colors duration-400`}
            >
              {category}
            </span>
          ))}
        {activeCategory && activeCategory.length > 0 && (
          <IoIosCloseCircleOutline
            className="text-[20px] text-neutral-500 ml-5 cursor-pointer"
            onClick={handleClearCategory}
          />
        )}
      </div>
      {/* Products */}
      <div className="grid grid-cols-4 gap-16    mt-10">
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

export default ShopProducts;
