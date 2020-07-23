<template>
  <v-app class="profile">
    <v-container fluid class="profile">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8">
          <span v-if="$route.params.value.content.data2.user.photoURL">
            <img
              class="profile-image"
              v-bind:src="$route.params.value.content.data2.user.photoURL"
            />
          </span>
          <span v-else>
            <v-icon class="profile-image" large color="white">🐻</v-icon>
          </span>
          <span v-if="$route.params.value.content.data2.user.displayName">{{
            $route.params.value.content.data2.user.displayName
          }}</span>
          <span v-else>くま</span>さんのくすり履歴
          <div v-for="(message, index) in messages" :key="index">
            <v-card
              class="messages-list"
              v-if="
                message.content.data2.user.displayName ==
                  $route.params.value.content.data2.user.displayName
              "
            >
              <v-card-text class="message-content">{{
                message.content.data1
              }}</v-card-text>
              <v-card-actions>
                <v-row align="center" justify="end">
                  <span v-if="!isAuthenticated">
                    <span class="count">
                      <v-icon color="pink">mdi-heart</v-icon>
                      <span class="good-count">{{
                        message.content.data3
                      }}</span>
                    </span>
                  </span>
                  <span v-else>
                    <v-btn icon color="pink" @click="addCount(index)">
                      <v-icon>mdi-heart</v-icon>
                      <span class="good-count">{{
                        message.content.data3
                      }}</span>
                    </v-btn>
                  </span>
                  <span v-if="!isAuthenticated">
                    <span></span>
                  </span>
                  <span
                    v-else-if="
                      message.content.data2.user.email ==
                        getStateUser.user.email
                    "
                  >
                    <v-btn
                      text
                      large
                      color="error"
                      @click="deleteMessage(index)"
                      >❌削除</v-btn
                    >
                  </span>
                </v-row>
              </v-card-actions>
            </v-card>
          </div>
          <p>
            <v-btn color="primary" to="/message">もどる</v-btn>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  name: "User",
  data: function() {
    return {
      user: this.$store.getters.getStateUser,
      userName: "",
      messages: []
    };
  },
  computed: {
    getStateUser() {
      return this.$store.getters.getStateUser;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    getStateUserName() {
      return this.$store.getters.getUserName;
    }
  },
  methods: {
    deleteUser() {
      this.$store.dispatch("userDelete");
    },
    deleteMessage(index) {
      firebase
        .database()
        .ref("messages")
        .child(index)
        .remove();
    },
    addCount(index) {
      firebase
        .database()
        .ref("messages")
        .child(index)
        .child("content/data3")
        .on("value", data => (this.count = data.val()));

      const addCountData = this.count + 1;
      this.$store.dispatch("addCount", { index, addCountData });
    }
  },
  mounted() {
    firebase
      .database()
      .ref("messages")
      .on("value", data => (this.messages = data.val()));
  }
};
</script>
