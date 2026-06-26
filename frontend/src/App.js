import { BrowserRouter, Routes,Route,} from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Admin from "./components/admin/Admin";    
import Menu from "./pages/Menu";
import CheckoutQR from "./pages/CheckoutQR";
import About from "./pages/About";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/admin" element={<Admin />}/>
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<CheckoutQR />} />
        <Route path="/gallery" element={<Gallery />} />
        
         </Routes>
    </BrowserRouter>
  );
}

export default App; 