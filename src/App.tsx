import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import CartProvider from "./context/CartContext";
import Shop from "./pages/Shop";
import DropDownProvider from "./context/DropDownContext";
import Product from "./pages/Product";

// To hold the router instance and pass it to the RouterProvider
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
      </Route>
    </Route>
  )
);
function App() {
  return (
    <>
      <CartProvider>
        <DropDownProvider>
          <RouterProvider router={router} />
        </DropDownProvider>
      </CartProvider>
    </>
  );
}

export default App;
