const Order = require('../models/Order');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const {
      products,
      customer,
      paymentScreenshotUrl,
      paymentMethod,
      total
    } = req.body;
    if (!products || !customer || !paymentScreenshotUrl || !total)
      return res.status(400).json({ error: 'Missing required fields' });

    const order = new Order({
      products,
      customer,
      paymentScreenshotUrl,
      paymentMethod,
      total
    });
    await order.save();
    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get orders (with search and filter)
exports.getOrders = async (req, res) => {
  const { status, search } = req.query;
  let query = {};
  if (status) query.orderStatus = status;
  if (search) query['customer.fullName'] = { $regex: search, $options: 'i' };
  try {
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;
  if (!orderStatus) return res.status(400).json({ error: 'Status required' });
  try {
    const order = await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};