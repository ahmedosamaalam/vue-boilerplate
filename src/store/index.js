import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';

import dispatchActionForAllModules from '../utils/dispatch-action-for-all-modules';

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {},
  // mutations: {},
  // actions: {},
  modules,
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== 'production',
});

dispatchActionForAllModules('init');
