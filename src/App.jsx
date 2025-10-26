import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/HomePage/HomePage";
import "./styles.css";
import MenuPage from "./pages/MenuPage/MenuPage";
import { Provider } from "react-redux";
import { store } from "./app/store";
import CartPage from "./pages/CartPage/CartPage";
import Map from "./pages/MapPage/Map";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/menu/:id" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/map" element={<Map />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
