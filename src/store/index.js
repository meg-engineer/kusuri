import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import router from "../router/index.js";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
    messages: [],
    messege: "",
    userName: "",
    count: 0
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    mutateMessege(state, payload) {
      state.messege = payload;
    },
    mutateCount(state) {
      state.count++;
    },
    setUserName(state, payload) {
      state.userName = payload;
    }
  },

  actions: {
    userLogin({ commit }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit("setUser", user);
          commit("setIsAuthenticated", true);
          router.push("/message");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
        });
    },
    userLoginGoogle({ commit }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(user => {
          commit("setUser", user);
          commit("setIsAuthenticated", true);
          router.push("/message");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
        });
    },
    userJoin({ commit }, { email, password, userName }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(result => {
          result.user.updateProfile({
            displayName: userName
          });
          commit("setUser", result);
          commit("setIsAuthenticated", true);
          router.push("/message");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
        });
      firebase
        .database()
        .ref("users")
        .push({
          displayName: userName,
          email: email,
          password: password
        });
    },
    userSignOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
        });
    },
    userDelete({ commit }) {
      firebase
        .auth()
        .currentUser.delete()
        .then(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/");
        });
    },
    addMessage(store, { messageData, userData, countData }) {
      const data = {
        data1: messageData,
        data2: userData,
        data3: countData
      };
      firebase
        .database()
        .ref("messages")
        .push({
          content: data
        })
        .then(data => {
          store.commit("mutateMessege", data);
        });
    },
    addCount(store, { index, addCountData }) {
      firebase
        .database()
        .ref("messages")
        .child(index)
        .child("content")
        .update({
          data3: addCountData
        })
        .then(() => {
          store.commit("mutateCount");
        });
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    },
    getStateMessege(state) {
      return state.messege;
    },
    getStateUser(state) {
      return state.user;
    },
    getUserName(state) {
      return state.userName;
    },
    getCount(state) {
      return state.count;
    }
  },
  plugins: [
    createPersistedState({ key: "example", storage: window.sessionStorage })
  ]
});
