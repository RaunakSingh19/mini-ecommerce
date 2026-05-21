export function buildWhatsAppOrderMessage(order) {
  let msg = `*Order Details*\nName: ${order.customer.fullName}\nPhone: ${order.customer.phone}\nAddress: ${order.customer.address}, ${order.customer.city}, ${order.customer.pincode}\n`;
  msg += `\n*Items:*\n`;
  order.products.forEach(item => {
    msg += `- ${item.name} (${item.size || ''} ${item.color || ''}) x${item.quantity}\n`;
  });
  msg += `\nTotal: ₹${order.total}`;
  msg += `\nPayment: ${order.paymentStatus}`;
  msg += `\nScreenshot: ${order.paymentScreenshotUrl}`;
  return encodeURIComponent(msg);
}