<template>
  <span>
    <v-navigation-drawer app v-model="drawer" class="brown lighten-2" dark>
      <v-list>
        <div v-if="!isAuthenticated">
          <v-btn text to="/sign-in" data-cy="signinBtn">ログイン</v-btn>
          <v-btn
            color="brown lighten-3"
            to="/join"
            class="nav-join"
            data-cy="joinBtn"
            >ユーザー登録</v-btn
          >
        </div>
        <div v-else>
          <v-btn text to="/profile">プロフィール</v-btn>
          <v-btn outline color="gray" @click="logout" data-cy="logout"
            >ログアウト</v-btn
          >
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="brown darken-4" dark>
      <v-toolbar-side-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <router-link to="/">
        <v-toolbar-title to="/">
          {{ appTitle }}
          <img src="@/assets/kusuri.png" />
        </v-toolbar-title>
      </router-link>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <div class="hidden-md-and-up">
        <v-btn flat @click="drawer = !drawer">Menu</v-btn>
      </div>
      <div v-if="!isAuthenticated" class="hidden-sm-and-down">
        <v-btn text to="/sign-in" data-cy="signinBtn">ログイン</v-btn>
        <v-btn
          color="brown lighten-3"
          to="/join"
          class="nav-join"
          data-cy="joinBtn"
          >ユーザー登録</v-btn
        >
      </div>
      <div v-else class="hidden-sm-and-down">
        <v-btn text to="/profile">プロフィール</v-btn>
        <v-btn outline color="gray" @click="logout" data-cy="logout"
          >ログアウト</v-btn
        >
      </div>
    </v-toolbar>
  </span>
</template>

<script>
export default {
  name: "AppNavigation",
  data() {
    return {
      appTitle: "くすり",
      drawer: false
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("userSignOut");
    }
  }
};
</script>
