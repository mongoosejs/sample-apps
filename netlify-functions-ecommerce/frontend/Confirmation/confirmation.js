const serverUrl = 'http://localhost:8888/.netlify/functions';

export default {
  data: function() {
    return {
      order: ''
    }
  },
  mounted: async function() {
    let params = new URLSearchParams(location.search);
    let sessionId = params.get('id');
    const order = await fetch(serverUrl+'/createOrder', {
      method: "POST",
      body: JSON.stringify({ cartId: localStorage.getItem('cartId'), sessionId: sessionId})
    }).then((res) => res.json());
    this.order = order.order;
  },
  template:
  `
  <h1>Thank you for shopping with us!</h1>
  <ul v-if="order">
    <h3>Order Summary</h3>
    <li>\${{order.total}}</li>
    <h4>Shipping To:</h4>
    <li>{{order.address1}}</li>
    <li>{{order.city}}</li>
    <li>{{order.state}}</li>
    <li>{{order.zip}}</li>
    <li>{{order.shipping}}</li>
    <h4>Order Details</h4>
    <li>Status: {{order.status}}</li>
    <li>Order Number: {{order.orderNumber}}</li>
    <h4>Customer Details</h4>
    <li>Email: {{order.email}}</li>
    <li>Customer Name: {{order.name}}</li>
  </ul>
  `
}