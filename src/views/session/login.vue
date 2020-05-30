<template>
  <div class="lg-layout md-gutter" :class="`md-alignment-center-center`">
    <LoginForm
      :sending="sending"
      :submitForm="submitForm"
      title="My Login Form"
      @submit="onSubmitForm"
      ref="form"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/forms/LoginForm.vue';
import { authMethods } from '@/store/modules/user/helper.js';
export default {
  name: 'Login',
  data: () => ({
    sending: false,
    submitForm: false,
  }),
  components: {
    LoginForm,
  },
  methods: {
    ...authMethods,

    onSubmitForm(payload) {
      this.sending = true;
      this.submitForm = true;

      this.logIn(payload)
        .then(() => {
          this.$router.push('/dashboard');
          this.sending = false;
          this.submitForm = false;
          this.$refs.form.clearForm();
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>
