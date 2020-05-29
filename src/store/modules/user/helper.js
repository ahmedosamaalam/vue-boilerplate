import axios from 'axios';
// import state from "./modules/user/userState"

import { mapState, mapGetters, mapActions } from 'vuex';

export const authComputed = {
  ...mapState('user', {
    currentUser: state => state.currentUser,
  }),
  ...mapGetters('user', ['loggedIn']),
};

export const authMethods = mapActions('user', ['logIn', 'logOut']);

export const getSavedStateFromLocalStorage = key => {
  return JSON.parse(window.localStorage.getItem(key));
};

export const saveStateToLocalStorage = (key, state) => {
  window.localStorage.setItem(key, JSON.stringify(state));
};

export const setDefaultAuthHeaders = state => {
  axios.defaults.headers.common.Authorization = state.currentUser
    ? state.currentUser.token
    : '';
};
