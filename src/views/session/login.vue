<template>
  <div class="lg-layout md-gutter" :class="`md-alignment-center-center`">
    <LoginForm title="My Login Form" />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/forms/LoginForm.vue';

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
};
</script>
