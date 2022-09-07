<template>
  <div class="container mx-auto">
    <v-container class="">
      <div class="headline"><strong>{{gameInfo.title}}</strong></div>
      <v-row no-gutters>
        <v-col cols="6" md="4">
          <div class="align-center">
            <v-img :src="gameInfo.thumbnail" style="width: 100%" class="image" touchless></v-img>
            <v-btn class="play_now" style="width: 100%" elevation="2" color="#ff7300">
              PLAY NOW
            </v-btn>
            <v-btn class="add_to_library" style="width: 100%" elevation="2" outlined>
              <v-icon dense>
                mdi mdi-plus-box
              </v-icon>
              ADD
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="8">
          <div class="style_right align-center">
            <v-carousel hide-delimiters height="420">
              <v-carousel-item
                  v-for="(item,i) in gameInfo.screenshots"
                  :key="i"
                  :src="item.image"
              ></v-carousel-item>
            </v-carousel>
            <v-card color="rgba(0,0,0,0.4)" height="1px" class="delim"></v-card>
            <p><span v-html="gameInfo.description"></span></p>
            <div class="headline">System requirements</div>

            <v-row no-gutters class="additional_info">
              <v-col width="100%">
                <div class="prop_header"><strong>Graphics</strong></div>
                {{gameInfo.minimum_system_requirements.graphics}}

                <div class="prop_header"><strong>Memory</strong></div>
                {{gameInfo.minimum_system_requirements.memory}}
              </v-col>
              <v-col width="100%">
                <div class="prop_header"><strong>OS</strong></div>
                {{gameInfo.minimum_system_requirements.os}}

                <div class="prop_header"><strong>Processor</strong></div>
                {{gameInfo.minimum_system_requirements.processor}}
              </v-col>
              <v-col width="100%">
                <div class="prop_header"><strong>Storage</strong></div>
                {{gameInfo.minimum_system_requirements.storage}}

                <div class="prop_header"><strong>Additional Info</strong></div>
                Specifications may change during development
              </v-col>
            </v-row>

          </div>
        </v-col>
      </v-row>
    </v-container>

  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "GameInfo",
  data: () => {
    return {
      pageLoaded: false,
      gameInfo: [],
      slide: 1,
    };
  },
  computed: {
    get_id() {
      return this.$route.params.id;
    },
  },
  props: {
    id: {
      type: Number,
      default: 1,
    }
  },
  methods: {
    async fetchGameInfo() {
      try {
        this.pageLoaded = false;
        const options = {
          method: 'GET',
          url: 'https://mmo-games.p.rapidapi.com/game',
          params: {id: this.get_id},
          headers: {
            'X-RapidAPI-Key': '45ef143342mshd825a558a1196fdp1ffcabjsn38933373f1f9',
            'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
          }
        };
        const response = await axios.request(options);
        this.gameInfo = response.data;
        console.log(this.gameInfo)
      } catch (error) {
        alert('Невозможно получить список игр. Свяжитесь с администратором сайта');
        console.log(error);
        this.gameInfo = [];
        return;
      }
      this.pageLoaded = true;
    },
  },
  mounted: function() {
    this.fetchGameInfo();
  },
};
</script>

<style scoped>
.style_right {
  padding-left: 10px;
}
.play_now {
  alignment: left;
  background-color: #ff7300;
  color: white;
  width: max-content;
  margin-top: 20px;
}

.add_to_library {
  alignment: left;
  background-color: white;
  color: rgba(0,0,0,0.7);
  width: max-content;
  margin-top: 10px;
}

.delim {
  margin-top: 14px;
  margin-bottom: 14px;
  border-radius: 4px;
}

.additional_info{
  background-color: rgba(0,0,0,0.05);
  border-radius: 10px;
  padding-left: 10px;
}

.prop_header {
  color: rgba(0,0,0,0.7);
  padding-top: 8px;
}
</style>