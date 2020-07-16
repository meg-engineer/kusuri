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
    <p>入力：{{ messege }}</p>
    <p>stateの値：{{ getStateMessege }}</p>

    <p class="font-weight-bold">くすり一覧</p>
    <li class="messages-list" v-for="(message, index) in messages" :key="index">
      {{ message.content }} :
      <span v-if="getStateUser.user.displayName">{{
        getStateUser.user.displayName
      }}</span>
      <span v-else>{{ getStateUser.user.email }}</span>
      <v-btn
        class="delete-btn"
        small
        color="error"
        @click="deleteMessage(index)"
        >削除</v-btn
      >
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
      user: null
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
        this.$store.dispatch("addMessage", this.messege);
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
</style>
