<template>
  <div id="app" class="profile">
    <p v-if="getStateUser.user.photoURL">
      プロフィール写真：
      <img class="profile-image" v-bind:src="getStateUser.user.photoURL" />
    </p>
    <p v-else>プロフィール写真：Googleアカウントでログインした場合のみ表示</p>
    <p v-if="getStateUser.user.displayName">
      ユーザー名：{{ getStateUser.user.displayName }}
    </p>
    <p v-else>ユーザー名：{{ getStateUser.user.email }}</p>
    <!-- <p>ユーザー名：{{ getStateUser.user.displayName }}</p> -->
    <p>くすり歴：{{ user }}</p>
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
export default {
  name: "Profile",
  data: function() {
    return {
      user: null
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
    deleteUser() {
      this.$store.dispatch("userDelete");
    }
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
  margin-top: 10px;
}
</style>
