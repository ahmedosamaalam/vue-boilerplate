import { getSavedStateFromLocalStorage } from './helper';

export default {
  currentUser: getSavedStateFromLocalStorage('auth.currentUser'),
};
