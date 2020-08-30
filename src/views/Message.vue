<template>
  <v-app height="auto">
    <v-container fluid class="message">
      <div v-if="!isAuthenticated">
        <p class="error-msg">
          ※くすりをつぶやくには
          <v-btn small outlined color="primary" to="/sign-in">ログイン</v-btn
          >または
          <v-btn small outlined color="error" to="/join">ユーザー登録</v-btn
          >が必要です
        </p>
      </div>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8">
          <v-text-field
            name="message"
            label="あなたのくすりを聞かせて！"
            type="text"
            v-model="messege"
            data-cy="addMessageField"
            required
            class="text-field"
            clearable
          >
            <template v-slot:append-outer>
              <v-btn class="mx-2" fab dark small color="cyan" @click="add">
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
            </template>
          </v-text-field>

          <v-card
            class="messages-list"
            v-for="(message, index) in messages"
            :key="index"
          >
            <v-card-text class="message-content">{{
              message.content.data1
            }}</v-card-text>
            <v-card-actions>
              <v-list-item>
                <v-list-item-user class="message-user">
                  <v-btn
                    text
                    :to="{ name: 'User', params: { value: message } }"
                  >
                    <span v-if="message.content.data2.displayName">
                      {{ message.content.data2.displayName }}</span
                    >
                    <span v-else>{{ message.content.data2.email }}</span>
                  </v-btn>
                </v-list-item-user>
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
                      message.content.data2.email == getStateUser.user.email
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
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Message",
  data() {
    return {
      messages: [],
      messege: "",
      user: this.$store.getters.getStateUser,
      count: 0
    };
  },
  computed: {
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
        const uid = this.user.user.uid;
        const email = this.user.user.email;
        const displayName = this.user.user.displayName;
        const postUser = { uid, email, displayName };

        console.log(postUser);
        this.$store.dispatch("addMessage", {
          messageData: this.messege,
          userData: postUser,
          countData: 0
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
