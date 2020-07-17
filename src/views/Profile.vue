<template>
  <div id="app" class="profile">
    <div>
      <span v-if="getStateUser.user.photoURL">
        <img class="profile-image" v-bind:src="getStateUser.user.photoURL" />
      </span>
      <span v-else>
        <v-icon class="profile-image" large color="white">🐻</v-icon>
      </span>
      <span v-if="getStateUser.user.displayName">
        {{ getStateUser.user.displayName }}
      </span>
      <span v-else>くま</span>
    </div>
    <div>
      くすり歴：
      <div
        class="messages-list"
        v-for="(message, index) in messages"
        :key="index"
      >
        <span
          v-if="message.content.data2.user.email == getStateUser.user.email"
        >
          {{ message.content.data1 }}
          <span class="count">いいね{{ message.content.data3 }}</span>
          <v-btn
            class="delete-btn"
            small
            color="warning"
            @click="deleteMessage(index)"
            >削除</v-btn
          >
        </span>
      </div>
    </div>
    <p>
      <v-btn small color="primary" to="/message">くすりとさせる</v-btn>
    </p>
    <p>
      <v-btn class="delete-btn" small color="error" @click="deleteUser"
        >アカウント削除</v-btn
      >
    </p>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Profile",
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

<style scoped>
.profile {
  background: url("~@/assets/happy-1281590_1920.jpg");
  background-color: rgba(255, 255, 255, 0.8);
  background-blend-mode: lighten;
  background-size: cover;
  width: 100%;
  height: 100%;
}

.profile-image {
  width: 3%;
  height: 3%;
  margin: 5px;
}

.messages-list {
  margin: 5px;
  margin-bottom: 10px;
}
</style>
