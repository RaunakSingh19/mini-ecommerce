import { buildWhatsAppOrderMessage } from '../utils/whatsappBuilder';

export default function OrderConfirm({ order }) {
  const whatsappMessage = buildWhatsAppOrderMessage(order);
  const waUrl = `https://wa.me/${process.env.REACT_APP_ADMIN_PHONE}?text=${whatsappMessage}`;
  return (
    <div>
      <h2>Order Placed!</h2>
      <a href={waUrl} target="_blank" rel="noopener noreferrer">
        <button>Send Order on WhatsApp</button>
      </a>
    </div>
  );
}