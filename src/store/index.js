import Vue from 'vue';
import vuex from 'vuex';

import consult from './modules/consult';
import getters from './getters';

Vue.use(vuex);

export default new vuex.Store({
  modules: {
    consult,
  },
  getters
});
