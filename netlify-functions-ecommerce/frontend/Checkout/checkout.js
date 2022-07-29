const serverUrl = 'http://localhost:8888/.netlify/functions';

export default {
  data: function() {
    return {
      cart: [],
      products: [],
      stripe: '',
      shipping: ''
    }
  },
  methods: {
    async checkout() {
      if (this.shipping == null || this.cart.length == 0) return;
      await fetch(serverUrl+`/checkout`, {
        method: "POST",
        body: JSON.stringify({cartId: localStorage.getItem('cartId'), shippingType: this.shipping})
      }).then((res) => { return res.json()}).then((response) => {
        this.stripe.redirectToCheckout({sessionId: response.session.id})
      });
    }
  },
  mounted: async function() {
    this.cart = await fetch(serverUrl+`/getCart?cartId=${localStorage.getItem('cartId')}`).then((res) => res.json()).then((response) => response.cart.items);
    this.products = await fetch(serverUrl+'/getProducts').then((res) => res.json());
    if (this.cart == null) return;
    for (let i = 0; i < this.cart.length; i++) {
      let product = this.products.find((item) => {
        return item._id.toString() == this.cart[i].productId.toString()
      });
      this.cart[i].name = product.name;
      this.cart[i].image = product.image;
      this.cart[i].price = product.price;
      this.stripe = Stripe('pk_test_51IkuAqIFSwo5WpGWudAKEeemrymI6EmICEAgkgvlq4Bo5jJ1uuMRlrBRw9kvHH7boANqjE7Y6Mb7lQmsXRQoZo3x00Ek1L6d8A');
    }
  }, 
  template:
  `
  <div>
  <head>
    <title>Buy cool new product</title>
  </head>
  <body>
  <h1 v-if="cart.length <= 0">Cannot Checkout as no items are in the cart.</h1>
    <section v-else>
      <div v-for="item in cart" class="product">
        <img class="image" :src="item.image" alt="an iphone" />
        <div class="description">
          <h3>Product: {{item.name}}</h3>
          <h5>Total: \${{item.price*item.quantity}}</h5>
          <h5>Quantity: {{item.quantity}}</h5>
        </div>
      </div>
      <div v-if="!shipping">Please Select a shipping type</div>
      <div style="padding-bottom: 10px">
      <input value="standard" type="radio" v-model="shipping" />
      <label>Standard</label>
      <input value="2-day" type="radio" v-model="shipping" />
      <label>2-day</label>
      </div>
      <form @submit.prevent>
        <button @click="checkout" class="button" type="submit" id="checkout-button">Checkout</button>
      </form>
    </section>
  </body>
  </div>
  `
}