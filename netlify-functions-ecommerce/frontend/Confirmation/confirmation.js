
export default {
  data: function() {
    return {}
  },
  mounted: async function() {
    let params = new URLSearchParams(location.search);
    let sessionId = params.get('id');
    await fetch('http://localhost:8888/.netlify/functions/createOrder', {
      method: "POST",
      body: JSON.stringify({ cartId: localStorage.getItem('cartId'), sessionId: sessionId})
    });
  },
  template:
  `
  <h1>Hello From Confirmation</h1>
  `
}