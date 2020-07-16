<template>
  <v-container fluid fill-height class="top" style="max-height: 100vh;">
    <v-layout justify-center align-center column pa-5>
      <div class="display-4 font-weight-black white--text text-xs-center">
        くすり
      </div>
      <div class="display-4 font-weight-black white--text text-xs-center mb-3">
        KUSURI
      </div>
      <div class="display-1 font-weight-bold white--text text-xs-center">
        Let's share your happiness!
      </div>
      <div class="display-1 white--text text-xs-center">
        日々のクスッと笑える出来事をシェアしよう
      </div>
      <v-btn fab class="mt-5 brown darken-4" to="/message">
        <v-icon large color="white">🐻</v-icon>
      </v-btn>
      <v-btn large color="warning" to="/about">くすりって？</v-btn>
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
.top {
  background: url("https://nmomos.com/wp-content/uploads/2019/08/fullsizeoutput_9ae.jpeg");
  background-color: rgba(255, 255, 255, 0.2);
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
