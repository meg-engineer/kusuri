<template>
  <v-container fluid fill-height class="about" style="max-height: 100vh;">
    <v-layout justify-center align-center column pa-5>
      <p class="display-3 font-weight-black text-xs-center">くすりって？</p>
      <p class="display-1 text-xs-center">
        日々のクスッと笑える出来事をシェアできるチャットアプリです
      </p>
      <p class="display-1 text-xs-center">Let's share your happiness!</p>
      <v-btn fab class="mt-5 brown darken-4" to="/message">
        <v-icon large color="white">🐻</v-icon>
      </v-btn>
      <v-btn large color="primary" to="/message">くすりとさせる</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Top"
};
</script>

<style scoped>
.about {
  background-image: url("~@/assets/smile-5128742_1920.jpg");
  background-color: rgba(255, 255, 255, 0.8);
  background-blend-mode: lighten;
  background-size: cover;
  width: 100%;
  height: 100%;
}

.v-btn {
  margin: 10px;
  font-size: 16px;
}
</style>
