import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import UploadScreenshot from "../components/UploadScreenshot";
import { buildWhatsAppOrderMessage } from "../utils/whatsappBuilder";
import "./CheckoutQR.css";
import qrImage from "../assets/qr.jpeg";

export default function CheckoutQR() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Product is passed in state from ProductDetails
  const productLine = state?.products?.[0];
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [screenshot, setScreenshot] = useState(null);

  if (!productLine) return <div>Product missing from state. Please try again.</div>;
  const amount = productLine.variants?.length ? productLine.variants[0].price : productLine.price;

  // WhatsApp order message
  const orderMsg = buildWhatsAppOrderMessage({
    customer: {
      fullName: customer.name,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      pincode: customer.pincode,
    },
    products: [
      {
        name: productLine.title,
        size: productLine.selectedSize || "",
        color: productLine.selectedColor || "",
        quantity: productLine.quantity,
      }
    ],
    total: amount,
    paymentStatus: screenshot ? "Uploaded" : "Pending",
    paymentScreenshotUrl: screenshot,
  });
  // const waURL = `https://wa.me/${process.env.REACT_APP_VENDOR_NUM}?text=${orderMsg}`;

  const waURL = `https://wa.me/${
  process.env.REACT_APP_VENDOR_NUM
}?text=${encodeURIComponent(orderMsg)}`;


  const handleCustChange = e => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  return (
    <div className="checkout-qr">
      <h2>Pay & Place Your Order</h2>
      <div className="pay-summary">
        <div className="pay-product">
          <img src={productLine.images?.[0]} alt={productLine.title} style={{width: 100, borderRadius: 12}}/>
          <div>
            <div style={{fontSize: 24, fontWeight: 600}}>{productLine.title}</div>
            <div>{productLine.selectedSize && `Size: ${productLine.selectedSize}`} {productLine.selectedColor && `Color: ${productLine.selectedColor}`}</div>
          </div>
        </div>
        <div className="pay-amount">
          <span>Amount to Pay:</span>
          <div style={{fontSize: "2.4rem", color: "#dc2626", fontWeight: "bold"}}>
            ₹{amount}
          </div>
        </div>
      </div>
      {/* Static QR */}
      <div style={{margin: "48px 0 16px 0", textAlign:"center"}}><b>Scan QR and Pay</b></div>
      <img src={qrImage}   alt="QR to pay" style={{width: 220, margin: "0 auto", display: "block", borderRadius: 12}}/>
      {/* Screenshot Upload */} 
      <div style={{marginTop:24, marginBottom:0}}>
        <UploadScreenshot onUploaded={url => setScreenshot(url)}/>
      </div>
      <div style={{fontSize: 18, marginTop: 24, marginBottom:12, fontWeight: 600}}>Customer Details</div>
      <div style={{display: "flex", flexDirection: "column", gap: 10, maxWidth: 360}}>
        <input name="name" placeholder="Full Name" value={customer.name} onChange={handleCustChange} required />
        <input name="phone" placeholder="Phone" value={customer.phone} onChange={handleCustChange} required />
        <input name="address" placeholder="Address" value={customer.address} onChange={handleCustChange} required />
        <input name="city" placeholder="City" value={customer.city} onChange={handleCustChange} />
        <input name="pincode" placeholder="Pincode" value={customer.pincode} onChange={handleCustChange} />
      </div>
      <div style={{marginTop: 30}}>
        <a href={waURL} target="_blank" rel="noopener noreferrer">
          <button
            className="wa-order-btn"
            style={{
              fontWeight:600,
              fontSize:"1.22rem",
              margin: "12px auto",
              padding: "13px 38px",
              display: "block",
              background: "#25D366",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
            disabled={!screenshot || !customer.name || !customer.phone}
          >
            Send Order on WhatsApp
          </button>
        </a>
      </div>
      <div style={{fontSize: 13, marginTop: 13, color:"#666"}}>
        Vendor will confirm your order after verifying payment.
      </div>
    </div>
  )
}