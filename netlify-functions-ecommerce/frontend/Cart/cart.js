const serverUrl = 'http://localhost:8888/.netlify/functions';

export default {
  data: function() {
    return {
      products: [],
      cart: [],
    }
  },
  methods: {
    // a simple solution to handle the weird rendering of the number on adding and removing is pass a temp copy to the backend instead of the original.
    async removeAll(item) {
      const updatedCart = await fetch(serverUrl+'/removeFromCart', {
        method: "POST",
        body: JSON.stringify({cartId: localStorage.getItem('cartId'), item: item})
      }).then((res) => res.json()).then((response) => response.items);
      console.log('The updated Cart', updatedCart)
      const index = updatedCart.findIndex((product) => product.productId == item.productId);
      if (index < 0) {
        let spot = this.cart.find((product) => product.productId == item.productId);
        this.cart.splice(spot, 1);
      }
    },
    async removeOne(item) {
      item.quantity = 1;
      const updatedCart = await fetch(serverUrl+'/removeFromCart', {
        method: "POST",
        body: JSON.stringify({cartId: localStorage.getItem('cartId'), item: item})
      }).then((res) => res.json()).then((response) => response.items);
      console.log(updatedCart);
      const updatedItem = updatedCart.find((product) => product.productId == item.productId);
      item.quantity = updatedItem.quantity;
    },
    async addOne(item) {
      item.quantity = 1;
      const updatedCart = await fetch(serverUrl+'/addToCart', {
        method: "POST",
        body: JSON.stringify({cartId: localStorage.getItem('cartId'), item: item})
      }).then((res) => res.json()).then(response => response.items);
      const updatedItem = updatedCart.find((product) => product.productId == item.productId);
      item.quantity = updatedItem.quantity;
    },
    toCheckout() {
      location.href = location.origin+'/Checkout/checkout.html';
    }
  },
  mounted: async function() {
    this.products = await fetch(serverUrl+'/getProducts').then((res) => res.json());
    this.cart = await fetch(serverUrl+`/getCart?cartId=${localStorage.getItem('cartId')}`).then((res) => res.json()).then((response) => response.cart.items);
    if (this.cart == null) return;
    for (let i = 0; i < this.cart.length; i++) {
      let product = this.products.find((item) => {
        return item._id.toString() == this.cart[i].productId.toString()
      });
      this.cart[i].name = product.name;
      this.cart[i].image = product.image;
      this.cart[i].price = product.price;
    }
    console.log('The cart', this.cart);
  },
  template:
  `
  <div>
    <h1>Your Cart</h1>
    <button @click="toCheckout()" class="checkout-button">Go To Checkout</button>
    <div v-for="item in cart" :key="item.productId">
      <h2 class="cart">{{item.name}}
      <span class="cart-quantity"><span @click="addOne(item)" class="plus-minus">+</span>{{item.quantity}}<span @click="removeOne(item)" class="plus-minus">&minus;</span><span @click="removeAll(item)" class="remove-button">Remove</span></span>
      <img :src="item.image" />
      </h2>
    </div>
  </div>
  `
}