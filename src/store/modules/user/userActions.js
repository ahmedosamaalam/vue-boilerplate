import axios from 'axios';

const apiUrl = 'https://foodistanweb.herokuapp.com/api/auth/local';

import { setDefaultAuthHeaders } from './helper';

export default {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state, dispatch }) {
    setDefaultAuthHeaders(state);
    dispatch('validate');
  },

  // Logs in the current user.
  logIn({ commit, dispatch, getters }, payload = {}) {
    if (getters.loggedIn) return dispatch('validate');

    console.log('login');
    return axios.post(apiUrl, payload).then(response => {
      const user = response.data;
      commit('SET_CURRENT_USER', user);
      return user;
    });
  },

  // Logs out the current user.
  logOut({ commit }) {
    commit('SET_CURRENT_USER', null);
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  validate({ commit, state }) {
    console.log('validate');
    if (!state.currentUser) return Promise.resolve(null);

    return axios
      .get(apiUrl)
      .then(response => {
        const user = response.data;
        commit('SET_CURRENT_USER', user);
        return user;
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          commit('SET_CURRENT_USER', null);
        } else {
          console.warn(error);
        }
        return null;
      });
  },
};
