export default {
    data: function() {
    return {
      products: [],
      cart: ''
    }
  },
  methods: {
    viewCart() {
      location.href = location.origin+'/Cart/cart.html';
    },
    async addToCart(item) {
      let cartId = localStorage.getItem('cartId');
      const newCart = await fetch('http://localhost:8888/.netlify/functions/addToCart', {
        method: "POST",
        body: JSON.stringify({cartId: cartId, items: { productId: item._id, quantity: 1 } })
      }).then((res) => res.json());
      console.log('Added to cart', newCart);
      if (!localStorage.getItem('cartId')) {
        localStorage.setItem('cartId', newCart._id)
      }
      this.cart = newCart;
    }
  },
  computed: {
    cartLength() {
      let total = 0;
      if(!this.cart) return 0;
      this.cart.items.forEach(item => {
        total += item.quantity;
      });
      return total;
    }
  },
  mounted: async function() {
    this.products = await fetch('http://localhost:8888/.netlify/functions/getProducts').then((res) => res.json());
    if (localStorage.getItem('cartId')) {
      this.cart = await fetch(`http://localhost:8888/.netlify/functions/getCart?cartId=${localStorage.getItem('cartId')}`).then((res) => res.json());
    } else {
      this.cart = await fetch('http://localhost:8888/.netlify/functions/getCart').then((res) => res.json());
    }
    if (this.cart != null) {
      this.cart = this.cart.cart;
    }
    console.log('what is the cart', this.cart);
  },
  template: 
  `
  <div>
    <h1>Welcome to the Shop!</h1>
    <div class="cart-link">
      <h3>Your Cart has {{cartLength}} items.</h3>
      <button class="cart-button" @click="viewCart()">View Cart</button>
    </div>
    <div class="container">
      <div class="card" v-for="item in products" :key="item._id">
        <h2>{{item.name}}</h2>
        <img class="image" :src="item.image"/>
        <div class="price">\${{item.price}}</div>
        <button @click="addToCart(item)">Add to Cart</button>
      </div>
    </div>
  </div>
  `
};


