import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

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
function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);

  // Request the product data from the API
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // Fetch the product when the component mounts
    fetchProduct();
  }, []);
  return (
    <section className="min-h-screen pt-[80px] px-20">
      The id: {id} {product?.title}
    </section>
  );
}

export default Product;
