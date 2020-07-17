<template>
  <div id="app" class="message">
    <div v-if="!isAuthenticated" class="hidden-sm-and-down">
      <p class="error-msg">
        ※くすりとさせるには
        <v-btn small outlined color="primary" to="/sign-in">ログイン</v-btn
        >または
        <v-btn small outlined color="error" to="/join">ユーザー登録</v-btn
        >が必要です
      </p>
    </div>
    <v-text-field
      name="message"
      label="くすりと笑わせて！"
      type="text"
      v-model="messege"
      data-cy="addMessageField"
      required
    ></v-text-field>
    <v-btn color="primary" @click="add" data-cy="addMessageBtn"
      >くすりとさせる</v-btn
    >

    <p class="kusuri-index font-weight-bold">くすり一覧</p>
    <li class="messages-list" v-for="(message, index) in messages" :key="index">
      {{ message.content.data1 }} :
      <router-link :to="{ name: 'User', params: { value: message } }">
        <span v-if="message.content.data2.user.displayName">
          {{ message.content.data2.user.displayName }}
        </span>
        <span v-else>{{ message.content.data2.user.email }}</span>
      </router-link>
      <span v-if="!isAuthenticated">
        <span></span>
      </span>
      <span
        v-else-if="message.content.data2.user.email == getStateUser.user.email"
      >
        <v-btn
          class="delete-btn"
          small
          color="warning"
          @click="deleteMessage(index)"
          >削除</v-btn
        >
      </span>
    </li>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Message",
  data: function() {
    return {
      messages: [],
      messege: "",
      user: this.$store.getters.getStateUser
    };
  },
  computed: {
    getStateMessege() {
      return this.$store.getters.getStateMessege;
    },
    getStateUser() {
      return this.$store.getters.getStateUser;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    add() {
      if (this.isAuthenticated) {
        this.$store.dispatch("addMessage", {
          messageData: this.messege,
          userData: this.user
        });
        this.messege = "";
      } else {
        this.$router.push("/sign-in");
      }
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
.delete-btn {
  margin: 5px;
}

.messages-list {
  font-size: 18px;
}

.messages-list > span {
  font-size: 14px;
}

.message {
  background: url("~@/assets/happy-1281590_1920.jpg");
  background-color: rgba(255, 255, 255, 0.8);
  background-blend-mode: lighten;
  background-size: cover;
  width: 100%;
  height: 100%;
}

.kusuri-index {
  margin-top: 20px;
  font-size: 18px;
}
</style>
