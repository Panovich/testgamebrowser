<template>
  <v-card class="product_card">
    <v-img :src="item.thumbnail" :height="150">
    </v-img>
    <v-list-item>
      <v-list-item-content>
          <div class="float-left">
            <v-list-item-title class="headline">
              <h6>{{item.title}}</h6>
            </v-list-item-title>
          </div>
        <div class="block-with-text">{{item.short_description}}</div>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions class="card_footline">
      <v-btn class="add_game" elevation="2" outlined max-height="20">
        <v-icon dense>
          mdi mdi-plus-box
        </v-icon>
        ADD
      </v-btn>
      <v-spacer></v-spacer>
      <v-card class="text-center justify-start genre_view">
        <div><strong>{{item.genre}}</strong></div>
      </v-card>
      <v-icon>
        {{OC_Support_thumb}}
      </v-icon>
      <v-btn icon @click="alertShowGame(item)">
        <v-icon>search</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Product",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    OC_Support_thumb: function() {
      if (this.item.platform === "PC (Windows)") {
        return "mdi-microsoft-windows"
      }
      return "mdi-application"
    },
  },
  methods: {
    alertShowGame: function (item) {
      this.$emit('goShowGame', item.id);
    }
  }
}
</script>

<style scoped>
  .add_game {
    background: white;
    alignment: left;
  }
  .card_footline {
    max-height: 40px;
    background: white;
  }
  .genre_view {
    max-height: 16px;
    text-align-all: center;
    text-after-overflow: "...";
    text-autospace: ideograph-alpha;
    font-size: 12px;
    margin-right: 10px;

    background: rgba(0,0,0,0.2);
    color: rgba(0,0,0,0.6);
  }

  .block-with-text {
    /* спрятать текст если у более N строк */
    overflow: hidden;
    /* для установки '…' в абсолютную позицию */
    position: relative;
    /* используйте это значение для расчёта высоты блока */
    line-height: 1.2em;
    /* max-height = line-height (1.2) * число строк (3) */
    max-height: 3.6em;
    /* исправлиление проблемы когда последнее слово не соединяется с правой стороны */
    text-align: justify;
    /* место для многоточия '…' */
    padding-right: 1em;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  .pos_inline {
    float: left; /*Задаем обтекание*/
    line-height: 120px;/*Высота строки +  верт. центрирования текста*/
    font-size: 40px;
    background: dodgerblue;
    color: white;
    margin-top: 60px;
    width: 320px; /*Фиксируем ширину блока*/
    margin-right: 10px;
    text-align: center; /*Центрируем текст по горизонтали*/
  }
</style>