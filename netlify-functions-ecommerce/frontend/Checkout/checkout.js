
export default {
  data: function() {
    return {}
  },
  methods: {
    async checkout() {
      console.log('Hello There from checkout');
    }
  },
  mounted: async function() {

  },
  template:
  `
  <div>
  <head>
    <title>Buy cool new product</title>
  </head>
  <body>
    <section>
      <div class="product">
        <img src="https://i.imgur.com/EHyR2nP.png" alt="The cover of Stubborn Attachments" />
        <div class="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <form @submit="checkout()">
        <button type="submit" id="checkout-button">Checkout</button>
      </form>
    </section>
  </body>
  </div>
  `
}