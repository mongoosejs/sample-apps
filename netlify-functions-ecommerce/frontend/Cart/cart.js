export default {
  data: function() {
    return {
      products: [],
      cart: [],
    }
  },
  mounted: async function() {
    this.products = await fetch('http://localhost:8888/.netlify/functions/getProducts').then((res) => res.json());
    this.cart = await fetch(`http://localhost:8888/.netlify/functions/getCart?cartId=${localStorage.getItem('cartId')}`).then((res) => res.json()).then((response) => response.cart.items);
    if (this.cart == null) return;
    for (let i = 0; i < this.cart.length; i++) {
      let product = this.products.find((item) => {
        return item._id.toString() == this.cart[i].productId.toString()
      });
      this.cart[i].name = product.name;
      this.cart[i].image = product.image;
      this.cart[i].price = product.price;
    }
    console.log(this.cart);
  },
  template:
  `
  <div>
    <h1>Your Cart</h1>
    <div v-for="item in cart" :key="item.productId">
      <h2 class="cart">{{item.name}}
      <!--Do inline flex here maybe-->
      <span class="cart-quantity"><span class="plus-minus">+</span>{{item.quantity}}<span class="plus-minus">&minus;</span></span>
      <span style="float: right">Remove</span>
      <img :src="item.image" />
      </h2>
    </div>
    <button>Go To Checkout</button>
  </div>
  `
}