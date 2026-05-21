// import Home from "./pages/Home";

// function App() {
//   return <Home />;
// }

// export default App;
import { BrowserRouter, Routes,Route,} from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Admin from "./admin/Admin";    
import AddHero from "./admin/AddHero";
import Menu from "./pages/Menu";
// import Payment from "./pages/Payment"; 
// import Checkout from "./pages/Checkout"; 
import CheckoutQR from "./pages/CheckoutQR";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/admin" element={<Admin />}/>
        <Route path="/menu" element={<Menu />} />
        <Route path="/admin/heroes" element={<AddHero />} />
          {/* <Route path="/payment" element={<Payment />} />  */}
        {/* <Route path="/checkout" element={<Checkout />} /> */}
        <Route path="/checkout" element={<CheckoutQR />} />

        
         </Routes>
    </BrowserRouter>
  );
}

export default App; 