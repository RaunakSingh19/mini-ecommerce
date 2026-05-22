import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    // ... add other fields
  });

  const products = state?.products || []; // From Buy Now or Cart

  // Calculate total
  const subtotal = products.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  // Simple customer form example
  const handleChange = e => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = () => {
    // Validate, then navigate to /payment with order + customer
    navigate('/payment', {
      state: {
        products,
        customer,
        subtotal
      }
    });
  };

  return (
    <div className="checkout-page">
      <h2>Order Summary</h2>
      <ul>
        {products.map((p, idx) => (
          <li key={idx}>
            <img src={p.images?.[0]} alt={p.title} width={60} />
            {p.title} x{p.quantity} — ₹{p.price}
          </li>
        ))}
      </ul>
      <p><b>Subtotal:</b> ₹{subtotal}</p>
      <div>
        <h3>Customer Details</h3>
        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        {/* ...more fields */}
      </div>
      <button onClick={handleProceedToPayment}>Proceed to Payment</button>
    </div>
  );
};

export default Checkout;