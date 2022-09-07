<template>
  <v-footer dark padless>
    <v-card flat tile class="white--text text-center style_center">
      <!-- <v-divider></v-divider> -->
      <v-card-text class="white--text style_center">
        {{ new Date().getFullYear() }} —
        <strong>Made by 
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <a
                class="footer-link"
                href="https://github.com/Panovich?tab=repositories"
                target="_blank"
                v-bind="attrs"
                v-on="on"
              >
                @Panovich
              </a>
            </template>
            <span>Move to GitHub Account and Follow Me 😄</span>
          </v-tooltip>
        </strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.footer-link {
  text-decoration: none;
  color: #a1a1a1;
  font-size: 16px;
}

.footer-link:hover {
  color: greenyellow;
}

.style_center {
  margin: auto;
  width: available;
}
</style>
