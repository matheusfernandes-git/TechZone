import DefaultPage from "components/DefaultPage";
import Advertise from "pages/Advertise";
import Cart from "pages/Cart";
import Categories from "pages/Categories";
import Home from "pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultPage />}>
          <Route index element={<Home />} />
          <Route path="/categoria/:categoryName" element={<Categories />} />
          <Route path="carrinho" element={<Cart />} />
          <Route path="anuncie/:categoryName" element={<Advertise />} />
          <Route path="anuncie" element={<Advertise />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
