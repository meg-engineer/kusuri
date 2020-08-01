<template>
  <v-container fluid fill-height class="home" style="max-height: 100vh;">
    <v-layout justify-center align-center column pa-5>
      <div class="hidden-sm-and-down">
        <div class="display-4 font-weight-black white--text text-center">
          くすり
        </div>
        <div class="display-4 font-weight-black white--text text-center mb-3">
          KUSURI
        </div>
        <div class="display-1 font-weight-bold white--text text-center">
          Let's share your happiness!
        </div>
        <div class="display-1 white--text text-center description">
          日々のクスッと笑える出来事をシェアしよう
        </div>
      </div>
      <div class="hidden-md-and-up">
        <div class="display-2 font-weight-black white--text text-center">
          くすり
        </div>
        <div class="display-2 font-weight-black white--text text-center mb-3">
          KUSURI
        </div>
        <div class="display-1 font-weight-bold white--text text-center">
          Let's share your happiness!
        </div>
        <div class="display-1 white--text text-center description">
          日々のクスッと笑える出来事をシェアしよう
        </div>
      </div>

      <v-btn large color="primary" dark to="/message">くすりをつぶやく</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Home"
};
</script>
