import { useParams } from "react-router-dom";
function Product() {
  const { id } = useParams();
  return <div>The id: {id}</div>;
}

export default Product;
