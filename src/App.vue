<template>
  <v-app>
    <Navbar @searchProducts="searchGames" :cart="cart" :subtotalCart="subtotalCart" />
    <v-main>
      <router-view/>
    </v-main>
    <Footer v-if="true" />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";



export default {
  name: "App",
  data: () => {
    return {
      pageLoaded: false,
      games: [
          {id: 1, title: "", thumbnail: ""}
      ],
      searchQuery: "",
      cart: []
    };
  },
  components: {
    Navbar,
    Footer
  },
  computed: {
    subtotalCart: function() {
      let sum = 0;
      this.cart.map(p => {
        sum += parseInt(p.price) * p.quantity;
      });

      return sum;
    },
    filteredGames: function() {
      return this.games
        ? this.games.filter(p =>
            p.title.toLowerCase().match(this.searchQuery.toLowerCase())
          )
        : this.games;
    }
  },
  mounted: function() {

  },
  methods: {
    searchGames: function(query) {
      this.searchQuery = query;
    },
    addCart: function(products) {
      this.cart = products;
      localStorage.setItem("cart", JSON.stringify(products));
    },
  }
};
</script>

<style scoped>

</style>
