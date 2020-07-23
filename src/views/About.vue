<template>
  <v-container fluid fill-height class="about" style="max-height: 100vh;">
    <v-layout justify-center align-center column pa-5>
      <p class="display-2 font-weight-black text-xs-center">くすりって？</p>
      <p class="display-1 text-xs-center">
        日々のクスッと笑える出来事をシェアできるチャットアプリです
      </p>
      <p class="display-1 text-xs-center">Let's share your happiness!</p>

      <v-btn large color="primary" to="/message">くすりをつぶやく</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "About"
};
</script>
