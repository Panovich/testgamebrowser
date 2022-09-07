<template>
  <div class="container mx-auto">
    <v-container fluid>
      <v-row dense>
        <v-col v-for="item in games" :key="item.id" cols="12" xs="6" sm="4" md="3" lg="3">
          <v-skeleton-loader v-if="isLoaded" type="image"></v-skeleton-loader>
          <game-card v-bind:item="item" @goShowGame="goShowGame" v-else>

          </game-card>
        </v-col>
      </v-row>
      <v-fab-transition>
        <v-btn
          fab
          color="green"
          v-scroll="onScrollBtn"
          v-show="showBtnScrollUp"
          @click="goToTop"
          dark
          fixed
          right
          bottom
        >
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-container>
  </div>
</template>


<script>
import GameCard from "@/components/GameCard";
import axios from "axios";
export default {
  name: "Games",
  components: {
    GameCard,
  },
  data: () => {
    return {
      isLoaded: false,
      cart: [],
      showBtnScrollUp: false,
      snackbar: {
        visible: false,
        timeout: 700,
        text: ""
      },
      games: [],
    };
  },
  watch: {
    cart: function() {
      this.$emit("addCart", this.cart);
    },
    loadingState: function() {
      this.$emit("setLoaded", this.isLoaded);
    }
  },
  mounted: function() {
    this.fetchGames();
    this.cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
      setTimeout(() => (this.isLoaded = false), 7000);
  },
  methods: {
    async fetchGames() {
      try {
        this.isLoaded = false;
        const options = {
          method: 'GET',
          url: 'https://mmo-games.p.rapidapi.com/games',
          headers: {
            'X-RapidAPI-Key': '45ef143342mshd825a558a1196fdp1ffcabjsn38933373f1f9',
            'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
          }
        };
        const response = await axios.request(options);
        this.games = response.data;
      } catch (error) {
        alert('Невозможно получить список игр. Свяжитесь с администратором сайта');
        console.log(error);
        this.games = [];
        return;
      }
      this.isLoaded = true;
    },
    goToTop: function() {
      this.$vuetify.goTo(0);
    },
    goShowGame: function(id) {
      this.$router.push({name: 'showgame', params: {id: id}});
    },
    onScrollBtn: function(event) {
      this.showBtnScrollUp =
        (window.pageYOffset || event.target.scrollTop || 0) > 40;
    },
    productAddedMessage: function() {
      this.snackbar.visible = true;
      this.snackbar.text = "Product added to your cart";
    },
    addToCart: function(item) {
      let indexProduct = this.cart.findIndex(p => p.id === item.id);
      if (indexProduct > -1) {
        let tempProduct = this.cart[indexProduct];
        this.cart.splice(indexProduct, 1);
        tempProduct.quantity++;
        this.cart.push(tempProduct);
      } else {
        item.quantity = 1;
        this.cart.push(item);
      }
      this.productAddedMessage();
    }
  }
};
</script>

<style>
.v-skeleton-loader__image {
  height: 308px;
}
</style>
