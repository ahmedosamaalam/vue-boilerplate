import { saveStateToLocalStorage, setDefaultAuthHeaders } from './helper';

export default {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue;
    saveStateToLocalStorage('auth.currentUser', newValue);
    setDefaultAuthHeaders(state);
  },
};
